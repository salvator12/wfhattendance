import { UserRole } from "../entities/employee.entity.js";

export class CreateEmployeeDto {
    employeeNumber: string
    name: string
    email: string
    password: string
    role?: UserRole
    department?: string
}