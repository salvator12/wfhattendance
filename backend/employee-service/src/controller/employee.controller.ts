import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { EmployeeService } from '../service/employee.service.js';
import { CreateEmployeeDto } from '../dto/create-employee.dto.js';
import { UpdateEmployeeDto } from '../dto/update-employee.dto.js';


@Controller('employees')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService
    ) {}

    @Get()
    async findAll() {
        return this.employeeService.findAll()
    }

    @Get(':enployeeNumber')
    async findOne(@Param('employeeNumber') employeeNumber: string) {
        return this.employeeService.findOne(employeeNumber)
    }

    @Post()
    async create(@Body() createDto: CreateEmployeeDto) {
        return this.employeeService.create(createDto)
    }

    @Put(':employeeNumber')
    async update(@Param('employeeNumber') emloyeeNumber: string, @Body() updateDto: UpdateEmployeeDto) {
        return this.employeeService.update(emloyeeNumber, updateDto)
    }
}
