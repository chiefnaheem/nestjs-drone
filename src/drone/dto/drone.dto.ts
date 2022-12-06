import {
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  Matches,
  IsOptional
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { DroneModelEnum, DroneStateEnum } from '../enum/drone.enum';

export class RegisterDroneDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  serialNumber: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(Lightweight|Middleweight|Cruiserweight|Heavyweight)$/)
  model: DroneModelEnum;

  @IsNotEmpty()
  @IsNumber()
  weightLimit: number;

  @IsNotEmpty()
  @IsNumber()
  batteryCapacity: number;

  @IsString()
  @Matches(/^(IDLE|LOADING|LOADED|DELIVERING|DELIVERED|RETURNING)$/)
  @IsOptional()
  state: DroneStateEnum;
}
export class UpdateRegisterDroneDto extends PartialType(RegisterDroneDto) {}
