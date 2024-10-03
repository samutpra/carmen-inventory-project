import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreLocationsService } from './storelocations.service';
import { CreateStoreLocationDto } from './dto/create-storelocation.dto';
import { UpdateStoreLocationDto } from './dto/update-storelocation.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { IResponseId } from 'lib/types';

@Controller('api/storelocations')
@ApiTags('storelocations')
export class StoreLocationsController {
  constructor(private readonly storelocationsService: StoreLocationsService) {}

  @Post('/v1')
  @ApiBody({
    description: 'Create a new storelocation',
    type: CreateStoreLocationDto,
    required: true,
  })
  async create(
    @Body() createLocationDto: CreateStoreLocationDto,
  ): Promise<IResponseId<string>> {
    return this.storelocationsService.create(createLocationDto);
  }

  @Get('/v1')
  findAll() {
    return this.storelocationsService.findAll();
  }

  @Get('/v1/:id')
  findOne(@Param('id') id: string) {
    return this.storelocationsService.findOne(id);
  }

  @Patch('/v1/:id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateStoreLocationDto,
  ) {
    return this.storelocationsService.update(id, updateLocationDto);
  }

  @Delete('/v1/:id')
  remove(@Param('id') id: string) {
    return this.storelocationsService.remove(id);
  }
}
