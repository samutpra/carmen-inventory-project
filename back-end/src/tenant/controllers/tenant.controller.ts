import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CreateTenantDto } from '../dtos/CreateTenantDto';
import { UpdateTenantDto } from '../dtos/UpdateTenantDto';
import { TenantService } from '../services/TenantService';

@Controller()
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get('/api/tenants')
  async getAll() {
    return await this.tenantService.getAll();
  }

  @Post('/api/tenants')
  createTodo(@Req() req: Request, @Body() data: CreateTenantDto) {
    this.tenantService.create(data);
    return HttpStatus.CREATED;
  }

  @Get('/api/tenants/:id')
  async getTenant(@Req() req: Request, @Param('id') id: string) {
    return await this.tenantService.get(id);
  }

  @Put('/api/tenants/:id')
  updateTenant(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() data: UpdateTenantDto,
  ) {
    this.tenantService.update(id, data);
    return HttpStatus.NO_CONTENT;
  }

  @Delete('/api/tenants/:id')
  deleteTodo(@Req() req: Request, @Param('id') id: string) {
    this.tenantService.delete(id);
    return HttpStatus.ACCEPTED;
  }
}
