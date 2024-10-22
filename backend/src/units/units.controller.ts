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
import { UnitsService } from './units.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Prisma } from '@prisma-carmen-client/tenant';

@Controller('api/v1/units')
@ApiTags('units')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return this.unitsService.findOne(req, id);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return this.unitsService.findAll(req);
  }

  @Post()
  async create(
    @Body() createUnitDto: Prisma.UnitCreateInput,
    @Req() req: Request,
  ) {
    return this.unitsService.create(req, createUnitDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUnitDto: Prisma.UnitUpdateInput,
    @Req() req: Request,
  ) {
    return this.unitsService.update(req, id, updateUnitDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    return this.unitsService.delete(req, id);
  }
}
