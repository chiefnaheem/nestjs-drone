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
import { MedicationService } from 'src/medication/service/medication.service';

@Injectable()
export class DroneService {
  constructor(
    @InjectModel(DroneEntity.name)
    private readonly droneModel: Model<DroneDocument>,
    private medicationService: MedicationService
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
  async updateDrone(id: string, drone: RegisterDroneDto): Promise<DroneEntity> {
    try {
      const updatedDrone = await this.droneModel.findByIdAndUpdate(id, drone, {
        new: true,
      });
      if (!updatedDrone) {
        throw new NotFoundException('Drone not found');
      }
      return updatedDrone;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //delete drone
  async deleteDrone(id: string): Promise<string> {
    try {
      const deletedDrone = await this.droneModel.findByIdAndDelete(id);
      if (!deletedDrone) {
        throw new NotFoundException('Drone not found');
      }
      return 'drone deleted';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //get all drones
  async getAllDrones(): Promise<DroneEntity[]> {
    try {
      return this.droneModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //get drone by id
  async getDroneById(id: string): Promise<DroneEntity> {
    try {
      const drone = await this.droneModel.findById(id).exec();
      if (!drone) {
        throw new NotFoundException('Drone not found');
      }
      return drone;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //we want to load a drone with medication items
  //Prevent the drone from being loaded with more weight that it can carry;
  // Prevent the drone from being in LOADING state if the battery level is **below 25%**;
  //change the state to LOADING when loading
  //decrement batteryCapacity periodically
    
    async loadDrone(id: string, medication: string[]): Promise<DroneEntity> {
    try {
      const drone = await this.droneModel.findById(id);
        if (!drone) {
            throw new NotFoundException('Drone not found');
        }
        if (drone.state === 'LOADING') {
            throw new BadRequestException('Drone is already loading');
        }
        if (drone.batteryCapacity < 25) {
            throw new BadRequestException('Drone battery is low');
        }
        //we will loop through medication input and get them by id, then check for their weight to compare with the weight limit of the drone
        let totalWeight = 0;
        for (let key of medication) {
            const med = await this.medicationService.getMedicationById(key);
            totalWeight += med.weight;
        }
        if (totalWeight > drone.weightLimit) {
            throw new BadRequestException('Drone weight limit exceeded');
        }
        //if all is good, we will update the drone state to LOADING and decrement the batteryCapacity
        drone.state = 'LOADING';
        drone.batteryCapacity -= 5;
        await drone.save();
        return drone;
    } catch (error) {
        throw new InternalServerErrorException(error.message);
    }
}



}
