import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { mongooseSchemaConfig } from 'src/utils/schema.config';
import { DroneModelEnum, DroneStateEnum } from '../enum/drone.enum';

@Schema(mongooseSchemaConfig)
export class DroneEntity {
  @Prop({
    required: true,
  })
  serialNumber: string;

  @Prop({ type: String })
  model: DroneModelEnum;

  @Prop()
  weightLimit: number;

  @Prop()
  batteryCapacity: number;

  @Prop({ type: String })
  state: DroneStateEnum;
}

export const DroneSchema = SchemaFactory.createForClass(DroneEntity);
export type DroneDocument = DroneEntity & Document;
