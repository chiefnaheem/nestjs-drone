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
  @Get('all')
  async getAllDrones() {
    return this.droneService.getAllDrones();
  }

  //get drone by id
  @Get('single/:id')
  async getDroneById(@Param('id') id: string) {
    return this.droneService.getDroneById(id);
  }

  //load drone
  @Patch('load/:id')
  async loadDrone(@Param('id') id: string, @Body() medication: string[]) {
    return this.droneService.loadDrone(id, medication);
  }

  //deliver medication
  @Patch('deliver/:id')
  async deliverMedication(@Param('id') id: string) {
    return this.droneService.deliverMedication(id);
  }

  //check drone battery level
  @Get('battery/:id')
  async checkBatteryLevel(@Param('id') id: string) {
    return this.droneService.checkDroneBattery(id);
  }

  //delete drone
  @Delete(':id')
  async deleteDrone(@Param('id') id: string) {
    return this.droneService.deleteDrone(id);
  }

  @Get('available')
  async getAvailableDrones () {
    return this.droneService.checkAvailableDrones()
  }
  
}
