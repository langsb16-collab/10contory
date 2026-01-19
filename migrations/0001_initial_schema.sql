-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  native_language TEXT NOT NULL,
  target_topik_level INTEGER DEFAULT 1,
  exam_date TEXT,
  purpose TEXT, -- 'study', 'work', 'visa', 'residence'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Learning Progress table
CREATE TABLE IF NOT EXISTS learning_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  lesson_id TEXT NOT NULL,
  lesson_type TEXT NOT NULL, -- 'grammar', 'vocabulary', 'reading', 'listening', 'writing'
  status TEXT DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
  score INTEGER,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Mock Exam Results table
CREATE TABLE IF NOT EXISTS mock_exam_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  exam_type TEXT NOT NULL, -- 'diagnostic', 'mock_topik_1', 'mock_topik_2'
  listening_score INTEGER,
  reading_score INTEGER,
  writing_score INTEGER,
  total_score INTEGER,
  predicted_level INTEGER,
  taken_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Writing Submissions table
CREATE TABLE IF NOT EXISTS writing_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  question_id TEXT NOT NULL,
  content TEXT NOT NULL,
  grammar_score INTEGER,
  vocabulary_score INTEGER,
  structure_score INTEGER,
  relevance_score INTEGER,
  total_score INTEGER,
  feedback TEXT,
  tutor_reviewed BOOLEAN DEFAULT FALSE,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- University Partnerships table
CREATE TABLE IF NOT EXISTS universities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  name_en TEXT,
  location TEXT NOT NULL,
  min_topik_level INTEGER,
  scholarship_available BOOLEAN DEFAULT FALSE,
  contact_email TEXT,
  website TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Company Partnerships table
CREATE TABLE IF NOT EXISTS companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  location TEXT NOT NULL,
  job_positions TEXT, -- JSON array of positions
  min_topik_level INTEGER,
  visa_support BOOLEAN DEFAULT FALSE,
  contact_email TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User Applications table (for university/company connections)
CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  target_type TEXT NOT NULL, -- 'university', 'company'
  target_id INTEGER NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'interview'
  notes TEXT,
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Learning Content table (lessons, questions, materials)
CREATE TABLE IF NOT EXISTS learning_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_id TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL, -- 'grammar', 'vocabulary', 'reading', 'listening', 'writing'
  topik_level INTEGER NOT NULL,
  title_ko TEXT NOT NULL,
  title_en TEXT,
  content TEXT NOT NULL,
  difficulty TEXT, -- 'beginner', 'intermediate', 'advanced'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_learning_progress_user_id ON learning_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_mock_exam_results_user_id ON mock_exam_results(user_id);
CREATE INDEX IF NOT EXISTS idx_writing_submissions_user_id ON writing_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_content_level ON learning_content(topik_level);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
