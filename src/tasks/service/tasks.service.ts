import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { DroneDocument, DroneEntity } from 'src/drone/schema/drone.schema';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @InjectModel(DroneEntity.name)
    private droneModel: Model<DroneDocument>,
  ) {}

  //Introduce a periodic task to check drones battery levels and create history/audit event log for this.
    @Cron('0 0 0 * * *')
    async handleCron() {
        
}
