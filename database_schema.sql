-- Business Partner App Database Schema
-- This file contains the SQL commands to create all necessary tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    skills TEXT[],
    bio TEXT,
    location TEXT,
    type_of_partnership TEXT,
    avatar_url TEXT,
    linkedin_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    stage TEXT NOT NULL CHECK (stage IN ('فكرة', 'MVP', 'قائم')),
    needed_skills TEXT[],
    share_percentage FLOAT,
    category TEXT NOT NULL,
    city TEXT,
    pitch_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'voice')),
    file_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partnerships table
CREATE TABLE IF NOT EXISTS partnerships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    partner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
    offer_details TEXT,
    proposed_share FLOAT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(project_id, partner_id)
);

-- Ratings table
CREATE TABLE IF NOT EXISTS ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rater_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rated_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
    feedback TEXT,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(rater_id, rated_user_id, project_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_owner_id ON projects(owner_id);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_stage ON projects(stage);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_sender_receiver ON messages(sender_id, receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_partnerships_project_id ON partnerships(project_id);
CREATE INDEX IF NOT EXISTS idx_partnerships_partner_id ON partnerships(partner_id);
CREATE INDEX IF NOT EXISTS idx_ratings_rated_user_id ON ratings(rated_user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partnerships_updated_at BEFORE UPDATE ON partnerships
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all profiles" ON users
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Anyone can view projects" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Users can create projects" ON projects
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own projects" ON projects
    FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own projects" ON projects
    FOR DELETE USING (auth.uid() = owner_id);

-- Messages policies
CREATE POLICY "Users can view own messages" ON messages
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Partnerships policies
CREATE POLICY "Users can view partnerships they're involved in" ON partnerships
    FOR SELECT USING (
        auth.uid() = partner_id OR 
        auth.uid() IN (SELECT owner_id FROM projects WHERE id = project_id)
    );

CREATE POLICY "Users can create partnership requests" ON partnerships
    FOR INSERT WITH CHECK (auth.uid() = partner_id);

CREATE POLICY "Project owners can update partnership status" ON partnerships
    FOR UPDATE USING (
        auth.uid() IN (SELECT owner_id FROM projects WHERE id = project_id)
    );

-- Ratings policies
CREATE POLICY "Anyone can view ratings" ON ratings
    FOR SELECT USING (true);

CREATE POLICY "Users can create ratings" ON ratings
    FOR INSERT WITH CHECK (auth.uid() = rater_id);

-- Insert sample data
INSERT INTO users (id, full_name, email, skills, bio, location, type_of_partnership, avatar_url) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'أحمد محمد', 'ahmed@example.com', ARRAY['React Native', 'Node.js', 'AI/ML'], 'مطور تطبيقات ذكية مع خبرة 5 سنوات', 'الرياض، السعودية', 'تقني', NULL),
    ('550e8400-e29b-41d4-a716-446655440002', 'فاطمة أحمد', 'fatima@example.com', ARRAY['التسويق الرقمي', 'المبيعات', 'إدارة المحتوى'], 'خبيرة تسويق رقمي ومتخصصة في نمو الأعمال', 'جدة، السعودية', 'تسويقي', NULL),
    ('550e8400-e29b-41d4-a716-446655440003', 'محمد العلي', 'mohammed@example.com', ARRAY['الاستثمار', 'إدارة الأعمال', 'التوسع'], 'مستثمر ورائد أعمال مع محفظة استثمارية متنوعة', 'الدمام، السعودية', 'مالي', NULL),
    ('550e8400-e29b-41d4-a716-446655440004', 'سارة خالد', 'sara@example.com', ARRAY['React', 'UI/UX Design', 'Backend Development'], 'مصممة ومطورة واجهات مستخدم', 'الكويت، الكويت', 'تقني', NULL),
    ('550e8400-e29b-41d4-a716-446655440005', 'عبدالله الزهراني', 'abdullah@example.com', ARRAY['Python', 'Machine Learning', 'Financial Analysis'], 'محلل مالي ومطور خوارزميات ذكية', 'دبي، الإمارات', 'تقني', NULL),
    ('550e8400-e29b-41d4-a716-446655440006', 'نورا السالم', 'nora@example.com', ARRAY['التسويق', 'إدارة العمليات', 'خدمة العملاء'], 'مديرة عمليات ومتخصصة في تطوير الأعمال', 'الدوحة، قطر', 'إداري', NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO projects (id, owner_id, title, description, stage, needed_skills, share_percentage, category, city, is_featured) VALUES
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'تطبيق توصيل طعام ذكي', 'نبحث عن شريك تقني لتطوير تطبيق توصيل طعام يستخدم الذكاء الاصطناعي لتحسين تجربة المستخدم وتوقع الطلبات.', 'فكرة', ARRAY['React Native', 'Node.js', 'AI/ML'], 25.0, 'تقني', 'الرياض، السعودية', true),
    ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'منصة تعليم إلكتروني', 'مشروع منصة تعليمية تفاعلية تستهدف الطلاب في المرحلة الثانوية. نحتاج شريك في التسويق والمبيعات.', 'MVP', ARRAY['التسويق الرقمي', 'المبيعات', 'إدارة المحتوى'], 30.0, 'تعليمي', 'جدة، السعودية', true),
    ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'متجر إلكتروني للمنتجات الحرفية', 'متجر إلكتروني يركز على بيع المنتجات الحرفية المحلية. نبحث عن شريك مالي لتوسيع العمليات.', 'قائم', ARRAY['الاستثمار', 'إدارة الأعمال', 'التوسع'], 20.0, 'تجاري', 'الدمام، السعودية', true),
    ('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'تطبيق إدارة المهام للفرق', 'تطبيق ويب لإدارة المهام والمشاريع للفرق الصغيرة والمتوسطة. نحتاج شريك في التطوير والتصميم.', 'فكرة', ARRAY['React', 'UI/UX Design', 'Backend Development'], 40.0, 'تقني', 'الكويت، الكويت', true),
    ('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'خدمة استشارات مالية رقمية', 'منصة تقدم استشارات مالية شخصية باستخدام الذكاء الاصطناعي. نبحث عن شريك في التطوير التقني.', 'MVP', ARRAY['Python', 'Machine Learning', 'Financial Analysis'], 35.0, 'مالي', 'دبي، الإمارات', true),
    ('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440006', 'تطبيق حجز الملاعب الرياضية', 'تطبيق موبايل لحجز الملاعب الرياضية والأنشطة الترفيهية. نحتاج شريك في التسويق والعمليات.', 'قائم', ARRAY['التسويق', 'إدارة العمليات', 'خدمة العملاء'], 25.0, 'رياضي', 'الدوحة، قطر', true)
ON CONFLICT (id) DO NOTHING;

