import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceController } from '../src/controller/attendance.controller.js';
import { AttendanceService } from '../src/service/attendance.service.js';
import { Attendance } from './entities/attendance.entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'appuser',
      password: process.env.DB_PASS || 'apppassword',
      database: process.env.DB_NAME || 'wfh_attendance_db',
      entities: [Attendance],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Attendance]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AppModule {}
