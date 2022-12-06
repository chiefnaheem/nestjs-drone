import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  MedicationDocument,
  MedicationEntity,
} from '../schema/medication.schema';

@Injectable()
export class MedicationService {
  constructor(
    @InjectModel(MedicationEntity.name)
    private readonly medicationModel: Model<MedicationDocument>,
  ) {}

  //create medication
  async createMedication(
    medication: MedicationEntity,
  ): Promise<MedicationEntity> {
    try {
      const newMedication = new this.medicationModel(medication);
      return newMedication.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //get all medications
  async getAllMedications(): Promise<MedicationEntity[]> {
    try {
      return this.medicationModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

    //get medication by id
    async getMedicationById(id: string): Promise<MedicationEntity> {
        try {
            const medication = await this.medicationModel
                .findById(id)
                .exec();
            if (!medication) {
                throw new NotFoundException('Medication not found');
            }
            return medication;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    //update medication
    async updateMedication(
        id: string,
        medication: MedicationEntity,
    ): Promise<MedicationEntity> {
        try {
            const updatedMedication = await this.medicationModel
                .findByIdAndUpdate(id, medication, { new: true })
                .exec();
            if (!updatedMedication) {
                throw new NotFoundException('Medication not found');
            }
            return updatedMedication;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    //delete medication
    async deleteMedication(id: string): Promise<string> {
        try {
            const deletedMedication = await this.medicationModel
                .findByIdAndDelete(id)
                .exec();
            if (!deletedMedication) {
                throw new NotFoundException('Medication not found');
            }
            return 'Medication deleted';
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}
