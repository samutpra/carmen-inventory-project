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
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Prisma } from '@prisma-carmen-client/tenant';

@Controller('api/v1/storelocations')
@ApiTags('storelocations')
@ApiBearerAuth()
export class StoreLocationsController {
  constructor(private readonly storelocationsService: StoreLocationsService) {}

  @Post()
  @ApiBody({
    description: 'Create a new storelocation',
    // type: CreateStoreLocationDto,
    required: true,
  })
  @UseGuards(JwtAuthGuard)
  create(@Body() createLocationDto: Prisma.LocationCreateInput) {
    return this.storelocationsService.create(createLocationDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.storelocationsService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  get(@Param('id') id: string) {
    return this.storelocationsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: Prisma.LocationUpdateInput,
  ) {
    return this.storelocationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.storelocationsService.delete(id);
  }
}
