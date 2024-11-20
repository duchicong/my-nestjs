import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(96)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(96)
  lastName?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$%*#?&])[A-Za-z\d@$!%&#?&]{6,}$/, {
    message:
      'Minimum six characters, at least one letter, one number and one special character',
  })
  password: string;
}
