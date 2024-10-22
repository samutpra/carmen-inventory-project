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
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { TenantUserService } from './tenant-user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Prisma } from '@prisma-carmen-client/system';

@Controller('api/v1/tenant-user')
@ApiTags('tenant user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TenantUserController {
  constructor(private readonly tenantUserService: TenantUserService) {}

  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req: Request) {
    return this.tenantUserService.findOne(req, id);
  }

  @Get()
  async getAll(@Req() req: Request) {
    return this.tenantUserService.findAll(req);
  }

  @Post()
  async create(
    @Body() createTenantUserDto: Prisma.TenantUserCreateInput,
    @Req() req: Request,
  ) {
    return this.tenantUserService.create(req, createTenantUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTenantUserDto: Prisma.TenantUserUpdateInput,
    @Req() req: Request,
  ) {
    return this.tenantUserService.update(req, id, updateTenantUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.tenantUserService.delete(req, id);
  }
}
