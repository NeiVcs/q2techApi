import { CalculateBillPaymentsTransformer } from '../../../../src/modules/billPayments/transformers/CalculateBillPaymentsTransformer';

describe('CalculateBillPaymentsTransformer', () => {
  let transformer: CalculateBillPaymentsTransformer;

  beforeEach(() => {
    transformer = new CalculateBillPaymentsTransformer();
  });

  it('deve mapear corretamente fromApi', () => {
    const request: any = {
      body: {
        segment: 'fakeString',
        accountId: 'fakeString',
        barcode: 'fakeString',
        rates: []
      }
    };
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
      segment: 'fakeString',
      accountId: 'fakeString',
      barcode: 'fakeString',
      rates: []
    });
  });
  it('deve mapear corretamente toApi', () => {
    const outputDTO: any = {
      transactionRateValue: 123,
      typeAmountAccepted: 123,
      drawee: {},
      beneficiary: {},
      finalBeneficiary: {},
      details: {},
      financialInstitution: 'fakeString',
      status: 'fakeString'
    };
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
      transactionRateValue: 123,
      typeAmountAccepted: 123,
      drawee: {},
      beneficiary: {},
      finalBeneficiary: {},
      details: {},
      financialInstitution: 'fakeString',
      status: 'fakeString'
    });
  });
});
