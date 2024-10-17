import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Prisma } from '@prisma-carmen-client/tenant';

@Controller('api/v1/departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(@Body() createDepartmentDto: Prisma.DepartmentCreateInput) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll(@Param('tenant') tenantId: string) {
    return this.departmentsService.findAll(tenantId);
  }

  @Get(':id')
  fineOne(@Param('id') id: string) {
    return this.departmentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: Prisma.DepartmentUpdateInput,
  ) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.departmentsService.delete(id);
  }
}
