import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicationDto } from '../dto/medication.dto';
import { MedicationService } from '../service/medication.service';

@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  //create medication
    @Post()
    async createMedication(@Body() medication: MedicationDto) {
        return this.medicationService.createMedication(medication);
    }

    //get all medications
    @Get()
    async getAllMedications() {
        return this.medicationService.getAllMedications();
    }

    //get medication by id
    @Get(':id')
    async getMedicationById(@Param('id') id: string) {
        return this.medicationService.getMedicationById(id);
    }

    //update medication
    @Patch(':id')
    async updateMedication(
        @Param('id') id: string,
        @Body() medication: UpdateMedicationDto,
    ) {
        return this.medicationService.updateMedication(id, medication);
    }
}
