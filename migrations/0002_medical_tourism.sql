-- Medical Tourism Health Checkup Packages
CREATE TABLE IF NOT EXISTS health_packages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  package_code TEXT UNIQUE NOT NULL,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  package_type TEXT NOT NULL, -- 'basic', 'comprehensive', 'cancer', 'vip'
  target_countries TEXT, -- JSON array
  price_krw INTEGER NOT NULL,
  duration_hours INTEGER NOT NULL,
  description_ko TEXT,
  description_en TEXT,
  included_items TEXT, -- JSON array
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Medical Facilities (Hospitals and Clinics)
CREATE TABLE IF NOT EXISTS medical_facilities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  facility_code TEXT UNIQUE NOT NULL,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  facility_type TEXT NOT NULL, -- 'hospital', 'korean_medicine', 'wellness'
  address_ko TEXT NOT NULL,
  address_en TEXT,
  phone TEXT,
  specialties TEXT, -- JSON array
  languages_supported TEXT, -- JSON array
  operating_hours TEXT,
  has_interpreter BOOLEAN DEFAULT FALSE,
  has_vip_room BOOLEAN DEFAULT FALSE,
  website TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Korean Medicine (Hanyang) Programs
CREATE TABLE IF NOT EXISTS hanyang_programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_code TEXT UNIQUE NOT NULL,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  treatment_type TEXT NOT NULL, -- 'acupuncture', 'moxibustion', 'chuna', 'herbal'
  target_condition TEXT, -- 'digestive', 'musculoskeletal', 'stress'
  duration_minutes INTEGER NOT NULL,
  price_krw INTEGER NOT NULL,
  description_ko TEXT,
  description_en TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Medical Tourism Bookings
CREATE TABLE IF NOT EXISTS medical_bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_code TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  nationality TEXT NOT NULL,
  native_language TEXT NOT NULL,
  health_package_id INTEGER,
  hanyang_program_id INTEGER,
  preferred_date TEXT NOT NULL,
  num_people INTEGER DEFAULT 1,
  has_interpreter_request BOOLEAN DEFAULT FALSE,
  special_requests TEXT,
  booking_status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  total_price_krw INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (health_package_id) REFERENCES health_packages(id),
  FOREIGN KEY (hanyang_program_id) REFERENCES hanyang_programs(id)
);

-- Pre-screening Questionnaire
CREATE TABLE IF NOT EXISTS medical_questionnaire (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER NOT NULL,
  age INTEGER,
  gender TEXT,
  family_history TEXT, -- JSON
  current_medications TEXT, -- JSON
  chronic_conditions TEXT, -- JSON
  lifestyle_data TEXT, -- JSON (smoking, drinking, exercise)
  recommended_tests TEXT, -- JSON array (AI generated)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES medical_bookings(id)
);

-- Medical Tourism Statistics
CREATE TABLE IF NOT EXISTS medical_tourism_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stat_date DATE NOT NULL,
  nationality TEXT NOT NULL,
  total_visitors INTEGER DEFAULT 0,
  total_revenue_krw INTEGER DEFAULT 0,
  avg_stay_days REAL DEFAULT 0,
  return_rate REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample health checkup packages
INSERT OR IGNORE INTO health_packages (package_code, name_ko, name_en, package_type, target_countries, price_krw, duration_hours, description_ko, description_en, included_items) VALUES
('PKG001', '기본 건강검진', 'Basic Health Checkup', 'basic', '["China", "Vietnam", "Mongolia"]', 150000, 2, '기본 혈액검사, 소변검사, 흉부X-선, 심전도', 'Basic blood test, urine test, chest X-ray, ECG', '["혈액검사", "소변검사", "흉부X-선", "심전도", "의사상담"]'),
('PKG002', '종합 정밀검진', 'Comprehensive Checkup', 'comprehensive', '["China", "Taiwan", "Middle East"]', 450000, 4, '전신 정밀검사 + CT/MRI + 내시경', 'Full body scan + CT/MRI + Endoscopy', '["혈액정밀검사", "CT촬영", "MRI", "위내시경", "대장내시경", "초음파", "의사상담"]'),
('PKG003', '5대암 특화검진', 'Cancer Screening Package', 'cancer', '["China", "Japan", "Taiwan"]', 580000, 5, '위암, 대장암, 간암, 폐암, 유방암 특화', 'Specialized screening for 5 major cancers', '["종양표지자검사", "CT", "MRI", "내시경", "초음파", "유방촬영", "전문의상담"]'),
('PKG004', 'VIP 프리미엄 검진', 'VIP Premium Checkup', 'vip', '["Middle East", "China"]', 1200000, 6, '최고급 건강검진 + 1:1 전담 코디네이터', 'Premium health checkup with dedicated coordinator', '["전항목정밀검사", "PET-CT", "MRI", "내시경", "전담코디", "VIP라운지", "특식제공", "리무진서비스"]');

-- Insert sample medical facilities
INSERT OR IGNORE INTO medical_facilities (facility_code, name_ko, name_en, facility_type, address_ko, address_en, phone, specialties, languages_supported, has_interpreter, has_vip_room) VALUES
('FAC001', '경산중앙병원', 'Gyeongsan Central Hospital', 'hospital', '경상북도 경산시 중앙로 123', 'Gyeongsan-si, Gyeongsangbuk-do', '053-123-4567', '["종합건강검진", "5대암검진", "심혈관검진"]', '["Korean", "English", "Chinese"]', TRUE, TRUE),
('FAC002', '세명병원', 'Semyung Hospital', 'hospital', '경상북도 경산시 하양읍 세명로 45', 'Hayang-eup, Gyeongsan-si', '053-234-5678', '["기업검진", "정기검진", "건강증진"]', '["Korean", "English"]', TRUE, FALSE),
('FAC003', '경산S한의원', 'Gyeongsan S Korean Medicine Clinic', 'korean_medicine', '경상북도 경산시 삼풍로 67', 'Gyeongsan-si, Gyeongsangbuk-do', '053-345-6789', '["침구", "뜸", "한방치료", "사상체질"]', '["Korean", "English", "Chinese"]', TRUE, FALSE),
('FAC004', '청추나한의원 경산점', 'Chung Chuna Korean Medicine Clinic', 'korean_medicine', '경상북도 경산시 옥산로 89', 'Gyeongsan-si, Gyeongsangbuk-do', '053-456-7890', '["추나요법", "통증치료", "근골격계"]', '["Korean", "English"]', FALSE, FALSE);

-- Insert sample Korean medicine programs
INSERT OR IGNORE INTO hanyang_programs (program_code, name_ko, name_en, treatment_type, target_condition, duration_minutes, price_krw, description_ko, description_en) VALUES
('HAN001', '소화기 침뜸치료', 'Digestive Acupuncture & Moxibustion', 'acupuncture', 'digestive', 60, 80000, '소화불량, 위장 장애 개선', 'Treatment for digestive issues and stomach disorders'),
('HAN002', '근골격 추나요법', 'Musculoskeletal Chuna Therapy', 'chuna', 'musculoskeletal', 45, 120000, '목, 어깨, 허리 통증 완화', 'Relief for neck, shoulder, and back pain'),
('HAN003', '스트레스 약침치료', 'Stress Relief Herbal Acupuncture', 'acupuncture', 'stress', 50, 100000, '스트레스 해소 및 심신안정', 'Stress relief and mental stability'),
('HAN004', '사상체질 맞춤 한약', 'Constitutional Herbal Medicine', 'herbal', 'general', 30, 150000, '개인 체질에 맞는 한약 처방', 'Personalized herbal prescription based on constitution');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_health_packages_type ON health_packages(package_type);
CREATE INDEX IF NOT EXISTS idx_medical_facilities_type ON medical_facilities(facility_type);
CREATE INDEX IF NOT EXISTS idx_medical_bookings_status ON medical_bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_medical_bookings_date ON medical_bookings(preferred_date);
CREATE INDEX IF NOT EXISTS idx_hanyang_programs_type ON hanyang_programs(treatment_type);
