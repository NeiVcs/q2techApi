import { z } from 'zod/v4';

export const betweenDatesRequestSchema = z
  .object({
    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'O campo data inicio deve estar no formato: YYYY-MM-DD.')
      .optional(),
    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'O campo data fim deve estar no formato: YYYY-MM-DD.')
      .optional()
  })
  .superRefine((value, ctx) => {
    if (value.startDate && value.endDate && value.startDate > value.endDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'O campo data inicio deve ser anterior ou igual ao data fim.'
      });
    }
  });
