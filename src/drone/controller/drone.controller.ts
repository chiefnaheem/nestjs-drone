import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { RegisterDroneDto } from '../dto/drone.dto';
import { DroneService } from '../service/drone.service';

@Controller('drone')
export class DroneController {
  constructor(private readonly droneService: DroneService) {}

  //create drone
  @Post()
  async createDrone(@Body() drone: RegisterDroneDto) {
    return this.droneService.registerDrone(drone);
  }

    //get all drones
    @Get()
    async getAllDrones() {
        return this.droneService.getAllDrones();
        }

    //get drone by id
    @Get(':id')
    async getDroneById(@Param('id') id: string) {
        return this.droneService.getDroneById(id);
        }
}
