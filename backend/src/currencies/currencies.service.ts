import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ResponseId,
  ResponseList,
  ResponseSingle,
} from 'lib/interfaces/helper/iResponse';

import { CreateCurrencyDto } from './dto/create-currency.dto';
import { Currency } from 'lib/entities';
import { Default_PerPage } from 'lib/interfaces/helper/perpage.default';
import { DuplicateException } from 'lib/utils/exceptions';
import { Mock_Currency } from 'lib/mocks';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { ulid } from 'ulid';

@Injectable()
export class CurrenciesService {
  //#region CREATE
  async create(
    createCurrencyDto: CreateCurrencyDto,
  ): Promise<ResponseId<string>> {
    const found = Mock_Currency.find(
      (currency) => currency.code === createCurrencyDto.code,
    );
    if (found) {
      throw new DuplicateException('Currency already exists');
    }

    const newCurrency: Currency = {
      ...createCurrencyDto,
      id: ulid(),
      createdAt: new Date(),
      createdBy: 'USER-01',
      updatedAt: new Date(),
      updatedBy: 'USER-01',
    };
    Mock_Currency.push(newCurrency);

    const res: ResponseId<string> = {
      id: newCurrency.id,
    };

    return res;
  }
  //#endregion CREATE

  //#region GET ALL
  async findAll(): Promise<ResponseList<Currency>> {
    const currencies = Mock_Currency;
    const res: ResponseList<Currency> = {
      data: currencies,
      pagination: {
        total: currencies.length,
        page: 1,
        perPage: Default_PerPage,
        pages: Math.ceil(currencies.length / Default_PerPage),
      },
    };
    return res;
  }
  //#endregion GET ALL

  //#region GET ONE
  async findOne(id: string): Promise<ResponseSingle<Currency>> {
    const currency = Mock_Currency.find((currency) => currency.id === id);
    if (!currency) {
      throw new NotFoundException('Currency not found');
    }
    const res: ResponseSingle<Currency> = {
      data: currency,
    };
    return res;
  }
  //#endregion GET ONE

  //#region UPDATE
  async update(
    id: string,
    updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<ResponseId<string>> {
    const index = Mock_Currency.findIndex((currency) => currency.id === id);
    if (index === -1) {
      throw new NotFoundException('Currency not found');
    }

    if (index !== -1) {
      Mock_Currency[index] = { ...Mock_Currency[index], ...updateCurrencyDto };
    }

    const res: ResponseId<string> = {
      id: Mock_Currency[index].id,
    };

    return res;
  }
  //#endregion UPDATE

  //#region DELETE
  remove(id: string) {
    const index = Mock_Currency.findIndex((currency) => currency.id === id);
    if (index === -1) {
      throw new NotFoundException('Currency not found');
    }

    if (index !== -1) {
      Mock_Currency.splice(index, 1);
    }
  }
  //#endregion DELETE
}
