import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator,
  HttpHealthIndicator,
} from '@nestjs/terminus';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private healthCheckService: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: MongooseHealthIndicator,
  ) {}

  @Get()
  welcome(): string {
    return this.appService.getHello();
  }

  @Get('health-check')
  @HealthCheck()
  checkHealth() {
    return this.healthCheckService.check([
      () => this.http.pingCheck('Basic Check', 'http://localhost:4000/api'),
      () => this.db.pingCheck('mongoose'),
    ]);
  }
}
