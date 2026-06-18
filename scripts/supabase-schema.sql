-- neuraxine Supabase Schema

-- 1. ADMINS TABLE
CREATE TABLE IF NOT EXISTS admins (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- 2. LEADS TABLE (Demo bookings)
CREATE TABLE IF NOT EXISTS leads (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name           TEXT NOT NULL,
  phone          TEXT NOT NULL,
  "businessName" TEXT NOT NULL,
  service        TEXT NOT NULL,
  budget         TEXT NOT NULL,
  message        TEXT,
  source         TEXT DEFAULT 'website',
  "createdAt"    TIMESTAMPTZ DEFAULT now(),
  "updatedAt"    TIMESTAMPTZ DEFAULT now()
);

-- 3. SERVICES TABLE (Managed from admin panel)
CREATE TABLE IF NOT EXISTS services (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT NOT NULL,
  description   TEXT NOT NULL,
  icon          TEXT NOT NULL,
  enabled       BOOLEAN DEFAULT true,
  "sortOrder"   INT DEFAULT 0,
  "createdAt"   TIMESTAMPTZ DEFAULT now(),
  "updatedAt"   TIMESTAMPTZ DEFAULT now()
);
