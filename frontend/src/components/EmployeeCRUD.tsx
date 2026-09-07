import React, { useState } from 'react';
import api from '../api/axios';

interface Employee {
  id: number;
  employeeNumber: string;
  name: string;
  email: string;
  department: string;
  role: string;
}

interface Props {
  employees: Employee[];
  onRefresh: () => void;
}

export default function EmployeeCRUD({ employees, onRefresh }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    employeeNumber: '',
    name: '',
    email: '',
    password: '',
    department: '',
    role: 'EMPLOYEE',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/employees/${formData.employeeNumber}`, formData);
        alert('Data karyawan berhasil diupdate!');
      } else {
        await api.post('/employees', formData);
        alert('Karyawan baru berhasil ditambahkan!');
      }
      setFormData({ employeeNumber: '', name: '', email: '', password: '', department: '', role: 'EMPLOYEE' });
      setIsEditing(false);
      onRefresh();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  const handleEditClick = (emp: Employee) => {
    setFormData({
      employeeNumber: emp.employeeNumber,
      name: emp.name,
      email: emp.email,
      password: '',
      department: emp.department,
      role: emp.role,
    });
    setIsEditing(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Form */}
      <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200 md:col-span-1">
        <h2 className="text-lg font-bold mb-4">{isEditing ? 'Update Karyawan' : 'Tambah Karyawan Baru'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">No Pegawai</label>
            <input
              type="text"
              disabled={isEditing}
              value={formData.employeeNumber}
              onChange={(e) => setFormData({ ...formData, employeeNumber: e.target.value })}
              className="mt-1 block w-full border rounded-md p-2 bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password {isEditing && '(Opsional)'}</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full border rounded-md p-2"
              {...(!isEditing ? { required: true } : {})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Departemen</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-1 block w-full border rounded-md p-2"
            >
              <option value="EMPLOYEE">EMPLOYEE</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
            {isEditing ? 'Simpan Perubahan' : 'Tambah'}
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg border border-gray-200 md:col-span-2 overflow-hidden">
        <h2 className="text-lg font-bold p-4 bg-gray-50 border-b">Daftar Karyawan</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">No Pegawai</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Nama</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Departemen</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Role</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{emp.employeeNumber}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{emp.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{emp.department}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${emp.role === 'HRD' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                    {emp.role === 'HRD' ? (
                        <span className="text-xs text-gray-400 italic">Protected</span>
                    ) : (
                        <button onClick={() => handleEditClick(emp)} className="text-indigo-600 hover:text-indigo-900 font-semibold mr-2">
                        Edit
                        </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}