import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controller/auth.controller.js';
import { AuthService } from '../auth.service.js';
import { Employee } from '../entities/employee.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super_secret_jwt_key_wfh_app',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}