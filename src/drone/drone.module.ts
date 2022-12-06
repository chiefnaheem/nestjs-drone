import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicationModule } from 'src/medication/medication.module';
import { DroneController } from './controller/drone.controller';
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
    MedicationModule,
  ],
  controllers: [DroneController],
  providers: [DroneService],
})
export class DroneModule {}
