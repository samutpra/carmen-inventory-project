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
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Prisma } from '@prisma-carmen-client/system';

@Controller('api/v1/users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req: Request) {
    return this.usersService.findOne(req, id);
  }

  @Get()
  async getAll(@Req() req: Request) {
    return this.usersService.findAll(req);
  }

  @Post()
  async create(
    @Body() createUserDto: Prisma.UserCreateInput,
    @Req() req: Request,
  ) {
    return this.usersService.create(req, createUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
    @Req() req: Request,
  ) {
    return this.usersService.update(req, id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.usersService.delete(req, id);
  }
}
