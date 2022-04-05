import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verifierFactory } from '@southlane/cognito-jwt-verifier';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';

@Injectable()
export class CognitoService {
  private USERPOOL_ID;
  private APP_ID;
  private AWS_REGION;
  constructor(
    @InjectAwsService(CognitoIdentityServiceProvider)
    private readonly cognitoServie: CognitoIdentityServiceProvider,
    private readonly configService: ConfigService
  ) {
    this.USERPOOL_ID = configService.get('COGNITO_POOL_ID');
    this.APP_ID = configService.get('COGNITO_APP_ID');
    this.AWS_REGION = configService.get('AWS_DEAFAULT_REGION');
  }

  async verifyToken(token: string) {
    const verifier = verifierFactory({
      region: this.AWS_REGION,
      userPoolId: this.USERPOOL_ID,
      appClientId: this.APP_ID,
      tokenType: 'access', // either "access" or "id"
    });
    try {
      const tokenPayload = await verifier.verify(token);
      console.log(tokenPayload);
    } catch (e) {
      console.log(e);
      // catch error and act accordingly, e.g. throw HTTP 401 error
    }
  }

  getUserInformation(token: string) {
    return new Promise((res, rej) => {
      this.cognitoServie.getUser({ AccessToken: token }, function (err, data) {
        if (err) rej(err);
        if (data) res(data);
      });
    });
  }
}
