import { Currency, ExchangeRate } from 'lib/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseList, ResponseSingle } from 'lib/interfaces/helper/iResponse';

import { CreateExchangerateDto } from './dto/create-exchangerate.dto';
import { Default_PerPage } from 'lib/interfaces/helper/perpage.default';
import { DuplicateException } from 'lib/utils';
import { Mock_ExchangeRate } from 'lib/mocks';
import { ResponseId } from 'lib/interfaces/helper/iResponse';
import { UpdateExchangerateDto } from './dto/update-exchangerate.dto';
import { ulid } from 'ulid';

@Injectable()
export class ExchangerateService {
  async create(
    createExchangerateDto: CreateExchangerateDto,
  ): Promise<ResponseId<string>> {
    const found = Mock_ExchangeRate.find(
      (exchangerate) =>
        exchangerate.currencyId === createExchangerateDto.currencyId &&
        exchangerate.atDate === createExchangerateDto.atDate,
    );

    if (found) {
      throw new DuplicateException('Exchangerate already exists');
    }

    const newExchangerate: ExchangeRate = {
      ...createExchangerateDto,
      id: ulid(),
      createdAt: new Date(),
      createdBy: 'USER-01',
      updatedAt: new Date(),
      updatedBy: 'USER-01',
    };
    Mock_ExchangeRate.push(newExchangerate);

    const res: ResponseId<string> = {
      id: newExchangerate.id,
    };

    return res;
  }

  async findAll(): Promise<ResponseList<ExchangeRate>> {
    const exchangerates = Mock_ExchangeRate;
    const res: ResponseList<ExchangeRate> = {
      data: exchangerates,
      pagination: {
        total: exchangerates.length,
        page: 1,
        perPage: Default_PerPage,
        pages: Math.ceil(exchangerates.length / Default_PerPage),
      },
    };
    return res;
  }

  async findOne(id: string): Promise<ResponseSingle<ExchangeRate>> {
    const found = Mock_ExchangeRate.find(
      (exchangerate) => exchangerate.id === id,
    );
    if (!found) {
      throw new NotFoundException('Exchangerate not found');
    }
    const res: ResponseSingle<ExchangeRate> = {
      data: found,
    };
    return res;
  }

  update(id: string, updateExchangerateDto: UpdateExchangerateDto) {
    const index = Mock_ExchangeRate.findIndex(
      (exchangerate) => exchangerate.id === id,
    );
    if (index === -1) {
      throw new NotFoundException('Exchangerate not found');
    }

    if (index !== -1) {
      Mock_ExchangeRate[index] = {
        ...Mock_ExchangeRate[index],
        ...updateExchangerateDto,
      };
    }
  }

  remove(id: string) {
    const index = Mock_ExchangeRate.findIndex(
      (exchangerate) => exchangerate.id === id,
    );
    if (index === -1) {
      throw new NotFoundException('Exchangerate not found');
    }

    if (index !== -1) {
      Mock_ExchangeRate.splice(index, 1);
    }
  }
}
