import {Controller, Post, Get, Body, Param, UseInterceptors, UploadedFile, BadRequestException} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AttendanceService } from '../service/attendance.service.js';
import { ClockInDto } from '../dto/clock-in.dto.js';
import { ClockOutDto } from '../dto/clock-out.dto.js';

const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
};

@Controller('attendance')
export class AttendanceController {
    constructor(
        private readonly attendanceService: AttendanceService
    ) {}

    @Post('clock-in') // menyatakan fungsi ini menerima HTTP Request dengan method POST
    @UseInterceptors(FileInterceptor('photo', multerOptions))
    async clockIn(@Body() dto: ClockInDto, @UploadedFile() file: Express.Multer.File) {
        
        if (!dto.employeeId) {
            throw new BadRequestException('employeeId is required');
        }
        if (!file) {
           throw new BadRequestException('Photo attachment is required for WFH clock-in');
        }

        return this.attendanceService.clockIn(dto.employeeId, file.path)
    }

    @Post('clock-out')
    @UseInterceptors(FileInterceptor('photo', multerOptions)) 
    async clockOut(
        @Body() dto: ClockOutDto, 
        @UploadedFile() file: Express.Multer.File
    ) {
        if (!dto.employeeId) {
            throw new BadRequestException('employeeId is required');
        }
        // Validasi wajib upload foto saat clock-out
        if (!file) {
           throw new BadRequestException('Photo attachment is required for clock-out');
        }

        return this.attendanceService.clockOut(dto.employeeId, file.path);
    }

    @Get('history/:employeeId')
    async getHistory(@Param('employeeId') employeeId: string) {
        return this.attendanceService.getEmployeeHistory(employeeId)
    }

    @Get('/hrd/all')
    async findAll() {
        return this.attendanceService.findAll();
    }
}