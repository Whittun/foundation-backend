import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async createAccessToken(user: UserEntity) {
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });

    return accessToken;
  }

  private toSafeUser(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  async me(userId: number) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('user does not exist');
    }

    return this.toSafeUser(user);
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findByEmail(registerDto.email);

    if (user) {
      throw new ConflictException('user already exists');
    }

    const passwordHash = await argon2.hash(registerDto.password);

    const createdUser = await this.usersService.createUser(registerDto.email, passwordHash);

    const accessToken = await this.createAccessToken(createdUser);

    return { user: this.toSafeUser(createdUser), accessToken };
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

    const accessToken = await this.createAccessToken(user);

    return { user: this.toSafeUser(user), accessToken };
  }
}
