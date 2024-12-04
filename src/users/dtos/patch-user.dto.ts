import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PatchUserDto extends PartialType(CreateUserDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}