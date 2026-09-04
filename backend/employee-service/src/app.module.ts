import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity.js';
import { EmployeeController } from './controller/employee.controller.js';
import { EmployeeService } from './service/employee.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10), //10 merupakan sistem bilangan desimal yang akan mengubahnya menjadi bilangan bulat
      username: process.env.DB_USER || 'appuser',
      password: process.env.DB_PASS || 'apppassword',
      database: process.env.DB_NAME || 'wfh_attendance_db',
      entities: [Employee],
      synchronize: true,
    })
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class AppModule {}
