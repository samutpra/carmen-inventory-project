import { CreateStoreLocationDto } from './dto/create-storelocation.dto';
import { IResponseId } from 'lib/types';
import { Injectable } from '@nestjs/common';
import { UpdateStoreLocationDto } from './dto/update-storelocation.dto';

@Injectable()
export class StoreLocationsService {
  async create(
    createLocationDto: CreateStoreLocationDto,
  ): Promise<IResponseId<string>> {
    return { id: '123' };
  }

  findAll() {
    return `This action returns all locations`;
  }

  findOne(id: string) {
    return `This action returns a #${id} location`;
  }

  update(id: string, updateLocationDto: UpdateStoreLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: string) {
    return `This action removes a #${id} location`;
  }
}
