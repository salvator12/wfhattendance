import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import type { LoginResponse } from '../type';
import { LogIn } from 'lucide-react';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError('');

        const cleanEmail = email.trim();
        const cleanPassword = password.trim();

        if (!cleanEmail || !cleanPassword) {
            setError('Email dan password wajib diisi');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            setError('Format email tidak valid (contoh: user@company.com)');
            return;
        }

        setLoading(true);

        try {
            // FIX: Pemetaan key JSON disesuaikan dengan DTO backend NestJS
            const response = await api.post<LoginResponse>('/auth/login', { 
                email: cleanEmail, 
                password: cleanPassword 
            });
            

            const { access_token, user } = response.data;

            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'HRD') {
                navigate('/hrd/dashboard');
            } else {
                navigate('/employee/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login gagal. Periksa email dan password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
            <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <div className="flex justify-center mb-4 text-blue-600">
                    <LogIn size={36} className="sm:w-12 sm:h-12" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
                    WFH Attendance System
                </h2>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-xs sm:text-sm border border-red-200">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                    <CustomInput 
                        label="Email Address"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="employee@company.com"
                    />

                    <CustomInput 
                        label="Password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />

                    <CustomButton type="submit" isLoading={loading} variant="primary">
                        Sign In
                    </CustomButton>
                </form>
            </div>
        </div>
    );
};

export default Login;