import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DroneEntity, DroneSchema } from './schema/drone.schema';
import { DroneService } from './service/drone.service';

@Module({
    imports: [
    MongooseModule.forFeatureAsync([
      {
        name: DroneEntity.name,
        useFactory: () => {
          return DroneSchema;
        },
      },
    ]),
  ],
  controllers: [DroneController],
  providers: [DroneService],
})
export class DroneModule {}
