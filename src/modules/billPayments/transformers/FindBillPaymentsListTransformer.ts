import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindBillPaymentsListQueryRequest, FindBillPaymentsListResponse } from '@modules/billPayments/schemas/FindBillPaymentsListSchema';
import { FindBillPaymentsListInputDTO } from '@modules/billPayments/dto/FindBillPaymentsListInputDTO';
import { FindBillPaymentsListOutputDTO } from '@modules/billPayments/dto/FindBillPaymentsListOutputDTO';
import { validateRequest } from '@shared/validateRequest';
import { betweenDatesRequestSchema } from '@shared/validateRequest/between-dates';

@singleton()
export class FindBillPaymentsListTransformer {
  public fromApi(request?: FastifyRequest<{ Querystring: FindBillPaymentsListQueryRequest }>): FindBillPaymentsListInputDTO {
    const { query } = request;

    validateRequest(betweenDatesRequestSchema, query ?? {});

    return {
      page: query.page || 0,
      pageSize: query.pageSize || 50,
      status: query.status,
      segment: query.segment,
      entityId: query.entityId,
      id: query.id,
      startDate: query.startDate,
      endDate: query.endDate
    };
  }

  public toApi(outputDTO: FindBillPaymentsListOutputDTO): FindBillPaymentsListResponse {
    return {
      pagination: outputDTO?.pagination
        ? {
            page: outputDTO?.pagination?.page ?? 0,
            pageSize: outputDTO?.pagination?.pageSize ?? 0,
            total: outputDTO?.pagination?.total ?? 0
          }
        : undefined,
      items: Array.isArray(outputDTO?.items)
        ? outputDTO.items.map((f) => ({
            id: f.id,
            entityId: f.entityId,
            entityAccountId: f.entityAccountId,
            status: f.status,
            segment: f.segment,
            withdrawType: f.withdrawType,
            billPaymentTotalValue: f.billPaymentTotalValue,
            totalFeeValue: f.totalFeeValue,
            totalOrderValue: f.totalOrderValue,
            updatedAt: f.updatedAt,
            createdAt: f.createdAt
          }))
        : []
    };
  }
}
