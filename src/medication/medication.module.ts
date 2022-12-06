import { Module } from '@nestjs/common';
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
