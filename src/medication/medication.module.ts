import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicationEntity, MedicationSchema } from './schema/medication.schema';
import { MedicationService } from './service/medication.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: MedicationEntity.name,
        useFactory: () => {
          return MedicationSchema;
        },
      },
    ]),
  ],
  providers: [MedicationService],
})
export class MedicationModule {}
