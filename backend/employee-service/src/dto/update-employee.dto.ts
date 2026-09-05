import { UserRole } from "../entities/employee.entity.js";

// seluruh field dibuat opsional (?) agar HRD bisa mengubah sebagian data saja
export class UpdateEmployeeDto {
    name?: string
    email?: string
    password?: string
    role?: UserRole
    department: string
}