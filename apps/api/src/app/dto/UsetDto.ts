import {
  IsDefined,
  IsEmail,
  IsJWT,
  IsNotEmpty,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Roles } from '../common/enums';

export class UserDto {
  constructor(firstName: string, lastName: string, role: Roles, uuid: string) {
    this.FirstName = firstName;
    this.LastName = lastName;
    this.Role = role;
    this.uuid = uuid;
  }

  @IsNotEmpty()
  FirstName: string;

  @IsNotEmpty()
  "LastName": string;

  @IsEmail()
  Email: string;

  accessToken: string;

  @IsDefined()
  Role: Roles;

  uuid: string;

  @IsNotEmpty()
  @MinLength(8)
  Password: string;
}


export class UserResponseDto {
    constructor(firstName: string, lastName: string, role: Roles, uuid: string) {
      this.FirstName = firstName;
      this.LastName = lastName;
      this.Role = role;
      this.uuid = uuid;
    }
  
    @IsNotEmpty()
    FirstName: string;
  
    @IsNotEmpty()
    LastName: string;
  
    @IsEmail()
    Email: string;
  
    @IsJWT()
    accessToken: string;
  
    @IsDefined()
    Role: Roles;
  
    @IsUUID()
    uuid: string;
  
  }
