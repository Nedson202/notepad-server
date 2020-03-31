import {
  Strategy, StrategyOptionsWithRequest, Profile, VerifyCallback,
} from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable, UnauthorizedException, BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { googleStrategyOptions } from './constants/auth.constant';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(
      googleStrategyOptions as StrategyOptionsWithRequest,
    );
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    if (!profile || !profile.id) {
      done(new BadRequestException(), null);
    }

    const { sub: socialID, name, picture, email } = profile._json;

    const user = await this.authService.validateUser({
      socialID, name, picture, email,
    });

    if (!user) {
      done(new UnauthorizedException(), null);
    }

    done(undefined, user);
  }
}
