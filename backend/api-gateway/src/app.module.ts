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
      .apply(
        proxy(process.env.AUTH_SERVICE_URL || 'http://localhost:3001', {
          proxyReqPathResolver: (req) => req.originalUrl.replace(/^\/api/, ''),
        }),
      )
      .forRoutes(
        { path: 'auth/(.*)', method: RequestMethod.ALL },
        { path: 'api/auth/(.*)', method: RequestMethod.ALL },
      );
    
    // proxy untuk Employee Service
    consumer
      .apply(
        proxy(process.env.EMPLOYEE_SERVICE_URL || 'http://localhost:3002', {
          proxyReqPathResolver: (req) => req.originalUrl.replace(/^\/api/, ''),
        }),
      )
      .forRoutes(
        { path: 'employees', method: RequestMethod.ALL },
        { path: 'employees/(.*)', method: RequestMethod.ALL },
        { path: 'api/employees', method: RequestMethod.ALL },
        { path: 'api/employees/(.*)', method: RequestMethod.ALL },
      );
    
    // proxy khusus untuk folder Uploads Foto
    consumer
      .apply(
        proxy(process.env.ATTENDANCE_SERVICE_URL || 'http://attendance-service:3003', {
          proxyReqPathResolver: (req) => req.originalUrl.replace(/^\/api/, '')
        }),
      )
      .forRoutes(
        { path: 'uploads/(.*)', method: RequestMethod.GET },
        { path: 'api/uploads/(.*)', method: RequestMethod.GET },
      );

    // proxy untuk Attendance clock in Service
    consumer
    .apply(
      proxy(process.env.ATTENDANCE_SERVICE_URL || 'http://attendance-service:3003', {
        parseReqBody: false,
        proxyReqPathResolver: (req) => req.originalUrl.replace(/^\/api/, ''),
      }),
    )
    .forRoutes(
      { path: 'attendance/clock-in', method: RequestMethod.POST },
      { path: 'api/attendance/clock-in', method: RequestMethod.POST },
    );

    // proxy untuk Attendance clock out Service
    consumer
    .apply(
      proxy(process.env.ATTENDANCE_SERVICE_URL || 'http://attendance-service:3003', {
        parseReqBody: false,
        proxyReqPathResolver: (req) => req.originalUrl.replace(/^\/api/, ''),
      }),
    )
    .forRoutes(
      { path: 'attendance/clock-out', method: RequestMethod.POST },
      { path: 'api/attendance/clock-out', method: RequestMethod.POST },
    );

    // proxy untuk Attendance Service lainnya
    consumer
      .apply(
        proxy(process.env.ATTENDANCE_SERVICE_URL || 'http://attendance-service:3003', {
          proxyReqPathResolver: (req) => req.originalUrl.replace(/^\/api/, ''),
        }),
      )
      .forRoutes(
        { path: 'attendance/(.*)', method: RequestMethod.ALL },
        { path: 'api/attendance/(.*)', method: RequestMethod.ALL },
      );
  }
  
}
