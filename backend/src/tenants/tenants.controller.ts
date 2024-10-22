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
import { TenantsService } from './tenants.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import {
  IResponseList,
  ResponseList,
  ResponseSingle,
} from 'lib/helper/iResponse';
import { Prisma, Tenant } from '@prisma-carmen-client/system';

@Controller('api/v1/tenants')
@ApiTags('tenants')
@ApiBearerAuth()
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<ResponseList<Tenant>> {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<ResponseSingle<Tenant>> {
    return this.tenantsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTenantDto: Prisma.TenantCreateInput) {
    return this.tenantsService.create(createTenantDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTenantDto: Prisma.TenantUpdateInput,
  ) {
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(id);
  }
}
