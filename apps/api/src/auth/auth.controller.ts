import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signupDto: SignupDto): Promise<Tokens> {
    return this.authService.signup(signupDto);
  }

  @Post('/signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post('/signout')
  logout(@Body() { user_id: userId }) {
    this.authService.signout(userId);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh-token')
  refreshToken() {
    this.authService.refreshToken();
  }
}
