import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserCreateDto } from '../users/users.dto';

export class FamilyCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty()
  @IsOptional()
  readonly father: UserCreateDto;

  @ApiProperty()
  @IsOptional()
  readonly mother: UserCreateDto;
}
