export class CreateCurrencyDto {
  code: string;
  description: string;
  active: boolean;
  constructor(code: string, description: string, active: boolean) {
    this.code = code;
    this.description = description;
    this.active = active;
  }
}
