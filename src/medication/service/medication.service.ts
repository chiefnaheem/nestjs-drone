import { BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MedicationDocument, MedicationEntity } from '../schema/medication.schema';

@Injectable()
export class MedicationService {
    constructor(
        @InjectModel(MedicationEntity.name)
        private readonly medicationModel: Model<MedicationDocument>,
    ){}

    //create medication
    async createMedication(medication: MedicationEntity): Promise<MedicationEntity> {
        try {
            const newMedication = new this.medicationModel(medication);
            return newMedication.save();
        }
        catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    //get all medications
    async getAllMedications(): Promise<MedicationEntity[]> {
        try {
            return this.medicationModel.find().exec();
        }
        catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}
