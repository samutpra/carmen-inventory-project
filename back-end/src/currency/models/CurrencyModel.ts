export class CurrencyModel {

  private static mock_currencies = [
    { code: 'USD', description: 'United States Dollar', active: true },
    { code: 'EUR', description: 'Euro', active: true },
    { code: 'JPY', description: 'Japanese Yen', active: true },
    { code: 'GBP', description: 'British Pound Sterling', active: true },
  ]

  uuid: string;

  code: string;
  description: string;
  active: boolean;

  tenantId?: string;

  constructor(
    uuid: string,
    code: string,
    description: string,
    active: boolean,
  ) {
    this.uuid = uuid;
    this.code = code;
    this.description = description;
    this.active = active;
  }

  setTenantId(tenantId: string) {
    this.tenantId = tenantId;
  }
}
