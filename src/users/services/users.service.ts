import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async findOne(userId: string): Promise<User> {
    return this.users.findOne({
      where: {
        name: userId
      }
    });
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.users.create(createUserDto);
    return this.users.save(newUser);
  }
}