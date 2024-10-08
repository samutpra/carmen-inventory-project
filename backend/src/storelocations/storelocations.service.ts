import {
  Default_PerPage,
  IResponseId,
  IResponseList,
  IResponseSingle,
  IStoreLocation,
} from 'lib/interfaces';

import { CreateStoreLocationDto } from './dto/create-storelocation.dto';
import { Injectable } from '@nestjs/common';
import { Mock_StoreLocation } from 'lib/mocks';
import { StoreLocation } from 'lib/entities';
import { UpdateStoreLocationDto } from './dto/update-storelocation.dto';

@Injectable()
export class StoreLocationsService {
  async create(
    createLocationDto: CreateStoreLocationDto,
  ): Promise<IResponseId<string>> {
    return { id: '123' };
  }

  async findAll(): Promise<IResponseList<IStoreLocation>> {
    const storeLocations = Mock_StoreLocation;
    const res: IResponseList<IStoreLocation> = {
      data: storeLocations,
      pagination: {
        total: storeLocations.length,
        page: 1,
        perPage: Default_PerPage,
        pages: Math.ceil(storeLocations.length / Default_PerPage),
      },
    };
    return res;
  }

  async findOne(id: string): Promise<IResponseSingle<IStoreLocation>> {
    const storeLocation = Mock_StoreLocation.find(
      (storeLocation) => storeLocation.id === id,
    );
    const res: IResponseSingle<IStoreLocation> = {
      data: storeLocation,
    };
    return res;
  }

  update(id: string, updateLocationDto: UpdateStoreLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: string) {
    return `This action removes a #${id} location`;
  }
}
