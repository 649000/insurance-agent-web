import { z } from 'zod';

export const PROFILE_RELATIONSHIPS = [
  'SELF',
  'CHILD',
  'SPOUSE',
  'PARENT',
  'DEPENDENT',
] as const;

export type ProfileRelationship = (typeof PROFILE_RELATIONSHIPS)[number];

export const ProfileSchema = z.object({
  id: z.string().uuid(),
  // Firebase Auth UID of the account owner
  userId: z.string().min(1),
  // null if profile represents the primary user (SELF), or points to primary user id for dependents
  parentId: z.string().nullable().default(null),
  relationship: z.enum(PROFILE_RELATIONSHIPS).default('SELF'),
  fullName: z.string().min(1, 'Full name is required').max(100),
  preferredName: z.string().max(50).optional().nullable(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format')
    .optional()
    .nullable(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional().nullable(),
  smokingStatus: z.boolean().default(false),
  avatarUrl: z.string().url().optional().nullable(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const CreateChildProfileSchema = ProfileSchema.omit({
  id: true,
  userId: true,
  parentId: true,
  relationship: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  relationship: z.literal('CHILD').default('CHILD'),
});

export type CreateChildProfileInput = z.infer<typeof CreateChildProfileSchema>;
