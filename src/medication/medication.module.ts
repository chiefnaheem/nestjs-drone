import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicationController } from './controller/medication.controller';
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
  controllers: [MedicationController],
  providers: [MedicationService],
  exports: [MedicationService]
})
export class MedicationModule {}
