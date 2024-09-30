import {
  Default_PerPage,
  ResponseId,
  ResponseList,
  ResponseSingle,
} from 'src/interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateInventorytransactionDto } from './dto/create-inventorytransaction.dto';
import { DuplicateException } from 'src/lib';
import { InventoryTransaction } from 'src/entities';
import { Mock_InventoryTransaction } from 'src/mocks';
import { UpdateInventorytransactionDto } from './dto/update-inventorytransaction.dto';
import { ulid } from 'ulid';

@Injectable()
export class InventorytransactionsService {
  async create(
    createInventorytransactionDto: CreateInventorytransactionDto,
  ): Promise<ResponseId<string>> {
    const found = Mock_InventoryTransaction.find(
      (inventorytransaction) =>
        inventorytransaction.code === createInventorytransactionDto.code,
    );
    if (found) {
      throw new DuplicateException('Inventorytransaction already exists');
    }
    const newInventorytransaction: InventoryTransaction = {
      ...createInventorytransactionDto,
      id: ulid(),
      create_On: new Date(),
      update_On: new Date(),
    };
    Mock_InventoryTransaction.push(newInventorytransaction);

    const res: ResponseId<string> = {
      id: newInventorytransaction.id,
    };
    return res;
  }

  async findAll(): Promise<ResponseList<InventoryTransaction>> {
    const inventorytransactions = Mock_InventoryTransaction;
    const res: ResponseList<InventoryTransaction> = {
      data: inventorytransactions,
      pagination: {
        total: inventorytransactions.length,
        page: 1,
        perPage: Default_PerPage,
        pages: Math.ceil(inventorytransactions.length / Default_PerPage),
      },
    };
    return res;
  }

  async findOne(id: string): Promise<ResponseSingle<InventoryTransaction>> {
    const found = Mock_InventoryTransaction.find(
      (inventorytransaction) => inventorytransaction.id === id,
    );
    const res: ResponseSingle<InventoryTransaction> = {
      data: found,
    };
    return res;
  }

  update(
    id: string,
    updateInventorytransactionDto: UpdateInventorytransactionDto,
  ) {
    const index = Mock_InventoryTransaction.findIndex(
      (inventorytransaction) => inventorytransaction.id === id,
    );
    if (index === -1) {
      throw new NotFoundException('Inventorytransaction not found');
    }

    if (index !== -1) {
      Mock_InventoryTransaction[index] = {
        ...Mock_InventoryTransaction[index],
        ...updateInventorytransactionDto,
      };
    }
  }

  remove(id: string) {
    const index = Mock_InventoryTransaction.findIndex(
      (inventorytransaction) => inventorytransaction.id === id,
    );
    if (index === -1) {
      throw new NotFoundException('Inventorytransaction not found');
    }

    if (index === -1) {
      Mock_InventoryTransaction.splice(index, 1);
    }
  }
}
