-- TenaWork PostgreSQL Schema
-- Ordered for migration (Types -> Functions -> Tables -> Indexes -> Seeds)

-- ==========================================
-- 1. ENUM TYPES
-- ==========================================
CREATE TYPE user_role AS ENUM ('PROFESSIONAL', 'EMPLOYER', 'ADMIN');
CREATE TYPE job_status AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED', 'CANCELLED');
CREATE TYPE application_status AS ENUM ('PENDING', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'ACCEPTED');

-- ==========================================
-- 2. TRIGGER FUNCTIONS
-- ==========================================
-- Reusable function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 3. TABLES
-- ==========================================

-- USERS Table
-- Stores base authentication and authorization information for all platform users.
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- PROFESSIONAL_PROFILES Table
-- Stores detailed profile information for professionals seeking jobs.
CREATE TABLE professional_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    profession VARCHAR(255) NOT NULL,
    years_experience NUMERIC(5,2) NOT NULL CHECK (years_experience >= 0),
    desired_salary NUMERIC(12,2) CHECK (desired_salary >= 0),
    preferred_locations TEXT[],
    preferred_work_type VARCHAR(100),
    preferred_institution_type VARCHAR(100),
    culture_preferences TEXT[],
    languages TEXT[],
    health_priorities TEXT[],
    free_text_profile TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp_professional_profiles
BEFORE UPDATE ON professional_profiles
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- EMPLOYER_PROFILES Table
-- Stores details about employers (hospitals, clinics, etc.) looking to hire.
CREATE TABLE employer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    institution_name VARCHAR(255) NOT NULL,
    institution_type VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp_employer_profiles
BEFORE UPDATE ON employer_profiles
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- JOBS Table
-- Represents open positions posted by employers. Includes soft delete (deleted_at).
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    salary_min NUMERIC(12,2) CHECK (salary_min >= 0),
    salary_max NUMERIC(12,2) CHECK (salary_max >= 0),
    work_type VARCHAR(100),
    institution_type VARCHAR(100),
    culture_tags TEXT[],
    language_requirements TEXT[],
    health_priorities TEXT[],
    status job_status NOT NULL DEFAULT 'DRAFT',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT check_salary_range CHECK (salary_max >= salary_min OR salary_max IS NULL OR salary_min IS NULL)
);

CREATE TRIGGER set_timestamp_jobs
BEFORE UPDATE ON jobs
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- EMPLOYER_DESIRED_PROFILES Table
-- Stores the ideal candidate profile criteria for a specific job posting.
CREATE TABLE employer_desired_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    min_experience NUMERIC(5,2) CHECK (min_experience >= 0),
    preferred_work_type VARCHAR(100),
    preferred_location VARCHAR(255),
    preferred_languages TEXT[],
    preferred_culture TEXT[],
    preferred_health_priorities TEXT[],
    free_text_requirements TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp_employer_desired_profiles
BEFORE UPDATE ON employer_desired_profiles
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- APPLICATIONS Table
-- Tracks when a professional applies to a job.
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    cover_letter TEXT,
    status application_status NOT NULL DEFAULT 'PENDING',
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_application UNIQUE (job_id, professional_id)
);

CREATE TRIGGER set_timestamp_applications
BEFORE UPDATE ON applications
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- RECOMMENDATION_HISTORY Table
-- Stores snapshots of AI recommendations to track the model's performance and inputs over time.
CREATE TABLE recommendation_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professional_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recommendation_type VARCHAR(100) NOT NULL,
    input_snapshot JSONB NOT NULL,
    result_snapshot JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SAVED_JOBS Table
-- Allows professionals to bookmark jobs for later viewing.
CREATE TABLE saved_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professional_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_saved_job UNIQUE (professional_id, job_id)
);

-- NOTIFICATIONS Table
-- Stores user alerts and messages.
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AUDIT_LOGS Table
-- Generic audit log for tracking significant system actions.
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id UUID NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 4. INDEXES
-- ==========================================
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Professional Profiles
CREATE INDEX idx_prof_profiles_profession ON professional_profiles(profession);
-- GIN index for text array searches on locations
CREATE INDEX idx_prof_profiles_locations ON professional_profiles USING GIN(preferred_locations); 

-- Employer Profiles
CREATE INDEX idx_emp_profiles_location ON employer_profiles(location);

-- Jobs
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_created_at ON jobs(created_at);
-- Partial index for active jobs (ignoring soft-deleted)
CREATE INDEX idx_jobs_active ON jobs(status) WHERE deleted_at IS NULL; 

-- Applications
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_prof_id ON applications(professional_id);

-- Recommendations
CREATE INDEX idx_recommendations_prof_id ON recommendation_history(professional_id);

-- ==========================================
-- 5. SEED DATA EXAMPLES
-- ==========================================
-- Insert a Professional User
INSERT INTO users (id, first_name, last_name, email, password_hash, role, is_verified)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000', 
    'Alice', 
    'Smith', 
    'alice@example.com', 
    '$2b$10$hashedpasswordhere...', 
    'PROFESSIONAL', 
    TRUE
);

-- Insert Professional Profile
INSERT INTO professional_profiles (user_id, profession, years_experience, desired_salary, preferred_locations, languages)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'Registered Nurse',
    5.5,
    80000.00,
    ARRAY['New York, NY', 'Remote'],
    ARRAY['English', 'Spanish']
);

-- Insert an Employer User
INSERT INTO users (id, first_name, last_name, email, password_hash, role, is_verified)
VALUES (
    '660e8400-e29b-41d4-a716-446655440001', 
    'Bob', 
    'Jones', 
    'hr@cityhospital.com', 
    '$2b$10$hashedpasswordhere...', 
    'EMPLOYER', 
    TRUE
);

-- Insert Employer Profile
INSERT INTO employer_profiles (user_id, institution_name, institution_type, location, website, description)
VALUES (
    '660e8400-e29b-41d4-a716-446655440001',
    'City General Hospital',
    'Hospital',
    'New York, NY',
    'https://cityhospital.example.com',
    'A leading healthcare provider in the metropolitan area.'
);

-- Insert a Job Posting
INSERT INTO jobs (id, employer_id, title, description, location, salary_min, salary_max, status)
VALUES (
    '770e8400-e29b-41d4-a716-446655440002',
    '660e8400-e29b-41d4-a716-446655440001',
    'Senior ER Nurse',
    'We are looking for an experienced ER nurse for night shifts.',
    'New York, NY',
    85000.00,
    110000.00,
    'PUBLISHED'
);

-- Insert an Application
INSERT INTO applications (job_id, professional_id, cover_letter, status)
VALUES (
    '770e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440000',
    'I have 5 years of ER experience and would love to join your team.',
    'PENDING'
);
