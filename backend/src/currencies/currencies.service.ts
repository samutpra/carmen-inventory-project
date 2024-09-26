import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './entities/currency.entity';
import { v4 as uuidv4 } from 'uuid';
import { Mock_Currency } from 'src/_mocks/mock_currency';
import { IResponseList } from 'src/_types/_IResponseList';
import { K_PerPage } from 'src/_types/_IBaseTable';
import { DuplicateException } from 'src/_lib/exception';

@Injectable()
export class CurrenciesService {
  create(createCurrencyDto: CreateCurrencyDto) {
    const found = Mock_Currency.find(
      (currency) => currency.code === createCurrencyDto.code,
    );
    if (found) {
      throw new DuplicateException('Currency already exists');
    }

    const newCurrency: Currency = {
      ...createCurrencyDto,
      id: uuidv4(),
      create_On: new Date(),
      update_On: new Date(),
    };
    Mock_Currency.push(newCurrency);
  }

  async findAll(): Promise<IResponseList<Currency>> {
    const currencies = Mock_Currency;
    const res: IResponseList<Currency> = {
      data: currencies,
      pagination: {
        total: currencies.length,
        page: 1,
        perPage: K_PerPage,
        pages: Math.ceil(currencies.length / K_PerPage),
      },
    };
    return res;
  }

  async findOne(id: string): Promise<Currency> {
    const currency = Mock_Currency.find((currency) => currency.id === id);
    return currency;
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
