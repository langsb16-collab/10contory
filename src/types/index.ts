export type Bindings = {
  DB: D1Database;
};

export type User = {
  id: number;
  email: string;
  name: string;
  native_language: string;
  target_topik_level: number;
  exam_date?: string;
  purpose?: string;
  created_at: string;
};

export type LearningProgress = {
  id: number;
  user_id: number;
  lesson_id: string;
  lesson_type: string;
  status: string;
  score?: number;
  completed_at?: string;
};

export type MockExamResult = {
  id: number;
  user_id: number;
  exam_type: string;
  listening_score?: number;
  reading_score?: number;
  writing_score?: number;
  total_score: number;
  predicted_level: number;
  taken_at: string;
};

export type University = {
  id: number;
  name: string;
  name_en?: string;
  location: string;
  min_topik_level: number;
  scholarship_available: boolean;
  contact_email?: string;
  website?: string;
};

export type Company = {
  id: number;
  name: string;
  industry: string;
  location: string;
  job_positions?: string;
  min_topik_level: number;
  visa_support: boolean;
  contact_email?: string;
};
