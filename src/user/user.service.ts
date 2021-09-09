import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {
  }

  findOne(name: string): Promise<User | undefined> {
    return this.userRepository.findOne({ name });
  }
}
