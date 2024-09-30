import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('api/locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post('/v1')
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get('/v1')
  findAll() {
    return this.locationsService.findAll();
  }

  @Get('/v1/:id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }

  @Patch('/v1/:id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete('/v1/:id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }
}
