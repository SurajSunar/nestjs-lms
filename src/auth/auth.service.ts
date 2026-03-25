import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto';
import { UserService } from 'src/user/user.service';
import { UserRegisterDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  register(userRegisterDto: UserRegisterDto) {
    return this.userService.register(userRegisterDto);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.getUserByEmail(email);

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate token payload (in production, use JWT)
    const token = Buffer.from(
      JSON.stringify({ id: user.id, email: user.email }),
    ).toString('base64');

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.fullName,
      },
    };
  }
}
