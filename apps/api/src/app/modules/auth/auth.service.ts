import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto, UserResponseDto } from '../../dto/UsetDto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { JWTAuthenticationService } from '../../services/authentication/authentication.service';
import { LoginDto } from '../../dto/auth';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JWTAuthenticationService
  ) {}

  async registerUser(user: UserDto) {
    const dbUser = await this.userRepo.findOneBy({ Email: user.Email });
    if (dbUser)
      throw new HttpException(
        'Email already exists in our system',
        HttpStatus.BAD_REQUEST
      );
    user.uuid = uuidv4();
    user.Password = await this.encryptPassword(user.Password);
    return this.userRepo.save(user);
  }

  async loginUser(dto: LoginDto): Promise<UserResponseDto> {
    const { Email, Password } = dto;
    
    const user = await this.userRepo.findOneBy({ Email: Email });
    console.log(user);
    if (!user)
      throw new HttpException(
        'No account information was found against this email',
        HttpStatus.BAD_REQUEST
      );
    
      const isPasswordCorrect = this.comparePasswords(Password, user.Password);
    if (!isPasswordCorrect)
      throw new HttpException(
        'The password provided is not valid',
        HttpStatus.BAD_REQUEST
      );
    const token = await this.jwtService.generateAccessToken(user.uuid);
    
    const userDto = new UserResponseDto(
      user.FirstName,
      user.LastName,
      user.Role,
      user.uuid
    );
    userDto.accessToken = token;
    return userDto;
  }

  async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  comparePasswords(password: string, hasedPassword: string) {
    const isMatched = bcrypt.compareSync(password, hasedPassword);
    return isMatched;
  }
}
