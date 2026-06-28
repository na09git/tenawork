-- ACTION: CREATE
-- FILE: database/schema.sql

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum for roles
CREATE TYPE user_role AS ENUM ('EMPLOYEE', 'EMPLOYER', 'ADMIN');

-- Users table
CREATE TABLE users (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email             VARCHAR(255) UNIQUE NOT NULL,
  password          VARCHAR(255) NOT NULL,
  role              user_role NOT NULL DEFAULT 'EMPLOYEE',
  created_at        TIMESTAMP DEFAULT NOW(),
  updated_at        TIMESTAMP DEFAULT NOW()
);

-- Employee profiles
CREATE TABLE employee_profiles (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  location          VARCHAR(255),
  work_type         VARCHAR(100),
  salary_min        NUMERIC,
  salary_max        NUMERIC,
  institution_type  VARCHAR(100),
  languages         TEXT[],
  culture           VARCHAR(100),
  health_priorities TEXT[],
  free_text         TEXT,
  created_at        TIMESTAMP DEFAULT NOW(),
  updated_at        TIMESTAMP DEFAULT NOW()
);

-- Employer profiles
CREATE TABLE employer_profiles (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name      VARCHAR(255),
  location          VARCHAR(255),
  institution_type  VARCHAR(100),
  created_at        TIMESTAMP DEFAULT NOW(),
  updated_at        TIMESTAMP DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title             VARCHAR(255) NOT NULL,
  location          VARCHAR(255) NOT NULL,
  work_type         VARCHAR(100) NOT NULL,
  salary_min        NUMERIC NOT NULL,
  salary_max        NUMERIC NOT NULL,
  institution_type  VARCHAR(100) NOT NULL,
  languages         TEXT[],
  culture           VARCHAR(100),
  health_priorities TEXT[],
  description       TEXT,
  is_active         BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMP DEFAULT NOW(),
  updated_at        TIMESTAMP DEFAULT NOW()
);
