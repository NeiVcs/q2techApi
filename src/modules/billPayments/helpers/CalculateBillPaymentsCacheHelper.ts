import { OrderBillPaymentsSegmentTypeEnum } from '@modules/billPayments/enum/OrderBillPaymentsSegmentTypeEnum';
import { CalculateBillPaymentsOutputDTO } from '@modules/billPayments/dto/CalculateBillPaymentsOutputDTO';

export class CalculateBillPaymentsCacheHelper {
  public static async setCache(document: string, value: CalculateBillPaymentsOutputDTO, segment: OrderBillPaymentsSegmentTypeEnum): Promise<void> {
    const key = this.buildKey(document, segment);
  }

  public static async getCache(document: string, segment: OrderBillPaymentsSegmentTypeEnum): Promise<any> {
    const key = this.buildKey(document, segment);
  }

  public static async delCache(document: string, segment: OrderBillPaymentsSegmentTypeEnum): Promise<void> {
    const key = this.buildKey(document, segment);
  }

  private static buildKey(document: string, segment: OrderBillPaymentsSegmentTypeEnum): string {
    return `bills-data-document:${segment}:${document}`;
  }
}
