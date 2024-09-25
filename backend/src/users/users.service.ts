import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
