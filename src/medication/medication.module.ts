import { Module } from '@nestjs/common';
import { MedicationService } from './service/medication.service';

@Module({
  providers: [MedicationService]
})
export class MedicationModule {}
