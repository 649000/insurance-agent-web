import { z } from 'zod';
import { INSURERS } from '../constants/insurers.js';
import { POLICY_CATEGORIES, PREMIUM_FREQUENCIES, POLICY_STATUSES } from '../constants/categories.js';

export const CoverageRiderSchema = z.object({
  id: z.string().uuid(),
  riderName: z.string().min(1, 'Rider name is required'),
  category: z.enum(POLICY_CATEGORIES),
  sumAssured: z.number().nonnegative().default(0),
  annualPremium: z.number().nonnegative().default(0),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
});

export type CoverageRider = z.infer<typeof CoverageRiderSchema>;

export const PolicySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().min(1),
  profileId: z.string().uuid(),
  policyNumber: z.string().min(1, 'Policy number is required').max(100),
  insurer: z.enum(INSURERS),
  policyName: z.string().min(1, 'Policy name is required').max(200),
  category: z.enum(POLICY_CATEGORIES),
  status: z.enum(POLICY_STATUSES).default('ACTIVE'),
  sumAssured: z.number().nonnegative().default(0),
  premiumAmount: z.number().nonnegative(),
  premiumFrequency: z.enum(PREMIUM_FREQUENCIES).default('ANNUALLY'),
  currency: z.literal('SGD').default('SGD'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
  coverageTerm: z.string().optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
  riders: z.array(CoverageRiderSchema).default([]),
  documentStoragePath: z.string().optional().nullable(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Policy = z.infer<typeof PolicySchema>;

export const CreatePolicyInputSchema = PolicySchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type CreatePolicyInput = z.infer<typeof CreatePolicyInputSchema>;
