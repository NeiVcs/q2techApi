import { PaidBillPaymentsTransformer } from '../../../../src/modules/billPayments/transformers/PaidBillPaymentsTransformer';

describe('PaidBillPaymentsTransformer', () => {
  let transformer: PaidBillPaymentsTransformer;

  beforeEach(() => {
    transformer = new PaidBillPaymentsTransformer();
  });

  it('deve mapear corretamente fromApi', () => {
    const request: any = {
      body: {
        entityId: 'fakeString',
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
      user: {}
    });
  });
});
