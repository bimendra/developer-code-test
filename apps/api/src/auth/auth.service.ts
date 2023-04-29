import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(signupDto: SignupDto) {
    try {
      if (
        await this.prisma.user.findUnique({
          where: {
            email: signupDto.email,
          },
        })
      ) {
        throw new HttpException(
          'User by this email already exists.',
          HttpStatus.FORBIDDEN,
        );
      }
      const user = await this.prisma.user.create({
        data: {
          first_name: signupDto.firstName,
          last_name: signupDto.lastName,
          email: signupDto.email,
          password_hash: await hash(signupDto.password, 10),
          avatar: faker.internet.avatar(),
        },
      });
      return user;
    } catch (error) {
      return error;
    }
  }

  signin() {}

  logout() {}

  refreshToken() {}
}
