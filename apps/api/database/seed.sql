-- ACTION: CREATE
-- FILE: database/seed.sql

-- Clear existing data
TRUNCATE TABLE jobs, employer_profiles, employee_profiles, users CASCADE;

-- Insert 3 employer users
-- passwords = "password123" hashed with bcrypt (cost 12)
INSERT INTO users (id, email, password, role) VALUES
('11111111-1111-1111-1111-111111111111', 'employer1@test.com', '$2b$12$R9h/cIPz0gi.URNNX3ni2OPST9XJ1.x2XkP9UOM0p0L.bE8x0Q/xS', 'EMPLOYER'),
('22222222-2222-2222-2222-222222222222', 'employer2@test.com', '$2b$12$R9h/cIPz0gi.URNNX3ni2OPST9XJ1.x2XkP9UOM0p0L.bE8x0Q/xS', 'EMPLOYER'),
('33333333-3333-3333-3333-333333333333', 'employer3@test.com', '$2b$12$R9h/cIPz0gi.URNNX3ni2OPST9XJ1.x2XkP9UOM0p0L.bE8x0Q/xS', 'EMPLOYER');

-- Insert 3 employer profiles
INSERT INTO employer_profiles (user_id, company_name, location, institution_type) VALUES
('11111111-1111-1111-1111-111111111111', 'Addis General Hospital', 'Addis Ababa', 'Hospital'),
('22222222-2222-2222-2222-222222222222', 'Dire Dawa Clinic', 'Dire Dawa', 'Clinic'),
('33333333-3333-3333-3333-333333333333', 'Hawassa Health Center', 'Hawassa', 'Health Center');

-- Insert 5 employee users
INSERT INTO users (id, email, password, role) VALUES
('44444444-4444-4444-4444-444444444444', 'employee1@test.com', '$2b$12$R9h/cIPz0gi.URNNX3ni2OPST9XJ1.x2XkP9UOM0p0L.bE8x0Q/xS', 'EMPLOYEE'),
('55555555-5555-5555-5555-555555555555', 'employee2@test.com', '$2b$12$R9h/cIPz0gi.URNNX3ni2OPST9XJ1.x2XkP9UOM0p0L.bE8x0Q/xS', 'EMPLOYEE'),
('66666666-6666-6666-6666-666666666666', 'employee3@test.com', '$2b$12$R9h/cIPz0gi.URNNX3ni2OPST9XJ1.x2XkP9UOM0p0L.bE8x0Q/xS', 'EMPLOYEE'),
('77777777-7777-7777-7777-777777777777', 'employee4@test.com', '$2b$12$R9h/cIPz0gi.URNNX3ni2OPST9XJ1.x2XkP9UOM0p0L.bE8x0Q/xS', 'EMPLOYEE'),
('88888888-8888-8888-8888-888888888888', 'employee5@test.com', '$2b$12$R9h/cIPz0gi.URNNX3ni2OPST9XJ1.x2XkP9UOM0p0L.bE8x0Q/xS', 'EMPLOYEE');

-- Insert 5 employee profiles with varied preferences
INSERT INTO employee_profiles (user_id, location, work_type, salary_min, salary_max, institution_type, languages, culture, health_priorities, free_text) VALUES
('44444444-4444-4444-4444-444444444444', 'Addis Ababa', 'Full-time', 10000, 20000, 'Hospital', ARRAY['Amharic', 'English'], 'Collaborative', ARRAY['Primary Care'], 'Experienced nurse looking for a hospital setting.'),
('55555555-5555-5555-5555-555555555555', 'Mekelle', 'Part-time', 8000, 15000, 'Clinic', ARRAY['Tigrinya', 'English'], 'Fast-paced', ARRAY['Maternal Health'], 'Looking for part-time clinic work.'),
('66666666-6666-6666-6666-666666666666', 'Hawassa', 'Contract', 15000, 30000, 'Health Center', ARRAY['Amharic', 'Oromo'], 'Innovative', ARRAY['Infectious Diseases'], 'Seeking contract roles in health centers.'),
('77777777-7777-7777-7777-777777777777', 'Bahir Dar', 'Full-time', 20000, 40000, 'Hospital', ARRAY['Amharic'], 'Supportive', ARRAY['Surgery'], 'Specialized in surgical care.'),
('88888888-8888-8888-8888-888888888888', 'Dire Dawa', 'Full-time', 12000, 25000, 'Clinic', ARRAY['Somali', 'Amharic'], 'Flexible', ARRAY['Pediatrics'], 'Passionate about pediatric care.');

-- Insert 10 realistic health sector jobs in Ethiopian cities
INSERT INTO jobs (employer_id, title, location, work_type, salary_min, salary_max, institution_type, languages, culture, health_priorities, description) VALUES
('11111111-1111-1111-1111-111111111111', 'Senior Nurse', 'Addis Ababa', 'Full-time', 15000, 25000, 'Hospital', ARRAY['Amharic', 'English'], 'Collaborative', ARRAY['Primary Care'], 'Looking for an experienced nurse.'),
('11111111-1111-1111-1111-111111111111', 'Surgical Technician', 'Addis Ababa', 'Full-time', 25000, 45000, 'Hospital', ARRAY['Amharic'], 'Supportive', ARRAY['Surgery'], 'Urgently need a surgical tech.'),
('22222222-2222-2222-2222-222222222222', 'Pediatrician', 'Dire Dawa', 'Full-time', 30000, 50000, 'Clinic', ARRAY['Somali', 'Amharic'], 'Flexible', ARRAY['Pediatrics'], 'Pediatrician role in Dire Dawa.'),
('22222222-2222-2222-2222-222222222222', 'General Practitioner', 'Dire Dawa', 'Part-time', 15000, 20000, 'Clinic', ARRAY['Amharic'], 'Fast-paced', ARRAY['Primary Care'], 'Part time GP needed.'),
('33333333-3333-3333-3333-333333333333', 'Midwife', 'Hawassa', 'Full-time', 10000, 18000, 'Health Center', ARRAY['Amharic', 'Oromo'], 'Collaborative', ARRAY['Maternal Health'], 'Midwife for maternal care unit.'),
('33333333-3333-3333-3333-333333333333', 'Lab Technician', 'Hawassa', 'Contract', 12000, 22000, 'Health Center', ARRAY['Amharic'], 'Innovative', ARRAY['Infectious Diseases'], 'Contract lab tech role.'),
('11111111-1111-1111-1111-111111111111', 'Cardiologist', 'Addis Ababa', 'Full-time', 40000, 60000, 'Hospital', ARRAY['Amharic', 'English'], 'Fast-paced', ARRAY['Specialty Care'], 'Cardiologist specialist role.'),
('22222222-2222-2222-2222-222222222222', 'Nurse Assistant', 'Dire Dawa', 'Full-time', 8000, 12000, 'Clinic', ARRAY['Somali'], 'Supportive', ARRAY['Primary Care'], 'Assistant nurse required.'),
('33333333-3333-3333-3333-333333333333', 'Pharmacist', 'Hawassa', 'Full-time', 18000, 28000, 'Health Center', ARRAY['Amharic'], 'Collaborative', ARRAY['Primary Care'], 'Pharmacist for health center.'),
('11111111-1111-1111-1111-111111111111', 'Medical Officer', 'Mekelle', 'Contract', 20000, 35000, 'Hospital', ARRAY['Tigrinya', 'English'], 'Innovative', ARRAY['Primary Care'], 'Contract medical officer.');
