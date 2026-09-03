import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';
import { Employee } from './entities/employee.entity.js';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
        private readonly jwtService: JwtService,
    ){}

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto

        //cari user berdasarkan email
        const user = await this.employeeRepository.findOne({where: {email}})
        if(!user) {
            throw new UnauthorizedException('Invalid email or password')
        }

        //Compare password plaintext dengan hash di database
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
        if(!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password')
        }

        //Susun payload JWT
        const payload = {
            sub: user.id,
            employeeNumber: user.employeeNumber,
            email: user.email,
            role: user.role,
            name: user.name
        }

        // Generate token JWT
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
            }
        }
    }
}

