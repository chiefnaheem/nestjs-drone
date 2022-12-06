import {
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  Matches,
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
  @Matches(/^[0-9]{1,3}$/)
  weightLimit: number;

  @IsNotEmpty()
  @IsNumber()
  @Matches(/^[0-9]{1,3}$/)
  batteryCapacity: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(IDLE|LOADING|LOADED|DELIVERING|DELIVERED|RETURNING)$/)
  state: DroneStateEnum;
}
export class UpdateRegisterDroneDto extends PartialType(RegisterDroneDto) {}
