-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Helper function to extract Firebase UID from JWT claims
-- Firebase Auth ID tokens passed to Supabase carry the UID in the 'sub' claim
CREATE OR REPLACE FUNCTION public.firebase_uid()
RETURNS text AS $$
  SELECT NULLIF(current_setting('request.jwt.claims', true)::json->>'sub', '')::text;
$$ LANGUAGE sql STABLE;

-- Profiles table: Represents account owners and their dependents/children
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  parent_id TEXT NULL,
  relationship TEXT NOT NULL DEFAULT 'SELF' CHECK (relationship IN ('SELF', 'CHILD', 'SPOUSE', 'PARENT', 'DEPENDENT')),
  full_name TEXT NOT NULL,
  preferred_name TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
  smoking_status BOOLEAN NOT NULL DEFAULT FALSE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Policies table: Stores insurance policy records for self or family members
CREATE TABLE IF NOT EXISTS public.policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  policy_number TEXT NOT NULL,
  insurer TEXT NOT NULL,
  policy_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'LIFE',
    'HEALTH',
    'CRITICAL_ILLNESS',
    'DISABILITY',
    'PERSONAL_ACCIDENT',
    'SAVINGS_ENDOWMENT',
    'INVESTMENT_LINKED'
  )),
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN (
    'ACTIVE',
    'LAPSED',
    'PAID_UP',
    'MATURED',
    'SURRENDERED'
  )),
  sum_assured NUMERIC(14, 2) NOT NULL DEFAULT 0,
  premium_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  premium_frequency TEXT NOT NULL DEFAULT 'ANNUALLY' CHECK (premium_frequency IN (
    'MONTHLY',
    'QUARTERLY',
    'SEMI_ANNUALLY',
    'ANNUALLY',
    'SINGLE'
  )),
  currency TEXT NOT NULL DEFAULT 'SGD',
  start_date DATE NOT NULL,
  end_date DATE,
  coverage_term TEXT,
  notes TEXT,
  riders JSONB NOT NULL DEFAULT '[]'::jsonb,
  document_storage_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_parent_id ON public.profiles(parent_id);
CREATE INDEX IF NOT EXISTS idx_policies_user_id ON public.policies(user_id);
CREATE INDEX IF NOT EXISTS idx_policies_profile_id ON public.policies(profile_id);
CREATE INDEX IF NOT EXISTS idx_policies_category ON public.policies(category);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Users can read own and dependent profiles"
  ON public.profiles FOR SELECT
  USING (
    user_id = public.firebase_uid() OR
    parent_id = public.firebase_uid()
  );

CREATE POLICY "Users can insert own and dependent profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (
    user_id = public.firebase_uid() OR
    parent_id = public.firebase_uid()
  );

CREATE POLICY "Users can update own and dependent profiles"
  ON public.profiles FOR UPDATE
  USING (
    user_id = public.firebase_uid() OR
    parent_id = public.firebase_uid()
  );

CREATE POLICY "Users can delete own and dependent profiles"
  ON public.profiles FOR DELETE
  USING (
    user_id = public.firebase_uid() OR
    parent_id = public.firebase_uid()
  );

-- Policies RLS Policies
CREATE POLICY "Users can read own and dependent policies"
  ON public.policies FOR SELECT
  USING (
    user_id = public.firebase_uid() OR
    profile_id IN (
      SELECT id FROM public.profiles WHERE parent_id = public.firebase_uid()
    )
  );

CREATE POLICY "Users can insert own policies"
  ON public.policies FOR INSERT
  WITH CHECK (
    user_id = public.firebase_uid()
  );

CREATE POLICY "Users can update own policies"
  ON public.policies FOR UPDATE
  USING (
    user_id = public.firebase_uid()
  );

CREATE POLICY "Users can delete own policies"
  ON public.policies FOR DELETE
  USING (
    user_id = public.firebase_uid()
  );
