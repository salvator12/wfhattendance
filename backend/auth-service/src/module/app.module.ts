import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller.js';
import { AppService } from '../app.service.js';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../entities/employee.entity.js';
import { AuthModule } from './auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'appuser',
      password: process.env.DB_PASS || 'apppassword',
      database: process.env.DB_NAME || 'wfh_attendance_db',
      entities: [Employee],
      synchronize: true
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
