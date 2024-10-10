import { CreateUserDto } from './dto/create-user.dto';
import { IAsyncService } from 'lib/interfaces/helper/IAsyncService';
import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'lib/entities';

@Injectable()
export class UsersService
  implements IAsyncService<User, CreateUserDto, UpdateUserDto>
{
  async create(createUserDto: CreateUserDto): Promise<string> {
    return new Promise((resolve) => resolve('This action adds a new user'));
  }

  async getAll(): Promise<string> {
    return new Promise((resolve) => resolve('This action returns all users'));
  }

  async get(id: string): Promise<string> {
    return new Promise((resolve) =>
      resolve(`This action returns a #${id} user`),
    );
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    return new Promise((resolve) =>
      resolve(`This action updates a #${id} user`),
    );
  }

  delete(id: string): Promise<string> {
    return new Promise((resolve) =>
      resolve(`This action removes a #${id} user`),
    );
  }
}
