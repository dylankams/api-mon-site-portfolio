import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
      private readonly usersService: UserService,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
  ) {}

  async register(user: User) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const createdUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
      });
      return createdUser;
  }

  async validateUserById(userId: number): Promise<User> {
      return await this.usersService.findById(userId);
    }

  async login(loginDto: LoginDto): Promise<{ access_token: string, success: boolean }> {
      const user = await this.usersService.findOneByEmail(loginDto.email);
      if (user && (await bcrypt.compare(loginDto.password, user.password))) {
        const payload = { sub: user.id, email: user.email};
        return {
          access_token: await this.jwtService.signAsync(payload),
          success: true
        };
      } else {
        return { access_token: null, success: false };
      }
  }
}
