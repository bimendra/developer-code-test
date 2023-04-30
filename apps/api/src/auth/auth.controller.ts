import {
  Controller,
  Post,
  Body,
  UseGuards,
  Response,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto, @Response() res): Promise<any> {
    const { access_token, refresh_token } = await this.authService.signup(
      signupDto,
    );
    res.cookie('jwt', refresh_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ access_token });
  }

  @Post('/signin')
  async signin(@Body() signinDto: SigninDto, @Response() res): Promise<any> {
    const { access_token, refresh_token } = await this.authService.signin(
      signinDto,
    );
    res.cookie('jwt', refresh_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ access_token });
  }

  @Post('/signout')
  logout(@Body() { user_id: userId }) {
    this.authService.signout(userId);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/refresh-token')
  async refreshToken(
    @Body() { user_id: userId },
    @Req() request: Request,
    @Response() res,
  ): Promise<any> {
    const { access_token, refresh_token } = await this.authService.refreshToken(
      userId,
      request,
    );
    res.cookie('jwt', refresh_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ access_token });
  }
}
