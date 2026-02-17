import { FindBillPaymentsByIdTransformer } from '../../../../src/modules/billPayments/transformers/FindBillPaymentsByIdTransformer';

describe('FindBillPaymentsByIdTransformer', () => {
  let transformer: FindBillPaymentsByIdTransformer;

  beforeEach(() => {
    transformer = new FindBillPaymentsByIdTransformer();
  });

  it('deve mapear corretamente fromApi', () => {
    const request: any = {
      params: {
        id: 'fakeString'
      },
      query: {
        entityId: 'fakeString'
      }
    };
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
      id: 'fakeString',
      entityId: 'fakeString'
    });
  });
  it('deve mapear corretamente toApi', () => {
    const outputDTO: any = {
      id: 'fakeString',
      entityId: 'fakeString',
      entityAccountId: 'fakeString',
      status: 'fakeString',
      withdrawType: 'fakeString',
      segment: 'fakeString',
      billPaymentInterestsValue: 123,
      billPaymentFineValue: 123,
      billPaymentDiscountValue: 123,
      billPaymentTotalValue: 123,
      billPaymentDueDate: 'fakeString',
      billPaymentBarcode: 'fakeString',
      totalFeeValue: 123,
      totalOrderValue: 123,
      feeChargeUuid: 'fakeString',
      feeTransactionId: 'fakeString',
      feeRefundUuid: 'fakeString',
      histories: [],
      rates: [],
      additionalInformation: {},
      updatedAt: 'fakeString',
      createdAt: 'fakeString'
    };
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
      id: 'fakeString',
      entityId: 'fakeString',
      entityAccountId: 'fakeString',
      status: 'fakeString',
      withdrawType: 'fakeString',
      segment: 'fakeString',
      billPaymentInterestsValue: 123,
      billPaymentFineValue: 123,
      billPaymentDiscountValue: 123,
      billPaymentTotalValue: 123,
      billPaymentDueDate: 'fakeString',
      billPaymentBarcode: 'fakeString',
      totalFeeValue: 123,
      totalOrderValue: 123,
      feeChargeUuid: 'fakeString',
      feeTransactionId: 'fakeString',
      feeRefundUuid: 'fakeString',
      histories: [],
      rates: [],
      additionalInformation: {},
      updatedAt: 'fakeString',
      createdAt: 'fakeString'
    });
  });
});
