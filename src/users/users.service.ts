import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createUser(email: string, passwordHash: string) {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new ConflictException('user already exists');
    }

    const newUser = this.userRepo.create({ email, passwordHash });
    const createdUser = await this.userRepo.save(newUser);

    return createdUser;
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    return user;
  }

  async findById(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });

    return user;
  }
}
