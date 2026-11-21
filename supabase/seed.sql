-- Seed data for local testing (Hermetic offline testing)
-- Simulated Firebase UID: 'mock-user-alice-123'

INSERT INTO public.profiles (id, user_id, parent_id, relationship, full_name, preferred_name, date_of_birth, gender, smoking_status)
VALUES 
  ('a0000000-0000-0000-0000-000000000001', 'mock-user-alice-123', NULL, 'SELF', 'Alice Tan', 'Alice', '1990-05-15', 'FEMALE', false),
  ('a0000000-0000-0000-0000-000000000002', 'mock-user-alice-123', 'mock-user-alice-123', 'CHILD', 'Lucas Tan', 'Lucas', '2020-08-20', 'MALE', false)
ON CONFLICT (id) DO NOTHING;

-- Alice's Policies
INSERT INTO public.policies (
  id, user_id, profile_id, policy_number, insurer, policy_name, category, status, sum_assured, premium_amount, premium_frequency, currency, start_date, coverage_term, notes
)
VALUES
  (
    'b0000000-0000-0000-0000-000000000001',
    'mock-user-alice-123',
    'a0000000-0000-0000-0000-000000000001',
    'AIA-LIFE-98231',
    'AIA',
    'AIA Guaranteed Protect Plus III',
    'LIFE',
    'ACTIVE',
    500000.00,
    2400.00,
    'ANNUALLY',
    'SGD',
    '2021-01-01',
    'To age 75',
    'Core term life protection with critical illness booster'
  ),
  (
    'b0000000-0000-0000-0000-000000000002',
    'mock-user-alice-123',
    'a0000000-0000-0000-0000-000000000001',
    'GE-HEALTH-44120',
    'GREAT_EASTERN',
    'GREAT SupremeHealth STANDARD & Rider',
    'HEALTH',
    'ACTIVE',
    1000000.00,
    650.00,
    'ANNUALLY',
    'SGD',
    '2019-06-15',
    'Annual Renewal',
    'Integrated Shield Plan with co-pay rider'
  ),
  (
    'b0000000-0000-0000-0000-000000000003',
    'mock-user-alice-123',
    'a0000000-0000-0000-0000-000000000002',
    'PRU-KID-11029',
    'PRUDENTIAL',
    'PRUEarly Stage Crisis Care for Child',
    'CRITICAL_ILLNESS',
    'ACTIVE',
    150000.00,
    720.00,
    'ANNUALLY',
    'SGD',
    '2021-09-01',
    '20-year term',
    'Child critical illness coverage for Lucas'
  )
ON CONFLICT (id) DO NOTHING;
