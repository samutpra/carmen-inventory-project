import { comparePassword, hashPassword } from 'lib/utils/password';

import { AuthPayloadDto } from './dto/auth.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  {
    id: '0438ff44-754f-42bd-95b5-53aae20dec3e',
    username: 'test1',
    password: 'password1',
    passwordHash: hashPassword('password1'),
  },
  {
    id: 'c69826b9-1a25-4109-8320-ca72241e58ac',
    username: 'test2',
    password: 'password2',
    passwordHash: hashPassword('password2'),
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const findUser = fakeUsers.find((user) => user.username === username);
    if (!findUser) return null;

    const isMatch = comparePassword(password, await findUser.passwordHash);

    if (isMatch) {
      const { password, passwordHash, ...user } = findUser;
      return {
        ...user,
        access_token: this.jwtService.sign(user),
        refresh_token: this.jwtService.sign(user, { expiresIn: '7d' }),
      };
    }
  }

  async refreshToken({ id, username }: AuthPayloadDto) {
    const payload = {
      id: id,
      username: username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
