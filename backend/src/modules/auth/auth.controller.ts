import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto/register.dto';
import { LoginDto } from './dto/login.dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@Req() req) {
    return this.authService.refreshTokens(req.user.sub, req.user.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req) {
    return this.authService.logout(req.user.sub);
  }
}
