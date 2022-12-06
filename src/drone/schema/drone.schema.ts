import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { MedicationEntity } from 'src/medication/schema/medication.schema';
import { mongooseSchemaConfig } from 'src/utils/schema.config';
import { DroneModelEnum, DroneStateEnum } from '../enum/drone.enum';

@Schema(mongooseSchemaConfig)
export class DroneEntity {
  @Prop({
    required: true,
    unique: true,
    maxlength: 100,
  })
  serialNumber: string;

  @Prop({
    required: true,
    enum: DroneModelEnum,
  })
  model: DroneModelEnum;

  @Prop({
    required: true,
    max: 500,
  })
  weightLimit: number;

  @Prop({
    required: true,
    min: 0,
    max: 100,
  })
  batteryCapacity: number;

  @Prop({
    required: true,
    enum: DroneStateEnum,
    default: DroneStateEnum.IDLE,
  })
  state: DroneStateEnum;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: MedicationEntity.name }])
  medicationItems: string[];
}

export const DroneSchema = SchemaFactory.createForClass(DroneEntity);
export type DroneDocument = DroneEntity & Document;
