import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/_supabase/supabase.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(tx?: SupabaseClient) {
    const db = tx || new SupabaseService().db;
    const getAll = await db.schema('carmen_system').from('users').select('*');
    return getAll;
  }

  async findOne(id: string, tx?: SupabaseClient) {
    const db = tx || new SupabaseService().db;
    const getOne = await db
      .schema('carmen_system')
      .from('users')
      .select('*')
      .eq('id', id)
      .range(0, 1);
    return getOne;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
