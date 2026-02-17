import { FeePayBillPaymentsTransformer } from '../../../../src/modules/billPayments/transformers/FeePayBillPaymentsTransformer';

describe('FeePayBillPaymentsTransformer', () => {
  let transformer: FeePayBillPaymentsTransformer;

  beforeEach(() => {
    transformer = new FeePayBillPaymentsTransformer();
  });

  it('deve mapear corretamente fromApi', () => {
    const request: any = {
      body: {
        entityId: 'fakeString',
        feeTransactionId: 'fakeString',
        user: {}
      },
      params: {
        id: 'fakeString'
      }
    };
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
      id: 'fakeString',
      entityId: 'fakeString',
      feeTransactionId: 'fakeString',
      user: {}
    });
  });
});
