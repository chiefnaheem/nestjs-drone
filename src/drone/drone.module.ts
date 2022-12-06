import { Module } from '@nestjs/common';

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
  providers: [DroneService],
})
export class DroneModule {}
