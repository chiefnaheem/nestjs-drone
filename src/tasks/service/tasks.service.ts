import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { DroneStateEnum } from 'src/drone/enum/drone.enum';
import { DroneDocument, DroneEntity } from 'src/drone/schema/drone.schema';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @InjectModel(DroneEntity.name)
    private droneModel: Model<DroneDocument>,
  ) {}

  @Cron('0 */5 * * * *')
  async handleCron() {
    try {
      const drones = await this.droneModel.find().exec();
      drones.forEach(async (drone) => {
        drone.batteryCapacity = drone.batteryCapacity - 1;
        if (drone.batteryCapacity < 25) {
          drone.state = DroneStateEnum.IDLE;
        }
        await drone.save();
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

}
