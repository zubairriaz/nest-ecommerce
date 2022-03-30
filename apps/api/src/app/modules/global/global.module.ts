import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET_ACCESS_TOKEN'),
          signOptions: {
            expiresIn: configService.get('ACCESS_TOKEN_EXPIRATION'),
          },
        };
      },
    }),
  ],
 
  exports:[ConfigModule, JwtModule]
})
export class GlobalModule {}
