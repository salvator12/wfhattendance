import { useEffect, useState } from 'react';
import api from '../api/axios';
import HRDAttendanceTable from '../components/HRDAttendanceTable';
import EmployeeCRUD from '../components/EmployeeCRUD';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export default function HRDDashboard() {
  const [activeTab, setActiveTab] = useState<'attendance' | 'employees'>('attendance');
  const [employees, setEmployees] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [user, setUser] = useState<{ name?: string; role?: string }>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [empRes, attRes] = await Promise.all([
        api.get('/employees'),
        api.get('/attendance/hrd/all')
      ]);
      setEmployees(empRes.data);
      setAttendances(attRes.data);
    } catch (error) {
      console.error('Gagal memuat data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Gagal parsing data user', e);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-center">Memuat dashboard HRD...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Navbar title= 'Dashboard HRD & Monitoring' userName={user.name || 'Employee'} onLogout={handleLogout} />

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-semibold border-b-2 ${activeTab === 'attendance' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
          onClick={() => setActiveTab('attendance')}
        >
          Monitoring Presensi
        </button>
        <button
          className={`py-2 px-4 font-semibold border-b-2 ${activeTab === 'employees' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
          onClick={() => setActiveTab('employees')}
        >
          Master Data Karyawan (CRUD)
        </button>
      </div>

      {/* Konten Berdasarkan Tab */}
      {activeTab === 'attendance' ? (
        <HRDAttendanceTable attendances={attendances} employees={employees} />
      ) : (
        <EmployeeCRUD employees={employees} onRefresh={fetchData} />
      )}
    </div>
  );
}