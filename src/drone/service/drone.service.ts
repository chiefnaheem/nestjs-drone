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
import { DroneStateEnum } from '../enum/drone.enum';

@Injectable()
export class DroneService {
  constructor(
    @InjectModel(DroneEntity.name)
    private readonly droneModel: Model<DroneDocument>,
    private medicationService: MedicationService,
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

  async loadDrone(id: string, medication: string[]): Promise<DroneEntity> {
    try {
      const drone = await this.droneModel.findById(id);
      if (!drone) {
        throw new NotFoundException('Drone not found');
      }
      if (drone.state === 'LOADING') {
        throw new BadRequestException('Drone is already loading');
      }
      if (drone.batteryLevel < 25) {
        throw new BadRequestException('Drone battery is low');
      }

      let totalWeight = 0;
      for (const key of medication) {
        const med = await this.medicationService.getMedicationById(key);
        totalWeight += med.weight;
      }
      if (totalWeight > drone.weightLimit) {
        throw new BadRequestException('Drone weight limit exceeded');
      }
      //if all is good, we will update the drone state to LOADING and decrement the batteryLevel
      drone.state = DroneStateEnum.LOADING;
      drone.batteryLevel -= 5;
      drone.medicationItems.push(...medication);
      await drone.save();
      return drone;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //deliver medication items then empty the medication items from the drone
  async deliverMedication(id: string): Promise<DroneEntity> {
    try {
      const drone = await this.droneModel.findById(id);
      if (!drone) {
        throw new NotFoundException('Drone not found');
      }
      if (drone.state === 'DELIVERING') {
        throw new BadRequestException('Drone is already delivering');
      }
      if (drone.batteryLevel < 25) {
        throw new BadRequestException('Drone battery is low');
      }
      if (drone.medicationItems.length === 0) {
        throw new BadRequestException('Drone is empty');
      }

      drone.state = DroneStateEnum.DELIVERED;
      drone.batteryLevel -= 5;
      drone.medicationItems = [];
      await drone.save();
      return drone;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //recharge drone
  async rechargeDrone(id: string): Promise<DroneEntity> {
    try {
      const drone = await this.droneModel.findById(id);
      if (!drone) {
        throw new NotFoundException('Drone not found');
      }

      if (drone.batteryLevel === 100) {
        throw new BadRequestException('Drone battery is full');
      }

      drone.batteryLevel = 100;
      await drone.save();
      return drone;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //get drone by state
  async getDroneByState(state: string): Promise<DroneEntity[]> {
    try {
      const drone = await this.droneModel.find({ state: state }).exec();
      if (!drone) {
        throw new NotFoundException('Drone not found');
      }
      return drone;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //get medications items loaded in a drone
  async getMedicationItems(id: string): Promise<DroneEntity> {
    try {
      const drone = await this.droneModel
        .findById(id)
        .populate('medicationItems')
        .exec();
      if (!drone) {
        throw new NotFoundException('Drone not found');
      }
      return drone;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //check availabale drones for loading
  async checkAvailableDrones(): Promise<DroneEntity[]> {
    try {
      const drones = await this.droneModel
        .find({
          $and: [
            { state: DroneStateEnum.IDLE },
            { batteryLevel: { $gt: 25 } },
            { medicationItems: { $size: 0 } },
          ],
        })
        .exec();
      if (!drones) {
        throw new NotFoundException('Drone not found');
      }
      return drones;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //check a drone battery capacity
  async checkDroneBattery(id: string): Promise<any> {
    try {
      const drone = await this.droneModel.findById(id).exec();
      if (!drone) {
        throw new NotFoundException('Drone not found');
      }
      console.log(drone);
      return { battery: drone.batteryLevel };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
