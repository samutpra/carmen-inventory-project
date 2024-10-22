import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StoreLocationsService } from './storelocations.service';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Prisma } from '@prisma-carmen-client/tenant';

@Controller('api/v1/storelocations')
@ApiTags('storelocations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class StoreLocationsController {
  constructor(private readonly storelocationsService: StoreLocationsService) {}

  @Get(':id')
  async get(@Param('id') id: string, @Req() req: Request) {
    return this.storelocationsService.findOne(req, id);
  }

  @Get()
  async getAll(@Req() req: Request) {
    return this.storelocationsService.findAll(req);
  }

  @Post()
  async create(
    @Body() createLocationDto: Prisma.LocationCreateInput,
    @Req() req: Request,
  ) {
    return this.storelocationsService.create(req, createLocationDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: Prisma.LocationUpdateInput,
    @Req() req: Request,
  ) {
    return this.storelocationsService.update(req, id, updateLocationDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.storelocationsService.delete(req, id);
  }
}
