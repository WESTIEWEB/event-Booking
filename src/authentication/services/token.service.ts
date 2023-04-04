import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Algorithm } from 'jsonwebtoken';
import { AppLogger, InjectLogger } from 'src/logging';
import { ITokenIssuePayload, ITokenPayload, ITokenService } from '../interfaces';

@Injectable()
export class TokenService implements ITokenService {
  protected static ALGORITHM: Algorithm = 'HS512';

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectLogger(TokenService.name)
    private readonly logger: AppLogger,
  ) {}

  issueToken(payload: ITokenIssuePayload) {
    const secretKey = this.configService.getOrThrow<string>('authentication.secret_key');
    const ttl = this.configService.getOrThrow<string>('authentication.jwt.ttl');
    const { subject } = payload;
    const tokenPayload = {
      sub: subject,
    };

    return this.jwtService.sign(tokenPayload, {
      secret: secretKey,
      expiresIn: ttl,
      algorithm: TokenService.ALGORITHM,
    });
  }

  verifyToken(token: string) {
    const secretKey = this.configService.getOrThrow<string>('authentication.secret_key');

    try {
      this.jwtService.verify(token, {
        secret: secretKey,
        algorithms: [TokenService.ALGORITHM],
      });
    } catch (error) {
      this.logger.error({ err: error }, 'Failed to verify token');
      throw new ForbiddenException(error.message);
    }
  }

  parseToken(token: string) {
    const secretKey = this.configService.getOrThrow<string>('authentication.secret_key');

    try {
      const payload = this.jwtService.verify(token, {
        secret: secretKey,
        algorithms: [TokenService.ALGORITHM],
      });

      return payload as ITokenPayload;
    } catch (error) {
      return null;
    }
  }
}
