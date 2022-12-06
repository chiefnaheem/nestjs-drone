import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DroneService {
    constructor(
        @InjectModel(DroneEntity.name)
        private readonly droneModel: Model<DroneDocument>,
    ){}
}
