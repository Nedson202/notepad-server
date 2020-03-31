import { CreateUserDTO } from './dto/users.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const createdUser = new this.userModel(createUserDTO);

    return createdUser.save();
  }

  async findOne({ socialID }): Promise<User | undefined> {
    const user = await this.userModel.findOne({ socialID });

    return user;
  }
}
