import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicationService } from '../service/medication.service';

@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  //create medication
    @Post()
    async createMedication(@Body() medication: MedicationDto) {
        
}
