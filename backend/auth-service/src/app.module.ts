import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller.js';
import { AuthService } from './service/auth.service.js';

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
    TypeOrmModule.forFeature([Employee]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super_secret_jwt_key_wfh_app',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
