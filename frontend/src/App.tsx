import { Navigate, Route, Routes } from 'react-router-dom';
import { EmployeeDashboard } from './pages/EmployeeDashnoard';
import Login from './pages/Login'; // atau path halaman login kamu
import HRDDashboard from './pages/HRDDashboard';

function App() {
  return (
    // PASTIKAN SEMUA <Route> DIBUNGKUS DALAM <Routes> SEPERTI INI:
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      <Route path="/hrd/dashboard" element={<HRDDashboard />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;