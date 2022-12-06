import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { mongooseSchemaConfig } from 'src/utils/schema.config';

@Schema(mongooseSchemaConfig)
export class MedicationEntity {
    @Prop({
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9_-]+$/,
    })
    name: string;

    @Prop({
        required: true,
        min: 0,
    })
    weight: number;

    @Prop({
        required: true,
        unique: true,
        match: /^[A-Z0-9_]+$/,
    })
    code: string;

    @Prop({
        required: true,
    })
    image: string;

}

export const MedicationSchema = SchemaFactory.createForClass(MedicationEntity);
export type MedicationDocument = MedicationEntity & Document;