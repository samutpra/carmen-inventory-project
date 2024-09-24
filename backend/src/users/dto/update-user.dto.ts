import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: string;
  username?: string;
  email?: string;

  constructor(id: string, username?: string, email?: string) {
    super();
    this.id = id;
    this.username = username;
    this.email = email;
  }
}
