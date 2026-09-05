import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum AttendanceStatus {
    PRESENT = 'PRESENT',
    LATE = 'LATE',
    ABSENT = 'ABSENT'
}

@Entity('attendances')
export class Attendance {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @Column({ name: 'employee_id', type: 'bigint' })
    employeeId: string;

    @Column({ type: 'date' })
    date: string;

    @Column({ name: 'clock_in', type: 'time', nullable: true })
    clockIn: string;

    @Column({ name: 'clock_out', type: 'time', nullable: true })
    clockOut: string;

    @Column({ name: 'photo_url', length: 255 })
    photoUrl: string;

    @Column({ type: 'enum', enum: AttendanceStatus, default: AttendanceStatus.ABSENT })
    status: AttendanceStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}