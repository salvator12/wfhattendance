import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance, AttendanceStatus } from '../entities/attendance.entity.js';
import { Repository } from 'typeorm';


@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>
    ) {}

    private getTodayDateString(): string {
        return new Date().toISOString().split('T')[0]
    }

    private getCurrentTimeString(): string {
        return new Date().toTimeString().split(' ')[0] //HH:MM:SS
    }

    // Sistem Clock In (dengan upload foto)
    async clockIn(employeeId: string, photoPath: string) {
        if (!photoPath) {
           throw new BadRequestException('Photo is required for clock-in');
        }

        const today = this.getTodayDateString()

        const existingRecord = await this.attendanceRepository.findOne({
            where: {employeeId, date: today}
        })

        if(existingRecord) {
            throw new BadRequestException("You already clocked in today")
        }

        const currentTime = this.getCurrentTimeString()

        const status = currentTime > '09:00:00' ? AttendanceStatus.LATE : AttendanceStatus.PRESENT

        const newAttendance = this.attendanceRepository.create({
            employeeId,
            date: today,
            clockIn: currentTime,
            photoUrl: photoPath,
            status
        })

        return this.attendanceRepository.save(newAttendance)
    }

    // Sistem Clock Out
    async clockOut(employeeId: string) {
        const today = this.getTodayDateString()

        const attendance = await this.attendanceRepository.findOne({
            where: {employeeId, date: today}
        })

        if(!attendance) {
            throw new NotFoundException('No clock-in record found for today')
        }

        if(attendance.clockOut) {
            throw new BadRequestException('You have already clocked out today')
        }

        attendance.clockOut = this.getCurrentTimeString()
        return this.attendanceRepository.save(attendance)
    }

    // Get Riwayat Absensi Karyawan
    async getEmployeeHistory(employeeId: string) {
        return this.attendanceRepository.find({
            where: { employeeId },
            order: { date: 'DESC' },
        });
    }

    // 4. Get Semua Absensi (Khusus HRD Monitoring)
    async findAll() {
        return this.attendanceRepository.find({
        order: { date: 'DESC' },
        });
    }
}