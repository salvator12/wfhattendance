import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import type { Attendance, User } from '../type';
import { Clock, CheckCircle, Camera, Upload } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { CustomButton } from '../components/CustomButton';
import { StatusBadge } from '../components/StatusBadge';

export const EmployeeDashboard = () => {
    const [attendance, setAttendance] = useState<Attendance | null>(null)
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const user: User = JSON.parse(localStorage.getItem('user') || '{}')

    const fetchTodayAttendance = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const response = await api.get(`/attendance/history/${user.id}`);

            const historyList = response.data;
            const todayStr = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
            
            // Cari absensi yang tanggalnya hari ini
            const todayRecord = historyList.find((item: any) => 
                item.createdAt?.startsWith(todayStr) || item.date === todayStr
            );

            if (todayRecord) {
                setAttendance(todayRecord); // Simpan record hari ini
            }
        } catch (err) {
            console.log('Belum ada absensi hari ini')
        }
    }
    useEffect(() => {
        fetchTodayAttendance()
    }, [])

    // Handle pilih / ambil foto
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setPhoto(file)
            setPhotoPreview(URL.createObjectURL(file))
        }
    }

    // Submit Clock-In menggunakan FormData (Multipart HTTP Request)
    const handleClockIn = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        if (!photo) {
            setMessage('Harap upload/ambil foto bukti WFH terlebih dahulu!');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user') || '{}');
    
        if (!user.id) {
            setMessage('Sesi login tidak valid. Silakan login ulang.');
            return;
        }

        setLoading(true)
        setMessage('')

        const formData = new FormData()
        formData.append('employeeId', user.id)
        formData.append('photo', photo)

        try {
            const res = await api.post<Attendance>('/attendance/clock-in', formData, {
                headers: { 'Content-Type': 'multipart/form-data' } 
            })
            setAttendance(res.data);
            setMessage('Berhasil Clock-In dengan foto bukti!');

            setPhoto(null);
            setPhotoPreview(null);
        } catch (err: any) {
            setMessage(err.response.data.message || 'Gagal Clock-In')
        } finally {
            setLoading(false)
        }
    }

    const handleClockOut = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        if (!photo) {
            setMessage('Harap upload/ambil foto bukti WFH terlebih dahulu!');
            return;
        }

        if (!user.id) {
            setMessage('Sesi login tidak valid. Silakan login ulang.');
            return;
        }

        setLoading(true);
        setMessage('');

        const formData = new FormData()
        formData.append('employeeId', user.id)
        formData.append('photo', photo)
        try {
            const res = await api.post<Attendance>('/attendance/clock-out', formData, {
                headers: { 'Content-Type': 'multipart/form-data' } 
            })

            setAttendance(res.data);
            setMessage('Berhasil Clock-Out!');
        } catch (err: any) {
            setMessage(err.response?.data?.message || 'Gagal Clock-Out');
        } finally {
            setLoading(false);
        }
    };
    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar title='WFH Attendance' userName={user.name || 'Employee'} onLogout={handleLogout} />
            <main className='max-w-4xl mx-auto p-4 sm:p-6'>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b">
                        <h2 className='text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2'>
                            <Clock className='text-blue-600' size={20}/> Presensi WFH Hari Ini
                            {attendance && (
                                <div className="self-start sm:self-auto">
                                    <StatusBadge status={attendance.status}/>
                                </div>
                            )}
                        </h2>
                    </div>

                    {message && (
                        <div className={`mb-4 p-3 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs sm:text-sm
                        ${message.includes('Gagal') || message.includes('Harap') ? 'bg-red-50 text-red-700 border-red-200': 
                        'bg-blue-50 text-blue-700 border-blue-200'}`}>
                            {message}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                        <div className="bg-gray-50 p-3.5 sm:p-4 rounded-xl border border-gray-100">
                            <span className='text-xs text-gray-500 font-medium'>
                                Jam Masuk (Clock In)
                            </span>
                            <p className='text-lg sm:text-xl font-bold text-gray-800 mt-1'>
                                {attendance?.clockIn ? attendance?.clockIn : '--:--'}
                            </p>
                        </div>
                        <div className="bg-gray-50 p-3.5 sm:p-4 rounded-xl border border-gray-100">
                            <span className='text-xs text-gray-500 font-medium'>
                                Jam Pulang (Clock Out)
                            </span>
                            <p className='text-lg sm:text-xl font-bold text-gray-800 mt-1'>
                                {attendance?.clockOut ? attendance?.clockOut : '--:--'}
                            </p>
                        </div>
                    </div>

                    {!attendance ? (
                        <form onSubmit={handleClockIn} className='space-y-4'>
                            <div>
                                <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-2'>
                                    Upload Foto Bukti ClockIn
                                </label>

                                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl 
                                p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer relative">
                                    <input
                                        type='file'
                                        accept='image/*'
                                        capture='user' // Aktifkan kamera langsung jika di HP
                                        onChange={handlePhotoChange}
                                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                                    />
                                    {photoPreview ? (
                                        <div className="flex flex-col items-center">
                                            <img 
                                            src={photoPreview} 
                                            alt="Bukti WFH" 
                                            className='w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl border mb-2'
                                            />
                                            <span className='text-xs text-blue-600 font-semibold flex items-center gap-1'>
                                                <Camera size={14} /> Ganti Foto
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center text-center p-2">
                                            <Upload className='text-gray-400 mb-2' size={32} />
                                            <p className='text-xs sm:text-sm text-gray-600 font-medium'>
                                                Klik untuk mengambil foto / upload bukti WFH
                                            </p>
                                            <p className="text-[10px] sm:text-xs text-gray-400 mt-1">PNG, JPG</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <CustomButton type='submit' variant='success' isLoading={loading}>
                                CLOCK IN SEKARANG
                            </CustomButton>
                        </form>
                    ) : !attendance.clockOut ? (
                        <form onSubmit={handleClockOut} className='space-y-4'>
                            <div>
                                <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-2'>
                                    Upload Foto Bukti ClockOut
                                </label>

                                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl 
                                p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer relative">
                                    <input
                                        type='file'
                                        accept='image/*'
                                        capture='user' // Aktifkan kamera langsung jika di HP
                                        onChange={handlePhotoChange}
                                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                                    />
                                    {photoPreview ? (
                                        <div className="flex flex-col items-center">
                                            <img 
                                            src={photoPreview} 
                                            alt="Bukti WFH ClockOut" 
                                            className='w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl border mb-2'
                                            />
                                            <span className='text-xs text-blue-600 font-semibold flex items-center gap-1'>
                                                <Camera size={14} /> Ganti Foto
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center text-center p-2">
                                            <Upload className='text-gray-400 mb-2' size={32} />
                                            <p className='text-xs sm:text-sm text-gray-600 font-medium'>
                                                Klik untuk mengambil foto / upload bukti ClockOut
                                            </p>
                                            <p className="text-[10px] sm:text-xs text-gray-400 mt-1">PNG, JPG</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <CustomButton type='submit' variant='danger' isLoading={loading}>
                                CLOCK OUT SEKARANG
                            </CustomButton>
                        </form>
                    ) : (
                        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-3.5 sm:p-4 rounded-xl border border-emerald-200 text-xs sm:text-sm font-medium">
                            <CheckCircle size={18} className="shrink-0" />
                            <span>Anda telah menyelesaikan presensi WFH hari ini.</span>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}