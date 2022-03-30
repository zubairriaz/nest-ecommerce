import { Test, TestingModule } from '@nestjs/testing';
import { JWTAuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: JWTAuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JWTAuthenticationService],
    }).compile();

    service = module.get<JWTAuthenticationService>(JWTAuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
