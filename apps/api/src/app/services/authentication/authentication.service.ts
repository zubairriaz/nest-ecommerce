import {  Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTAuthenticationService {
    constructor( private readonly jwtSerice: JwtService,  private readonly configService: ConfigService){

    }

    async generateAccessToken(userUUID:string){
        const accessToken = await this.jwtSerice.signAsync({userId: userUUID});
           return accessToken
    }

    async validateToken(token: string){
        const validated = await this.jwtSerice.verifyAsync(token);
        return validated;
    }

    async generateRefreshToken(userUUID:string){
        const rSecret = this.configService.get('JWT_SECRET_REFRESH_TOKEN');
        const expiresIn = this.configService.get('REFRESH_TOKEN_EXPIRATION');
        const refreshtoken = await this.jwtSerice.signAsync({userId: userUUID}, {secret: rSecret, expiresIn })
        return refreshtoken;
    }
}
