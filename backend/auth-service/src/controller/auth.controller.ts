import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../service/auth.service.js';
import { LoginDto } from '../dto/login.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    // Gunakan post agar password tidak tercantum pada link url saat melakukan login dan tercatat di log history/cache borwser
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) { 
        return this.authService.login(loginDto)
    }
}