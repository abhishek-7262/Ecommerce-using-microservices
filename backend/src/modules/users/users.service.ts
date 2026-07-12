import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository/users.repository';

import { UserDocument, User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventBusService } from '@Abhishek/event-bus';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly eventBus: EventBusService,
  ) {}

  async create(data: Partial<User>) {
    const user = await this.userModel.create(data);

    await this.eventBus.publish('user.created', {
      id: user._id.toString(),
      email: user.email,
      username: user.name,
    });

    console.log('Published user.created');

    return user;
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
