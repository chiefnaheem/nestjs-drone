import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';

@Module({
  imports: [ScheduleModule.forRoot(),
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
