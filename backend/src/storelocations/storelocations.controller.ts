import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StoreLocationsService } from './storelocations.service';
import { CreateStoreLocationDto } from './dto/create-storelocation.dto';
import { UpdateStoreLocationDto } from './dto/update-storelocation.dto';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  IResponseId,
  IResponseList,
  IResponseSingle,
  IStoreLocation,
} from 'lib/interfaces';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { StoreLocation } from 'lib/entities';
import { I } from '@faker-js/faker/dist/airline-C5Qwd7_q';

@Controller('api/v1/storelocations')
@ApiTags('storelocations')
@ApiBearerAuth()
export class StoreLocationsController {
  constructor(private readonly storelocationsService: StoreLocationsService) {}

  @Post()
  @ApiBody({
    description: 'Create a new storelocation',
    type: CreateStoreLocationDto,
    required: true,
  })
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createLocationDto: CreateStoreLocationDto,
  ): Promise<IResponseId<string>> {
    return this.storelocationsService.create(createLocationDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<IResponseList<IStoreLocation>> {
    return await this.storelocationsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id') id: string,
  ): Promise<IResponseSingle<IStoreLocation>> {
    return await this.storelocationsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateStoreLocationDto,
  ) {
    return this.storelocationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.storelocationsService.remove(id);
  }
}
