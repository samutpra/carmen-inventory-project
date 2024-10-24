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
import { UserTenantService } from './user-tenant.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Prisma } from '@prisma-carmen-client/system';

@Controller('api/v1/user-tenant')
@ApiTags('user tenant')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserTenantController {
  constructor(private readonly userTenantService: UserTenantService) {}

  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req: Request) {
    return this.userTenantService.findOne(req, id);
  }

  @Get()
  async getAll(@Req() req: Request) {
    return this.userTenantService.findAll(req);
  }

  @Post()
  async create(
    @Body() createUserTenantDto: Prisma.UserTenantCreateInput,
    @Req() req: Request,
  ) {
    return this.userTenantService.create(req, createUserTenantDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserTenantDto: Prisma.UserTenantUpdateInput,
    @Req() req: Request,
  ) {
    return this.userTenantService.update(req, id, updateUserTenantDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.userTenantService.delete(req, id);
  }
}
