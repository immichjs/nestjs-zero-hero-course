import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async signUp({ username, password }: AuthCredentialsDto): Promise<void> {
    const user = await this.userRepository.create({ username, password });

    await this.userRepository.save(user);
  }
}
