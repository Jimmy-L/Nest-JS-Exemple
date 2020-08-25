import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { LoggerService } from '../logger/logger.service';
import { environment } from 'src/environments/environement';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy) {
    constructor(
        // private issuer: string, private audience: string, 
        private loggerService: LoggerService
    ) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${environment.jwt.issuer}.well-known/jwks.json`
            }),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: environment.jwt.audience,
            issuer: `${environment.jwt.issuer}`,
            algorithms: ['RS256']
        });
    }

    /**
     * Validate the payload. It will get the user or the application identity and the put it in the request to be use with passport js.
     *
     * @param payload
     */
    async validate(payload: any) {
        try {
            return payload;
        } catch (e) {
            this.loggerService.error(e.message, 'JwtStrategy Validate');
            throw new ForbiddenException();
        }
    }
}