import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  private toSafeUser(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findByEmail(registerDto.email);

    if (user) {
      throw new ConflictException('user already exists');
    }

    const passwordHash = await argon2.hash(registerDto.password);

    const createdUser = await this.usersService.createUser(registerDto.email, passwordHash);

    return this.toSafeUser(createdUser);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    const isValidPassword = await argon2.verify(user.passwordHash, loginDto.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('invalid credentials');
    }

    return this.toSafeUser(user);
  }
}
