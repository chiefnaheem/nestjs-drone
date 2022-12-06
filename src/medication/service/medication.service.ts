import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MedicationService {
    constructor(
        @InjectModel(MedicationEntity.name)
        private readonly medicationModel: Model<MedicationDocument>,
    ){}
}
