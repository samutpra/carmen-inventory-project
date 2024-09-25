import {} from '@nestjs/common';

export class User {
  username: string;
  email: string;
  created_on: Date;
  updated_on: Date | null;
}
