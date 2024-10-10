import {
  IResponseList,
  IResponseSingle,
} from 'lib/interfaces/helper/iResponse';

import { CreateStoreLocationDto } from './dto/create-storelocation.dto';
import { Default_PerPage } from 'lib/interfaces/helper/perpage.default';
import { IAsyncService } from 'lib/interfaces/helper/IAsyncService';
import { IStoreLocation } from 'lib/interfaces';
import { Injectable } from '@nestjs/common';
import { Mock_StoreLocation } from 'lib/mocks';
import { StoreLocation } from 'lib/entities';
import { UpdateStoreLocationDto } from './dto/update-storelocation.dto';

@Injectable()
export class StoreLocationsService
  implements
    IAsyncService<
      StoreLocation,
      CreateStoreLocationDto,
      UpdateStoreLocationDto
    >
{
  async create(
    createStoreLocationDto: CreateStoreLocationDto,
  ): Promise<IResponseSingle<StoreLocation>> {
    return new Promise((resolve) =>
      resolve({
        data: {
          ...createStoreLocationDto,
          id: '1', // Mock ID
          created_On: new Date(),
          created_By: '1',
          updated_On: new Date(),
          updated_By: '1',
        },
      }),
    );
  }

  async getAll(): Promise<IResponseList<IStoreLocation>> {
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
    return new Promise((resolve) => resolve(res));
  }

  async get(id: string): Promise<IResponseSingle<IStoreLocation>> {
    const storeLocation = Mock_StoreLocation.find(
      (storeLocation) => storeLocation.id === id,
    );
    const res: IResponseSingle<IStoreLocation> = {
      data: storeLocation,
    };
    return new Promise((resolve) => resolve(res));
  }

  async update(
    id: string,
    updateLocationDto: UpdateStoreLocationDto,
  ): Promise<IResponseSingle<IStoreLocation>> {
    const storeLocation = Mock_StoreLocation.find(
      (storeLocation) => storeLocation.id === id,
    );
    const res: IResponseSingle<IStoreLocation> = {
      data: { ...updateLocationDto, ...storeLocation },
    };
    return new Promise((resolve) => resolve(res));
  }

  async delete(id: string): Promise<IResponseSingle<StoreLocation>> {
    const storeLocation = Mock_StoreLocation.find(
      (storeLocation) => storeLocation.id === id,
    );
    const res: IResponseSingle<StoreLocation> = {
      data: storeLocation,
    };

    Mock_StoreLocation.splice(Mock_StoreLocation.indexOf(storeLocation), 1); // Mock Delete

    return new Promise((resolve) => resolve(res));
  }
}
