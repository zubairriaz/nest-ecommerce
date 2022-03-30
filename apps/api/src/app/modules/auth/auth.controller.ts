import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "../../dto/auth";
import { UserDto } from "../../dto/UsetDto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{

    constructor(private readonly authService: AuthService){

    }
   
    @Post('register')
    registerUser(@Body() userDto: UserDto){
        return this.authService.registerUser(userDto);
    }

    @Post('login')
    loginUser(@Body() dto:LoginDto){
        return this.authService.loginUser(dto);
    }
}