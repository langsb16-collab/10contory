-- Sample Universities (Gyeongsan area)
INSERT OR IGNORE INTO universities (name, name_en, location, min_topik_level, scholarship_available, website) VALUES
('영남대학교', 'Yeungnam University', 'Gyeongsan, Gyeongbuk', 3, TRUE, 'https://www.yu.ac.kr'),
('대구대학교', 'Daegu University', 'Gyeongsan, Gyeongbuk', 3, TRUE, 'https://www.daegu.ac.kr'),
('대구한의대학교', 'Daegu Haany University', 'Gyeongsan, Gyeongbuk', 3, FALSE, 'https://www.dhu.ac.kr'),
('경일대학교', 'Kyungil University', 'Gyeongsan, Gyeongbuk', 2, TRUE, 'https://www.kiu.ac.kr'),
('호산대학교', 'Hosan University', 'Gyeongsan, Gyeongbuk', 2, FALSE, 'https://www.hosan.ac.kr');

-- Sample Companies (Manufacturing focus)
INSERT OR IGNORE INTO companies (name, industry, location, job_positions, min_topik_level, visa_support) VALUES
('경산 자동차부품 주식회사', 'Automotive Parts', 'Gyeongsan, Gyeongbuk', '["생산직", "품질관리", "기술보조"]', 2, TRUE),
('경북 기계금속 주식회사', 'Machinery & Metal', 'Gyeongsan, Gyeongbuk', '["생산직", "기계조작", "검사원"]', 2, TRUE),
('대구 전자소재 주식회사', 'Electronics', 'Daegu', '["생산직", "품질검사", "R&D 보조"]', 3, TRUE),
('경산 바이오헬스 주식회사', 'Bio & Health', 'Gyeongsan, Gyeongbuk', '["실험보조", "품질관리", "연구보조"]', 3, FALSE);

-- Sample test user
INSERT OR IGNORE INTO users (email, password_hash, name, native_language, target_topik_level, purpose) VALUES
('test@example.com', 'dummy_hash', 'Test User', 'English', 3, 'study');

-- Sample learning content (Basic Korean)
INSERT OR IGNORE INTO learning_content (content_id, type, topik_level, title_ko, title_en, content, difficulty) VALUES
('grammar_001', 'grammar', 1, '은/는 조사', 'Topic Markers 은/는', '주어를 나타내는 조사입니다. 받침이 있으면 "은", 없으면 "는"을 사용합니다.', 'beginner'),
('grammar_002', 'grammar', 1, '이/가 조사', 'Subject Markers 이/가', '주격을 나타내는 조사입니다. 받침이 있으면 "이", 없으면 "가"를 사용합니다.', 'beginner'),
('vocab_001', 'vocabulary', 1, '인사말', 'Greetings', '안녕하세요, 감사합니다, 죄송합니다, 안녕히 가세요', 'beginner'),
('vocab_002', 'vocabulary', 1, '가족', 'Family', '아버지, 어머니, 형, 누나, 동생, 할아버지, 할머니', 'beginner');
