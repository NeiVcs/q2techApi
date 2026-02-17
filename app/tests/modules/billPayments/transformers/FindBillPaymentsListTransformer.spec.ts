import { FindBillPaymentsListTransformer } from '../../../../src/modules/billPayments/transformers/FindBillPaymentsListTransformer';

describe('FindBillPaymentsListTransformer', () => {
  let transformer: FindBillPaymentsListTransformer;

  beforeEach(() => {
    transformer = new FindBillPaymentsListTransformer();
  });

  it('deve mapear corretamente fromApi', () => {
    const request: any = {
      query: {
        page: 123,
        pageSize: 123,
        status: 'fakeString',
        entityId: 'fakeString'
      }
    };
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
      page: 123,
      pageSize: 123,
      status: 'fakeString',
      entityId: 'fakeString'
    });
  });
  it('deve mapear corretamente toApi', () => {
    const outputDTO: any = {
      pagination: {},
      items: [{}]
    };
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
      pagination: {},
      items: [{}]
    });
  });
});
