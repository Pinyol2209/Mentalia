-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tipos ENUM personalizados
CREATE TYPE plan_type AS ENUM ('gratis', 'personal', 'plus', 'familiar', 'empresas');
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'trial', 'cancelled');
CREATE TYPE ai_personality AS ENUM ('empático', 'filosófico', 'coach', 'espiritual');
CREATE TYPE message_type AS ENUM ('user', 'ai', 'system');
CREATE TYPE exercise_category AS ENUM ('respiración', 'journaling', 'meditación', 'autoestima', 'motivación', 'relaciones');
CREATE TYPE difficulty_level AS ENUM ('básico', 'intermedio', 'avanzado');
CREATE TYPE report_type AS ENUM ('weekly', 'monthly');

-- 1. Tabla de usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    plan_type plan_type DEFAULT 'gratis' NOT NULL,
    subscription_status subscription_status DEFAULT 'inactive' NOT NULL,
    subscription_start_date TIMESTAMP WITH TIME ZONE,
    subscription_end_date TIMESTAMP WITH TIME ZONE,
    ai_personality ai_personality DEFAULT 'empático' NOT NULL,
    timezone VARCHAR(50) DEFAULT 'Europe/Madrid' NOT NULL,
    language VARCHAR(10) DEFAULT 'es' NOT NULL,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    last_active_at TIMESTAMP WITH TIME ZONE,
    family_group_id UUID,
    total_conversations INTEGER DEFAULT 0,
    monthly_conversations INTEGER DEFAULT 0,
    conversation_reset_date DATE DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. Tabla de grupos familiares
CREATE TABLE family_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name VARCHAR(100) NOT NULL,
    admin_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    max_members INTEGER DEFAULT 3,
    current_members INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. Tabla de categorías de servicios
CREATE TABLE service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0
);

-- 4. Tabla de ejercicios
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category exercise_category NOT NULL,
    duration_minutes INTEGER,
    difficulty_level difficulty_level DEFAULT 'básico',
    content TEXT NOT NULL,
    instructions TEXT,
    audio_url VARCHAR(500),
    video_url VARCHAR(500),
    is_premium BOOLEAN DEFAULT FALSE,
    price DECIMAL(10,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    tags TEXT[], -- Array de tags para búsqueda
    popularity_score INTEGER DEFAULT 0
);

-- 5. Tabla de personalidades de IA
CREATE TABLE ai_personalities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    prompt_template TEXT NOT NULL,
    tone VARCHAR(100),
    response_style TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    price DECIMAL(10,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- 6. Tabla de conversaciones
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID NOT NULL,
    message_type message_type NOT NULL,
    content TEXT NOT NULL,
    emotion_detected VARCHAR(50),
    emotion_confidence DECIMAL(3,2), -- 0.00 a 1.00
    category VARCHAR(100),
    exercise_triggered UUID REFERENCES exercises(id),
    tokens_used INTEGER,
    response_time_ms INTEGER,
    metadata JSONB DEFAULT '{}'::JSONB
);

-- 7. Tabla de seguimiento emocional
CREATE TABLE emotional_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    emotion VARCHAR(100) NOT NULL,
    intensity INTEGER CHECK (intensity >= 1 AND intensity <= 10),
    trigger_event TEXT,
    context TEXT,
    notes TEXT,
    week_number INTEGER NOT NULL,
    month_number INTEGER NOT NULL,
    year INTEGER NOT NULL,
    date DATE NOT NULL,
    source VARCHAR(50) DEFAULT 'manual' -- 'manual', 'ai_detected', 'exercise'
);

-- 8. Tabla de ejercicios del usuario
CREATE TABLE user_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    notes TEXT,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    session_data JSONB DEFAULT '{}'::JSONB
);

-- 9. Tabla de informes
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    report_type report_type NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    emotional_summary JSONB NOT NULL DEFAULT '{}'::JSONB,
    exercises_completed INTEGER DEFAULT 0,
    conversations_count INTEGER DEFAULT 0,
    mood_trends JSONB DEFAULT '{}'::JSONB,
    recommendations JSONB DEFAULT '{}'::JSONB,
    pdf_url VARCHAR(500),
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_sent BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP WITH TIME ZONE
);

-- 10. Tabla de motivación diaria
CREATE TABLE daily_motivations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    message TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'general', -- 'general', 'personalized', 'achievement'
    delivered_at TIMESTAMP WITH TIME ZONE,
    opened_at TIMESTAMP WITH TIME ZONE,
    is_sent BOOLEAN DEFAULT FALSE,
    UNIQUE(user_id, date)
);

-- 11. Tabla de suscripciones (historial de pagos)
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_type plan_type NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    payment_provider VARCHAR(50), -- 'stripe', 'paypal', 'gumroad'
    payment_id VARCHAR(200),
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'cancelled'
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 12. Tabla de configuraciones del sistema
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Tabla de métricas y analytics
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB DEFAULT '{}'::JSONB,
    session_id UUID,
    ip_address INET,
    user_agent TEXT
);

-- Agregar foreign key para family_group_id después de crear la tabla
ALTER TABLE users ADD CONSTRAINT fk_users_family_group 
    FOREIGN KEY (family_group_id) REFERENCES family_groups(id) ON DELETE SET NULL;

-- Crear índices para mejor rendimiento
CREATE INDEX idx_users_phone_number ON users(phone_number);
CREATE INDEX idx_users_plan_type ON users(plan_type);
CREATE INDEX idx_users_family_group ON users(family_group_id);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_session_id ON conversations(session_id);
CREATE INDEX idx_conversations_created_at ON conversations(created_at);
CREATE INDEX idx_emotional_tracking_user_id ON emotional_tracking(user_id);
CREATE INDEX idx_emotional_tracking_date ON emotional_tracking(date);
CREATE INDEX idx_user_exercises_user_id ON user_exercises(user_id);
CREATE INDEX idx_user_exercises_exercise_id ON user_exercises(exercise_id);
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_daily_motivations_user_date ON daily_motivations(user_id, date);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_analytics_user_id ON analytics(user_id);
CREATE INDEX idx_analytics_event_type ON analytics(event_type);

-- Crear funciones para automatización
CREATE OR REPLACE FUNCTION update_user_last_active()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users 
    SET last_active_at = NOW() 
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar last_active_at cuando hay una nueva conversación
CREATE TRIGGER trigger_update_user_last_active
    AFTER INSERT ON conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_user_last_active();

-- Función para reset de conversaciones mensuales
CREATE OR REPLACE FUNCTION reset_monthly_conversations()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.conversation_reset_date < CURRENT_DATE THEN
        NEW.monthly_conversations = 0;
        NEW.conversation_reset_date = CURRENT_DATE;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para reset automático de conversaciones mensuales
CREATE TRIGGER trigger_reset_monthly_conversations
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION reset_monthly_conversations();

-- Insertar datos iniciales
INSERT INTO service_categories (name, description, icon, color) VALUES
('Ansiedad', 'Técnicas para manejar y reducir la ansiedad', 'Brain', 'red'),
('Estrés', 'Herramientas para el manejo del estrés diario', 'Zap', 'orange'),
('Relaciones', 'Mejora tus relaciones interpersonales', 'Heart', 'pink'),
('Autoestima', 'Fortalece tu confianza y autoestima', 'Target', 'yellow'),
('Meditación', 'Práticas de mindfulness y meditación', 'Circle', 'blue'),
('Ejercicios', 'Rutinas para el bienestar mental', 'Activity', 'green'),
('Motivación', 'Incrementa tu motivación diaria', 'Sparkles', 'purple');

INSERT INTO ai_personalities (name, description, prompt_template, tone, response_style, is_premium, price) VALUES
('Empático', 'IA comprensiva y empática, ideal para apoyo emocional', 'Eres un asistente empático que escucha sin juzgar y ofrece apoyo emocional.', 'Cálido y comprensivo', 'Empático y validante', false, 0),
('Filosófico', 'Perspectiva profunda y reflexiva sobre la vida', 'Eres un filósofo sabio que ayuda a reflexionar sobre la vida y sus significados.', 'Reflexivo y profundo', 'Contemplativo y sabio', true, 0.99),
('Coach', 'Enfoque motivacional y orientado a objetivos', 'Eres un coach motivacional que ayuda a alcanzar objetivos y superar obstáculos.', 'Motivador y energético', 'Directo y motivacional', true, 0.99),
('Espiritual', 'Guía espiritual para crecimiento personal', 'Eres una guía espiritual que ayuda en el crecimiento personal y la conexión interior.', 'Sereno y espiritual', 'Inspirador y trascendente', true, 0.99);

INSERT INTO exercises (title, description, category, duration_minutes, difficulty_level, content, is_premium, price) VALUES
('Respiración 4-7-8', 'Técnica de respiración para calmar la ansiedad', 'respiración', 5, 'básico', 'Inhala durante 4 segundos, mantén 7 segundos, exhala durante 8 segundos.', false, 0),
('Journaling Emocional', 'Reflexiona sobre tus emociones del día', 'journaling', 15, 'básico', 'Escribe sobre cómo te sientes hoy y qué eventos influyeron en tus emociones.', false, 0),
('Meditación Mindfulness', 'Práctica de atención plena para principiantes', 'meditación', 10, 'básico', 'Siéntate cómodamente y enfoca tu atención en tu respiración.', false, 0),
('Autoestima Positiva', 'Ejercicio para fortalecer la autoestima', 'autoestima', 10, 'intermedio', 'Lista 5 cualidades positivas sobre ti mismo y reflexiona sobre cada una.', false, 0),
('Técnica de Relajación Muscular', 'Relajación progresiva para reducir el estrés', 'respiración', 20, 'intermedio', 'Tensa y relaja cada grupo muscular progresivamente.', true, 1.99);

INSERT INTO system_settings (key, value, description) VALUES
('max_free_conversations', '3', 'Número máximo de conversaciones para usuarios gratuitos'),
('conversation_reset_period', '30', 'Días para reset de contador de conversaciones'),
('ai_response_timeout', '30', 'Timeout en segundos para respuestas de IA'),
('report_generation_day', 'monday', 'Día de la semana para generar informes semanales'),
('motivation_send_time', '09:00', 'Hora para enviar mensajes motivacionales'); 