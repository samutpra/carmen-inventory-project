import {} from '@nestjs/common';

export class User {
  username: string;
  email: string;
  create_on: Date;
  update_on: Date | null;
}
