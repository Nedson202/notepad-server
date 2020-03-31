import { JWTAuthGuard } from './jwt.guard';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google.guard';
import { Controller, Request, UseGuards, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(GoogleAuthGuard)
  @Get('/login')
  // tslint:disable-next-line:no-empty
  async login() {
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/redirect')
  async authRedirect(@Request() req) {
    const accessToken = await this.authService.login(req.user);

    return {
      status: 200,
      message: 'Login successful',
      token: accessToken,
      data: req.user,
    };
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
