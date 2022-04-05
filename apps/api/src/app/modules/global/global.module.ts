import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AwsSdkModule } from 'nest-aws-sdk';
import { SharedIniFileCredentials, S3, CognitoIdentityServiceProvider  } from 'aws-sdk';



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
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        region: 'us-east-1',
        credentials: new SharedIniFileCredentials({
          profile: 'default',
        }),
      },
      services: [S3, CognitoIdentityServiceProvider],
    }),
  ],

  exports: [ConfigModule, JwtModule, AwsSdkModule],
})
export class GlobalModule {}
