import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}
}
