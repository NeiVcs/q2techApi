import { z } from 'zod/v4';

export const paginationRequestSchema = z
  .object({
    page: z.number().optional(),
    pageSize: z.number().optional(),
  }).superRefine((value, ctx) => {
    if ((value.page && !value.pageSize) || (!value.page && value.pageSize)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Os campos page e pageSize sâo opcionais porêm interdependentes.'
      });
    }
  });
