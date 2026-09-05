import { Module, NestModule, MiddlewareConsumer, RequestMethod, Req } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import proxy from 'express-http-proxy';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true})
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // proxy untuk Auth Service
    consumer
    .apply(proxy(process.env.AUTH_SERVICE_URL || 'http://localhost:3001'))
    .forRoutes({path: 'api/auth/*', method: RequestMethod.ALL})
    
    // proxy untuk Employee Service
    consumer
    .apply(proxy(process.env.EMPLOYEE_SERVICE_URL || 'http://localhost:3002'))
    .forRoutes({path: 'api/employee/*', method: RequestMethod.ALL})

    // proxy untuk Attendance Service
    consumer
    .apply(proxy(process.env.ATTENDANCE_SERVICE_URL || 'http://localhost:3003'))
    .forRoutes({ path: 'api/attendance/*', method: RequestMethod.ALL})
  }
  
}
