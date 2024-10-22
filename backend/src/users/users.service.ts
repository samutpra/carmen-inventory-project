import {
  Prisma,
  Tenant,
  User,
  PrismaClient as dbSystem,
} from '@prisma-carmen-client/system';

import { Injectable } from '@nestjs/common';
import { PrismaClientManagerService } from 'src/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class UsersService {
  private db_System: dbSystem;

  constructor(private prismaClientMamager: PrismaClientManagerService) {
    this.db_System = this.prismaClientMamager.getSystemDB();
  }

  async create(createUserDto: Prisma.UserCreateInput): Promise<string> {
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

  update(id: string, updateUserDto: Prisma.UserUpdateInput): Promise<string> {
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
