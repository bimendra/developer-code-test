import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(signupDto: SignupDto) {
    const user = await this.prisma.user.create({
      data: {
        first_name: signupDto.firstName,
        last_name: signupDto.lastName,
        email: signupDto.email,
        password_hash: signupDto.password,
      },
    });
  }

  signin() {}

  logout() {}

  refreshToken() {}
}
