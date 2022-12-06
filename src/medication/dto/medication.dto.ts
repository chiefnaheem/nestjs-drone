import {
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  Matches,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class MedicationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'name must be letters, numbers, “-“, “_”',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Matches(/^[0-9]{1,3}$/, { message: 'weight must be a number' })
  weight: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Matches(/^[A-Z0-9_]+$/, {
    message: 'code must be upper case letters, numbers, “_”',
  })
  code: string;

  @IsOptional()
  @IsString()
  image: string;
}

export class UpdateMedicationDto extends PartialType(MedicationDto) {}
