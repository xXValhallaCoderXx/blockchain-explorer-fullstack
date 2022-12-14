import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/local.auth.guard';
import { AuthUserDTO } from './auth.dto';
// import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';

@Controller('auth')
// @UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // This will only be invoked if it passes Local Strategy
    // Req will have a user param injected in
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerUserDto: AuthUserDTO) {
    return this.authService.registerAccount(registerUserDto);
  }
}
