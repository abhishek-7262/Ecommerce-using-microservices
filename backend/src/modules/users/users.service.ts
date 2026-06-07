import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository/users.repository';

import { UserDocument, User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(data: Partial<User>) {
    return this.userModel.create(data);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async updateRefreshToken(userId: string, hashedRefreshToken: string | null) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        hashedRefreshToken,
      },
      { new: true },
    );
  }
}
