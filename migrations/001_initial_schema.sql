-- ============================================================================
-- DUZZA LIMITED - ENTERPRISE POSTGRESQL SCHEMA & MIGRATION SCRIPT
-- High-Performance UUIDv7 Primary Keys, Strict RBAC, Immutable Audit Trails
-- Standardized for CAMA 2020 Compliance and NDPA 2023 Auditability
-- ============================================================================

-- Enable pgcrypto for cryptographic hashing and random byte generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. DETERMINISTIC UUIDv7 GENERATOR FUNCTION (Time-Ordered for B-Tree Performance)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION generate_uuid_v7()
RETURNS uuid AS $$
DECLARE
  unix_time_ms bytea;
  uuid_bytes bytea;
BEGIN
  -- Extract 48-bit timestamp from current UTC millisecond epoch
  unix_time_ms := substring(int8send(floor(extract(epoch FROM clock_timestamp()) * 1000)::bigint) FROM 3 FOR 6);
  -- Generate 10 cryptographically secure random bytes
  uuid_bytes := unix_time_ms || gen_random_bytes(10);
  -- Set UUID version 7 in high nibble of byte 7 (0x70)
  uuid_bytes := set_byte(uuid_bytes, 6, (get_byte(uuid_bytes, 6) & 15) | 112);
  -- Set UUID variant (RFC 4122) in byte 9 (0x80)
  uuid_bytes := set_byte(uuid_bytes, 8, (get_byte(uuid_bytes, 8) & 63) | 128);
  RETURN encode(uuid_bytes, 'hex')::uuid;
END;
$$ LANGUAGE plpgsql VOLATILE;

-- ----------------------------------------------------------------------------
-- 2. ENUM DEFINITIONS
-- ----------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE user_role_enum AS ENUM ('SUPER_ADMIN', 'DIVISION_HEAD', 'OPERATIONS_MANAGER', 'COMPLIANCE_AUDITOR');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE vertical_type_enum AS ENUM ('INDUSTRIAL_B2B', 'CREATIVE_AGENCY', 'CONSUMER_RETAIL', 'HOSPITALITY_FOOD');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE division_status_enum AS ENUM ('ACTIVE', 'COMING_SOON', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE equipment_category_enum AS ENUM (
    'BATHYMETRIC_SURVEY',
    'HYDROSPATIAL_POSITIONING',
    'SUBSEA_DETECTION',
    'OFFSHORE_NAVIGATION',
    'HEAVY_CIVIL_MACHINERY',
    'FLOW_STATION_EQUIPMENT'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE equipment_availability_enum AS ENUM ('AVAILABLE', 'ON_HIRE', 'UNDER_MAINTENANCE', 'RESERVED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ----------------------------------------------------------------------------
-- 3. USERS & IDENTITY (RBAC & IAM)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT generate_uuid_v7(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  role user_role_enum NOT NULL DEFAULT 'OPERATIONS_MANAGER',
  is_active BOOLEAN NOT NULL DEFAULT true,
  mfa_secret VARCHAR(100),
  mfa_enabled BOOLEAN NOT NULL DEFAULT false,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ----------------------------------------------------------------------------
-- 4. DIVISIONS (Holding Umbrella Structure)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS divisions (
  id UUID PRIMARY KEY DEFAULT generate_uuid_v7(),
  slug VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  vertical_type vertical_type_enum NOT NULL,
  status division_status_enum NOT NULL DEFAULT 'ACTIVE',
  description TEXT NOT NULL,
  hero_tagline TEXT NOT NULL,
  accent_color VARCHAR(10) NOT NULL,
  target_route VARCHAR(50) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_divisions_slug ON divisions(slug);
CREATE INDEX IF NOT EXISTS idx_divisions_status ON divisions(status);

-- ----------------------------------------------------------------------------
-- 5. CASE STUDIES & PORTFOLIO MATRICES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT generate_uuid_v7(),
  division_id UUID NOT NULL REFERENCES divisions(id) ON DELETE RESTRICT,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  client_name VARCHAR(150) NOT NULL,
  client_sector VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL DEFAULT 'Nigeria',
  location_detail VARCHAR(150),
  challenge TEXT NOT NULL,
  scope_delivered JSONB NOT NULL DEFAULT '[]'::jsonb,
  results_metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
  media_gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_case_studies_division ON case_studies(division_id);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(is_featured);

-- ----------------------------------------------------------------------------
-- 6. EQUIPMENT HIRE INVENTORY (Hydrographic & Marine Survey Catalogue)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS equipment_inventory (
  id UUID PRIMARY KEY DEFAULT generate_uuid_v7(),
  division_id UUID NOT NULL REFERENCES divisions(id) ON DELETE RESTRICT,
  item_code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  category equipment_category_enum NOT NULL,
  availability equipment_availability_enum NOT NULL DEFAULT 'AVAILABLE',
  technical_specs JSONB NOT NULL DEFAULT '{}'::jsonb,
  daily_hire_rate_ngn NUMERIC(14, 2),
  spec_sheet_pdf_url TEXT,
  featured_image_url TEXT NOT NULL,
  operational_base VARCHAR(100) NOT NULL DEFAULT 'Warri Marine Base, Delta State',
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_equipment_category ON equipment_inventory(category);
CREATE INDEX IF NOT EXISTS idx_equipment_availability ON equipment_inventory(availability);
CREATE INDEX IF NOT EXISTS idx_equipment_item_code ON equipment_inventory(item_code);

-- ----------------------------------------------------------------------------
-- 7. ENQUIRIES & LEAD CAPTURE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT generate_uuid_v7(),
  reference_code VARCHAR(60) NOT NULL UNIQUE,
  division VARCHAR(50) NOT NULL,
  payload_jsonb JSONB NOT NULL,
  risk_score NUMERIC(3, 2) NOT NULL DEFAULT 1.0,
  ip_address VARCHAR(50) NOT NULL,
  user_agent TEXT NOT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'PENDING_DISPATCH',
  routed_to VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_enquiries_reference ON enquiries(reference_code);
CREATE INDEX IF NOT EXISTS idx_enquiries_division ON enquiries(division);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at DESC);

-- ----------------------------------------------------------------------------
-- 8. IMMUTABLE AUDIT TRAILS (Tamper-Evident SIEM Ledger)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS immutable_audit_logs (
  id UUID PRIMARY KEY DEFAULT generate_uuid_v7(),
  action VARCHAR(100) NOT NULL,
  actor_id VARCHAR(150) NOT NULL,
  ip_address VARCHAR(50) NOT NULL,
  user_agent TEXT NOT NULL,
  entity_table VARCHAR(80) NOT NULL,
  entity_id VARCHAR(100),
  diff_jsonb JSONB NOT NULL DEFAULT '{}'::jsonb,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  signature_hash TEXT
);

-- Cryptographic Tamper-Evident Hash Function for Audit Records
CREATE OR REPLACE FUNCTION audit_row_integrity_hash()
RETURNS TRIGGER AS $$
BEGIN
  NEW.signature_hash := encode(
    digest(
      concat_ws(':', NEW.id, NEW.action, NEW.actor_id, NEW.ip_address, NEW.entity_table, NEW.entity_id, NEW.recorded_at::text),
      'sha256'
    ),
    'hex'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_audit_signature ON immutable_audit_logs;
CREATE TRIGGER trg_audit_signature
  BEFORE INSERT ON immutable_audit_logs
  FOR EACH ROW
  EXECUTE FUNCTION audit_row_integrity_hash();

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON immutable_audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON immutable_audit_logs(entity_table, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_recorded ON immutable_audit_logs(recorded_at DESC);

-- ----------------------------------------------------------------------------
-- 9. NDPA 2023 & GDPR DATA SUBJECT REQUESTS (Right-To-Be-Forgotten / Export)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS compliance_data_requests (
  id UUID PRIMARY KEY DEFAULT generate_uuid_v7(),
  request_type VARCHAR(40) NOT NULL, -- 'DATA_EXPORT' or 'RIGHT_TO_ERASURE'
  requester_email VARCHAR(255) NOT NULL,
  verification_token VARCHAR(100) NOT NULL UNIQUE,
  status VARCHAR(40) NOT NULL DEFAULT 'PENDING_VERIFICATION',
  client_ip VARCHAR(50) NOT NULL,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_compliance_email ON compliance_data_requests(requester_email);

-- ----------------------------------------------------------------------------
-- 10. SEED PRODUCTION DATA (DUZZA LIMITED DIVISIONS & EQUIPMENT)
-- ----------------------------------------------------------------------------
INSERT INTO divisions (slug, name, vertical_type, status, description, hero_tagline, accent_color, target_route, contact_email, display_order)
VALUES
  (
    'projects',
    'Duzza Projects',
    'INDUSTRIAL_B2B',
    'ACTIVE',
    'General Contracting, Civil Engineering, Oil & Gas Infrastructure, and Hydrospatial Marine Survey Services.',
    'Precision Engineering, Marine Survey, and Heavy Industrial Infrastructure.',
    '#FF6B35',
    '/projects',
    'projects-procurement@duzza.com.ng',
    1
  ),
  (
    'branding',
    'Duzza Branding',
    'CREATIVE_AGENCY',
    'ACTIVE',
    'Executive Branding, Corporate Identity Design, and Global Sports Media Creative Production.',
    'Brands That Look the Part and Perform on Every Screen.',
    '#CCFF00',
    '/branding',
    'branding-briefs@duzza.com.ng',
    2
  ),
  (
    'fashion',
    'Duzza Fashion',
    'CONSUMER_RETAIL',
    'COMING_SOON',
    'Bespoke Tailoring, English & Contemporary Ankara Apparel, Luxury Accessories.',
    'Artisanal Tailoring Meets Contemporary African Luxury.',
    '#D4AF37',
    '/fashion',
    'fashion@duzza.com.ng',
    3
  ),
  (
    'bakery',
    'Duzza Bakery & Eatery',
    'HOSPITALITY_FOOD',
    'COMING_SOON',
    'Artisan Confectionery, Gourmet Pastries, and Premium Dining Experiences.',
    'Warm Culinary Craftsmanship and Gourmet Confectionery.',
    '#3D2314',
    '/bakery',
    'eatery@duzza.com.ng',
    4
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  hero_tagline = EXCLUDED.hero_tagline;

-- Seed Active Hydrographic Equipment for Duzza Projects
DO $$
DECLARE
  v_projects_id UUID;
BEGIN
  SELECT id INTO v_projects_id FROM divisions WHERE slug = 'projects' LIMIT 1;

  IF v_projects_id IS NOT NULL THEN
    INSERT INTO equipment_inventory (division_id, item_code, name, category, availability, technical_specs, daily_hire_rate_ngn, featured_image_url)
    VALUES
      (
        v_projects_id,
        'EQ-MBES-7125',
        'Reson SeaBat T50-P Ultra-High Resolution Multibeam Echo Sounder',
        'BATHYMETRIC_SURVEY',
        'AVAILABLE',
        '{"frequencies": "190 - 420 kHz", "depth_capability": "0.5m to 575m", "swath_coverage": "Up to 150 degrees", "sounding_rate": "Up to 50 pings/sec"}'::jsonb,
        1850000.00,
        'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1200'
      ),
      (
        v_projects_id,
        'EQ-GNSS-R12I',
        'Trimble R12i GNSS Real-Time Kinematic (RTK) Rover & Base System',
        'HYDROSPATIAL_POSITIONING',
        'AVAILABLE',
        '{"channels": "672", "constellations": "GPS, GLONASS, Galileo, BeiDou", "tilt_compensation": "Inertial IMU up to 30 deg", "accuracy": "8mm H / 15mm V"}'::jsonb,
        450000.00,
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200'
      ),
      (
        v_projects_id,
        'EQ-SBP-3000',
        'EdgeTech 3100 Sub-Bottom Profiler Chirp System',
        'SUBSEA_DETECTION',
        'AVAILABLE',
        '{"pulse_technology": "Full Spectrum CHIRP", "penetration": "Up to 80m into soft seabed", "resolution": "8 cm vertical", "tow_depth": "Up to 300m"}'::jsonb,
        1400000.00,
        'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200'
      )
    ON CONFLICT (item_code) DO NOTHING;
  END IF;
END $$;

