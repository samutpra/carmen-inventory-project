import { comparePassword, hashPassword } from 'lib/Utils/password';

import { AuthPayloadDto } from './dto/auth.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  {
    id: 1,
    username: 'test1',
    password: 'password1',
    passwordHash: hashPassword('password1'),
  },
  {
    id: 2,
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
        accessToken: this.jwtService.sign(user),
        refreshToken: this.jwtService.sign(user, { expiresIn: '7d' }),
      };
    }
  }

  async refreshToken({ id, username }: AuthPayloadDto) {
    const payload = {
      id: id,
      username: username,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
