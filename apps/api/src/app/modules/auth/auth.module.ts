import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../../entities/User';
import { JWTAuthenticationService } from '../../services/authentication/authentication.service';
import { CognitoService } from '../../services/AWS/Aws.cognito';
import {AuthController} from './auth.controller';
import { AuthService } from './auth.service';
import { CognitoStratergy } from './cognitoStartergy';
import { JwtStratergy } from './jwtStratergy';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[AuthController],
    providers:[AuthService, JWTAuthenticationService, CognitoService, {
        provide:'AuthStratergy',
        useClass: process.env.AUTH_STRATERGY == 'jwt' ? JwtStratergy : CognitoStratergy
    }]

})
export class AuthModule {}
