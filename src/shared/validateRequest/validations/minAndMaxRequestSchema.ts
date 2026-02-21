import { z } from 'zod/v4';

export const minAndMaxRequestSchema = z
  .object({
    min: z.number(),
    max: z.number(),
    message: z.string().optional(),
  }).superRefine((value, ctx) => {
    if (value.min > value.max) {
      ctx.addIssue({
        code: 'custom',
        message: value?.message || 'O campo minímo deve ser menor ou igual ao campo máximo.'
      });
    }
  });
