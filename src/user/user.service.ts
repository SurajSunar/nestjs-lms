import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    const user = await this.getUserByEmail(userRegisterDto.email);

    console.log('user=', user);

    if (user) {
      throw new UnprocessableEntityException('Email already registered');
    }

    return await this.usersRepository.save(userRegisterDto);
  }

  async getUserByEmail(email: string) {
    // Find user by email
    const user = await this.usersRepository.findOneBy({ email });

    return user;
  }

  async getUserBy(fullName: string) {
    // Find user by fullName
    const user = await this.usersRepository.findOneBy({ fullName });

    return user;
  }

  validateName(fullName: string) {
    //adding validation for name with length 20 and more
    return fullName.length > 20;
  }

  validateEmailDomain(email: string) {
    //validate with email as gmail
    return email.length && ['@gmail', 'hotmail'].includes(email);
  }

  async getUserByUserName(userName: string) {
    // Find user by username
    const user = await this.usersRepository.findOneBy({ fullName: userName });
    return user;
  }
}
