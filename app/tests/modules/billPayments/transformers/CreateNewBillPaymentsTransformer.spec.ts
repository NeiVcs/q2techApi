import { CreateNewBillPaymentsTransformer } from '../../../../src/modules/billPayments/transformers/CreateNewBillPaymentsTransformer';

describe('CreateNewBillPaymentsTransformer', () => {
  let transformer: CreateNewBillPaymentsTransformer;

  beforeEach(() => {
    transformer = new CreateNewBillPaymentsTransformer();
  });

  it('deve mapear corretamente fromApi', () => {
    const request: any = {
      body: {
        segment: 'fakeString',
        entityId: 'fakeString',
        entityAccountId: 'fakeString',
        accountId: 'fakeString',
        accountBranch: 123,
        accountNumber: 123,
        source: 'fakeString',
        reason: 'fakeString',
        user: {
          userId: 'fakeString',
          userName: 'fakeString'
        },
        needAuthorization: true,
        barcode: 'fakeString'
      },
      headers: {
        'x-idempotency-key': 'fakeString'
      }
    };
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
      xIdempotencyKey: 'fakeString',
      segment: 'fakeString',
      entityId: 'fakeString',
      entityAccountId: 'fakeString',
      accountId: 'fakeString',
      accountBranch: 123,
      accountNumber: 123,
      source: 'fakeString',
      reason: 'fakeString',
      user: {
        userId: 'fakeString',
        userName: 'fakeString'
      },
      needAuthorization: true,
      barcode: 'fakeString'
    });
  });
  it('deve mapear corretamente toApi', () => {
    const outputDTO: any = {
      id: 'fakeString',
      createdAt: 'fakeString'
    };
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
      id: 'fakeString',
      createdAt: 'fakeString'
    });
  });
});
