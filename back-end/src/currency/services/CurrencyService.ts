import { randomUUID } from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from '../../app.interface';
import { CurrencyModel } from '../models/CurrencyModel';
import { CreateCurrencyDto } from '../dtos/CreateCurrencyDto';
import { UpdateCurrencyDto } from '../dtos/UpdateCurrencyDto';

@Injectable()
export class CurrencyService
  implements IService<CurrencyModel, CreateCurrencyDto, UpdateCurrencyDto>
{
  private readonly currencies: CurrencyModel[] = []; // temp local databse to store all our currency items

  create(data: CreateCurrencyDto, tenantId?: string): string {
    const uuid = randomUUID();
    const newCurrency = new CurrencyModel(
      uuid,
      data.code,
      data.description,
      data.active,
    );
    if (tenantId) newCurrency.setTenantId(tenantId);
    this.currencies.push(newCurrency);

    return uuid;
  }

  delete(uuid: string, tenantId?: string): string {
    const index = this.currencies.findIndex(
      (currency) => currency.uuid === uuid,
    );
    if (index === -1) throw new NotFoundException('Currency not found');
    if (tenantId && this.currencies[index].tenantId !== tenantId)
      throw new NotFoundException('Currency not found');
    this.currencies.splice(index, 1);

    return uuid;
  }

  get(uuid: string, tenantId?: string): CurrencyModel {
    const currency = this.currencies.find((currency) => currency.uuid === uuid);
    if (!currency) throw new NotFoundException('Currency not found');
    if (tenantId && currency.tenantId !== tenantId)
      throw new NotFoundException('Currency not found');
    return currency;
  }

  update(
    uuid: string,
    data: UpdateCurrencyDto,
    tenantId?: string,
  ): CurrencyModel {
    const currency = this.currencies.find((currency) => currency.uuid === uuid);
    if (!currency) throw new NotFoundException('Currency not found');
    if (tenantId && currency.tenantId !== tenantId)
      throw new NotFoundException('Currency not found');
    currency.code = data.code;
    currency.description = data.description;
    currency.active = data.active;
    return currency;
  }

  getAll(tenantId?: string): CurrencyModel[] {
    if (tenantId)
      return this.currencies.filter(
        (currency) => currency.tenantId === tenantId,
      );
    return this.currencies.filter((currency) => !currency.tenantId);
  }
}
