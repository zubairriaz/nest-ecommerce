import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { CognitoService } from '../../services/AWS/Aws.cognito';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { Repository } from 'typeorm';
import { UserDto } from '../../dto/UsetDto';
import { Roles } from '../../common/enums';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class CognitoStratergy extends PassportStrategy(Strategy) {
  private readonly token;
  constructor(
    private readonly cognitoServie: CognitoService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get(
          'COGNITO_AUTHORITY'
        )}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get(''),
      issuer: configService.get('COGNITO_AUTHORITY'),
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload) {
    if (req.headers && req.headers['authorization']) {
      const token = req.headers['authorization'].split('Bearer ')[1];
      try {
        const userInformation = await this.cognitoServie.getUserInformation(
          token
        );
        const userAttributes = userInformation['UserAttributes'];
        const user = {};
        userAttributes.map((attr) => {
          user[attr['Name']] = attr['Value'];
        });
        const dbUser = await this.userRepo.findOneBy({ Email: user['email'] });

        if (dbUser) return true;
        const nameArray = user['name'].split(' ');
        const dto = new UserDto();
        dto.Email = user['email'];
        dto.FirstName = nameArray[0];
        dto.LastName = nameArray[1];
        dto.Role = Roles.Member;
        dto.uuid = uuid4();
        dto.Password = undefined;
        await this.userRepo.save(dto);
        return true;
      } catch (err) {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
    return false;
  }
}
