import { Exclude } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
export class CreateUserDto {
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
  @MaxLength(96)
  email: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(96)
  @MinLength(8)
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.',
    },
  )
  password: string;
}
