import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DroneDocument, DroneEntity } from '../schema/drone.schema';
import { RegisterDroneDto } from '../dto/drone.dto';

@Injectable()
export class DroneService {
  constructor(
    @InjectModel(DroneEntity.name)
    private readonly droneModel: Model<DroneDocument>,
  ) {}

  //register drone
  async registerDrone(drone: RegisterDroneDto): Promise<DroneEntity> {
    try {
      const newDrone = new this.droneModel(drone);
      return newDrone.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //update drone
    async updateDrone(
    id: string,
    drone: RegisterDroneDto,
    ): Promise<DroneEntity> {
    try {
      const updatedDrone = await this.droneModel.findByIdAndUpdate(id
        , drone, { new: true });
        if (!updatedDrone) {
            throw new NotFoundException('Drone not found');
            }
            return updatedDrone;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    //delete drone
    async deleteDrone(id: string): Promise<DroneEntity> {
        try {
            const deletedDrone = await this.droneModel.findByIdAndDelete(id);
            if (!deletedDrone) {
                throw new NotFoundException('Drone not found');
            }
            return deletedDrone;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
