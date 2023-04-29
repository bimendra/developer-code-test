import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    this.authService.signup(signupDto);
  }

  @Post('/signin')
  signin() {
    this.authService.signin();
  }

  @Post('/logout')
  logout() {
    this.authService.logout();
  }

  @Post('/refresh-token')
  refreshToken() {
    this.authService.refreshToken();
  }
}
