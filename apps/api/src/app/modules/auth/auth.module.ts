import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../../entities/User';
import { JWTAuthenticationService } from '../../services/authentication/authentication.service';
import {AuthController} from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStratergy } from './jwtStratergy';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[AuthController],
    providers:[AuthService, JWTAuthenticationService, AuthStratergy]

})
export class AuthModule {}
