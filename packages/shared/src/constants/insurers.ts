export const INSURERS = [
  'AIA',
  'GREAT_EASTERN',
  'PRUDENTIAL',
  'SINGLIFE',
  'INCOME_INSURANCE',
  'MANULIFE',
  'HSBC_LIFE',
  'FWD',
  'TOKIO_MARINE',
  'RAFFLES_HEALTH',
  'ETIQA',
  'OTHER',
] as const;

export type InsurerId = (typeof INSURERS)[number];

export interface InsurerMetadata {
  id: InsurerId;
  name: string;
  shortName: string;
}

export const INSURER_DETAILS: Record<InsurerId, InsurerMetadata> = {
  AIA: { id: 'AIA', name: 'AIA Singapore', shortName: 'AIA' },
  GREAT_EASTERN: { id: 'GREAT_EASTERN', name: 'Great Eastern Life', shortName: 'Great Eastern' },
  PRUDENTIAL: { id: 'PRUDENTIAL', name: 'Prudential Assurance Company Singapore', shortName: 'Prudential' },
  SINGLIFE: { id: 'SINGLIFE', name: 'Singapore Life Ltd. (Singlife)', shortName: 'Singlife' },
  INCOME_INSURANCE: { id: 'INCOME_INSURANCE', name: 'Income Insurance Limited', shortName: 'Income' },
  MANULIFE: { id: 'MANULIFE', name: 'Manulife (Singapore) Pte. Ltd.', shortName: 'Manulife' },
  HSBC_LIFE: { id: 'HSBC_LIFE', name: 'HSBC Life (Singapore) Pte. Ltd.', shortName: 'HSBC Life' },
  FWD: { id: 'FWD', name: 'FWD Singapore Pte. Ltd.', shortName: 'FWD' },
  TOKIO_MARINE: { id: 'TOKIO_MARINE', name: 'Tokio Marine Life Insurance Singapore', shortName: 'Tokio Marine' },
  RAFFLES_HEALTH: { id: 'RAFFLES_HEALTH', name: 'Raffles Health Insurance', shortName: 'Raffles Health' },
  ETIQA: { id: 'ETIQA', name: 'Etiqa Insurance Pte. Ltd.', shortName: 'Etiqa' },
  OTHER: { id: 'OTHER', name: 'Other Insurer', shortName: 'Other' },
};
