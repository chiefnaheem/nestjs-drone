import { BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DroneDocument, DroneEntity } from '../schema/drone.schema';
import { RegisterDroneDto } from '../dto/drone.dto';

@Injectable()
export class DroneService {
    constructor(
        @InjectModel(DroneEntity.name)
        private readonly droneModel: Model<DroneDocument>,
    ){}

    //register drone
    async registerDrone(drone: RegisterDroneDto): Promise<DroneEntity> {
        try {
            const newDrone = new this.droneModel(drone);
            return newDrone.save();
        }
        catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
