import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: process.env.JWT_REFRESH_SECRET!,
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }

  validate(req: any, payload: any) {
    return {
      ...payload,
      refreshToken: req.body.refreshToken,
    };
  }
}
