import {
  Default_PerPage,
  ResponseId,
  ResponseList,
  ResponseSingle,
} from 'src/interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCurrencyDto } from './dto/create-currency.dto';
import { Currency } from 'src/entities';
import { DuplicateException } from 'src/lib';
import { Mock_Currency } from 'src/mocks';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { ulid } from 'ulid';

@Injectable()
export class CurrenciesService {
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
      create_On: new Date(),
      update_On: new Date(),
    };
    Mock_Currency.push(newCurrency);

    const res: ResponseId<string> = {
      id: newCurrency.id,
    };

    return res;
  }

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

  update(id: string, updateCurrencyDto: UpdateCurrencyDto) {
    const index = Mock_Currency.findIndex((currency) => currency.id === id);
    if (index === -1) {
      throw new NotFoundException('Currency not found');
    }

    if (index !== -1) {
      Mock_Currency[index] = { ...Mock_Currency[index], ...updateCurrencyDto };
    }
  }

  remove(id: string) {
    const index = Mock_Currency.findIndex((currency) => currency.id === id);
    if (index === -1) {
      throw new NotFoundException('Currency not found');
    }

    if (index !== -1) {
      Mock_Currency.splice(index, 1);
    }
  }
}
