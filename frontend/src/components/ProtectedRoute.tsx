import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
    allowRoles?: ('EMPLOYEE' | 'HRD')[]
}


// Berfungsi untuk mencegah pengguna mengakses halaman tanpa token dan mengatur akses halaman sesuai dengan role
export const ProtectedRoute = ({ allowRoles } : ProtectedRouteProps) => {
    const token = localStorage.getitem('token')
    const userJson = localStorage.getItem('user')
    const user = userJson ? JSON.parse(userJson) : null

    // Jika belum login, akan diarahkan ke halaman login
    if (!token || !user) {
        return <Navigate to="/login" replace />
    }

    // Jika role pengguna tidak diizinkan, arahkan ke halaman utama
    if (allowRoles && !allowRoles.includes(user.role)) {
        return <Navigate to={"/"} replace />
    }

    // Jika valid, tampilkan halaman tujuan
    return <Outlet />
}