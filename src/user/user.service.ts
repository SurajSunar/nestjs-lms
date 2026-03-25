import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRegisterDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(userRegisterDto: UserRegisterDto) {
    return await this.usersRepository.save(userRegisterDto);
  }

  async getUserByEmail(email: string) {
    // Find user by email
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
