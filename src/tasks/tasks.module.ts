import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { DroneEntity, DroneSchema } from 'src/drone/schema/drone.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeatureAsync([
      {
        name: DroneEntity.name,
        useFactory: () => {
          return DroneSchema;
        },
      },
    ]),
  ],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
