import { UpdateBillPaymentsTransformer } from '../../../../src/modules/billPayments/transformers/UpdateBillPaymentsTransformer';

describe('UpdateBillPaymentsTransformer', () => {
  let transformer: UpdateBillPaymentsTransformer;

  beforeEach(() => {
    transformer = new UpdateBillPaymentsTransformer();
  });

  it('deve mapear corretamente fromApi', () => {
    const request: any = {
      body: {
        entityId: 'fakeString',
        status: 'fakeString',
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
      status: 'fakeString',
      user: {}
    });
  });
});
