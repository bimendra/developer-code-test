import { Injectable, UnauthorizedException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto';
import { JwtService } from '@nestjs/jwt/dist';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  private async generateTokens(email: string, userId: string): Promise<Tokens> {
    return {
      access_token: await this.jwtService.signAsync(
        {
          email: email,
          sub: userId,
        },
        {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: 60 * 15,
        },
      ),
      refresh_token: await this.jwtService.signAsync(
        {
          email: email,
          sub: userId,
        },
        {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: 60 * 15 * 24,
        },
      ),
    };
  }

  private async saveRefreshToken(userId: string, refreshToken: string) {
    const refreshTokenHash = await hash(refreshToken, 10);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token_hash: refreshTokenHash,
      },
    });
  }

  async signup(signupDto: SignupDto) {
    try {
      if (
        await this.prisma.user.findUnique({
          where: {
            email: signupDto.email,
          },
        })
      ) {
        throw new UnauthorizedException();
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
      const tokens = await this.generateTokens(user.email, user.id);
      this.saveRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      return error;
    }
  }

  signin() {}

  logout() {}

  refreshToken() {}
}
