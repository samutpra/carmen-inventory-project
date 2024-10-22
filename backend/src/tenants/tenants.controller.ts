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
import { TenantsService } from './tenants.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import { Prisma, Tenant } from '@prisma-carmen-client/system';

@Controller('api/v1/tenants')
@ApiTags('tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ResponseSingle<Tenant>> {
    return this.tenantsService.findOne(req, id);
  }

  @Get()
  async findAll(@Req() req: Request): Promise<ResponseList<Tenant>> {
    return this.tenantsService.findAll(req);
  }

  @Post()
  async create(
    @Body() createTenantDto: Prisma.TenantCreateInput,
    @Req() req: Request,
  ) {
    return this.tenantsService.create(req, createTenantDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTenantDto: Prisma.TenantUpdateInput,
    @Req() req: Request,
  ) {
    return this.tenantsService.update(req, id, updateTenantDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.tenantsService.delete(req, id);
  }
}
