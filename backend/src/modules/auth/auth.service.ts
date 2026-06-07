import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto/register.dto';
import { LoginDto } from './dto/login.dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      email: dto.email,
      password: hash,
    });

    return this.generateTokens(user._id.toString(), user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user._id.toString(), user.email);
  }

  async generateTokens(userId: string, email: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );

    await this.updateRefreshToken(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);

    await this.usersService.updateRefreshToken(userId, hash);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    if (!user.hashedRefreshToken) {
      throw new ForbiddenException('Refresh token missing');
    }

    const tokenMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!tokenMatches) {
      throw new ForbiddenException('Invalid refresh token');
    }

    return this.generateTokens(user._id.toString(), user.email);
  }

  async logout(userId: string) {
    await this.usersService.updateRefreshToken(userId, null);

    return {
      message: 'Logged out successfully',
    };
  }
}
