import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { GenderEnums } from 'src/app/utils/common-enums';

export class UserCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(GenderEnums)
  readonly gender: GenderEnums;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly phone: string;
}
