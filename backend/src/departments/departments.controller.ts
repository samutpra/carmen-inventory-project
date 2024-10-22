import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department, Prisma } from '@prisma-carmen-client/tenant';
import { ResponseId, ResponseSingle } from 'lib/helper/iResponse';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/departments')
@ApiTags('department')
@UseGuards(JwtAuthGuard)
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get(':id')
  async fineOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ResponseSingle<Department>> {
    return this.departmentsService.findOne(req, id);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return this.departmentsService.findAll(req);
  }

  @Post()
  async create(
    @Body() createDepartmentDto: Prisma.DepartmentCreateInput,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.departmentsService.create(req, createDepartmentDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: Prisma.DepartmentUpdateInput,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.departmentsService.update(req, id, updateDepartmentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.departmentsService.delete(req, id);
  }
}
