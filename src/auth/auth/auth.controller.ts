import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller()
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    return await this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtGuard)
  @Get('user')
  getUser(@Req() req) {
    return { user: req.user };
  }

}
