import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from "../entities/employee.entity.js";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { CreateEmployeeDto } from '../dto/create-employee.dto.js';
import { UpdateEmployeeDto } from '../dto/update-employee.dto.js';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>
    ) {}

    //Get semua employees
    async findAll() {
        return this.employeeRepository.find({
            select: {
                id: true,
                employeeNumber: true,
                name: true,
                email: true,
                role: true,
                department: true,
                createdAt: true
            }
        });
    }

    //Get single employee berdasarkan EmployeeNumber
    async findOne(employeeNumber: string) {
        const employee = await this.employeeRepository.findOne({
            where: { employeeNumber },
            select: {
                id: true,
                employeeNumber: true,
                name: true,
                email: true,
                role: true,
                department: true,
                createdAt: true
            },
        })
        if (!employee) {
            throw new NotFoundException(`Employee with id: ${employeeNumber} not found`)
        }
        return employee
    }

    //Create employee baru (HRD only)
    async create(createDto: CreateEmployeeDto) {
        const existing = await this.employeeRepository.findOne({
            where: [{email: createDto.email}, {employeeNumber: createDto.employeeNumber}]
        })
        if (existing) {
            throw new ConflictException(`email or Employee Number already exists`)
        }

        const saltRounds = 10 // nilai untuk melakukan iterasi pengacakan sebanyak 2^10 kali
        const passwordHash = await bcrypt.hash(createDto.password, saltRounds)

        const newEmployee = this.employeeRepository.create({
            ...createDto,
            passwordHash
        })

        const saved = await this.employeeRepository.save(newEmployee)
        delete (saved as any).passwordHash // Sembunyikan password_hash di response 
        return saved
    }

    // Update Data Karyawan
    async update(employeeNumber: string, updateDto: UpdateEmployeeDto) {
        const employee = await this.findOne(employeeNumber)

        if (updateDto.password) employee.passwordHash = await bcrypt.hash(updateDto.password, 10)
        if (updateDto.name) employee.name = updateDto.name
        if (updateDto.email) employee.email = updateDto.email 
        if (updateDto.role) employee.role = updateDto.role;
        if (updateDto.department) employee.department = updateDto.department

        await this.employeeRepository.save(employee)
        delete (employee as any).passwordHash
        return employee
    }
}