export const POLICY_CATEGORIES = [
  'LIFE',
  'HEALTH',
  'CRITICAL_ILLNESS',
  'DISABILITY',
  'PERSONAL_ACCIDENT',
  'SAVINGS_ENDOWMENT',
  'INVESTMENT_LINKED',
] as const;

export type PolicyCategory = (typeof POLICY_CATEGORIES)[number];

export const PREMIUM_FREQUENCIES = [
  'MONTHLY',
  'QUARTERLY',
  'SEMI_ANNUALLY',
  'ANNUALLY',
  'SINGLE',
] as const;

export type PremiumFrequency = (typeof PREMIUM_FREQUENCIES)[number];

export const POLICY_STATUSES = [
  'ACTIVE',
  'LAPSED',
  'PAID_UP',
  'MATURED',
  'SURRENDERED',
] as const;

export type PolicyStatus = (typeof POLICY_STATUSES)[number];

export const DEFAULT_CURRENCY = 'SGD';

export interface CategoryMetadata {
  id: PolicyCategory;
  label: string;
  description: string;
}

export const CATEGORY_DETAILS: Record<PolicyCategory, CategoryMetadata> = {
  LIFE: {
    id: 'LIFE',
    label: 'Life Insurance',
    description: 'Term Life and Whole Life policies providing death and terminal illness coverage.',
  },
  HEALTH: {
    id: 'HEALTH',
    label: 'Health & Medical',
    description: 'Integrated Shield Plans (IP), riders, and hospital cash benefit plans.',
  },
  CRITICAL_ILLNESS: {
    id: 'CRITICAL_ILLNESS',
    label: 'Critical Illness',
    description: 'Early-stage, multi-pay, and advanced critical illness lump sum protection.',
  },
  DISABILITY: {
    id: 'DISABILITY',
    label: 'Disability Income',
    description: 'CareShield Life supplements and disability income protection.',
  },
  PERSONAL_ACCIDENT: {
    id: 'PERSONAL_ACCIDENT',
    label: 'Personal Accident',
    description: 'Accidental injury, medical reimbursement, and mobility support.',
  },
  SAVINGS_ENDOWMENT: {
    id: 'SAVINGS_ENDOWMENT',
    label: 'Savings & Endowment',
    description: 'Structured disciplined savings, retirement accumulation, and education endowments.',
  },
  INVESTMENT_LINKED: {
    id: 'INVESTMENT_LINKED',
    label: 'Investment-Linked (ILP)',
    description: 'Policies combining investment fund sub-accounts with insurance coverage.',
  },
};
