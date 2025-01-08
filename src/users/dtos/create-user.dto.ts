import { IsString, IsNotEmpty, IsOptional, IsEmail, MaxLength, MinLength, Matches } from "class-validator";
export class CreateUserDto(){
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(96)
    firstname: string;
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(96)
    lastname?: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$)
    password: string;
}