interface Attendance {
  id: number;
  employeeId: number;
  date: string;
  clockIn: string;
  clockOut: string | null;
  status: string;
  photoUrl?: string;
}

interface Employee {
  id: number;
  name: string;
  employeeNumber: string;
  department: string;
}

interface Props {
  attendances: Attendance[];
  employees: Employee[];
}

export default function HRDAttendanceTable({ attendances, employees }: Props) {
  const getEmployeeInfo = (employeeId: string | number) => {
    const emp = employees.find((e) => e.id == employeeId);
    return {
        name: emp ? emp.name : `Karyawan ID: ${employeeId}`, 
        employeeNumber: emp ? emp.employeeNumber : '-',
        employeeDepartment: emp ? emp.department : '-',
    };
  };

  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Nama Karyawan</th>
                <th className="px-4 py-3">NIK</th>
                <th className="px-4 py-3">Departemen</th>
                <th className="px-4 py-3">Clock-In</th>
                <th className="px-4 py-3">Clock-Out</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Foto Bukti ClockIn</th>
                <th className="px-4 py-3">Foto Bukti ClockOut</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendances.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{item.date}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                        {item.employeeName || getEmployeeInfo(item.employeeId).name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                        {item.employeeNumber || getEmployeeInfo(item.employeeId).employeeNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                        {item.department || getEmployeeInfo(item.employeeId).employeeDepartment}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.clockIn || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.clockOut || '-'}</td>
                    <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        item.status === 'PRESENT' ? 'bg-green-100 text-green-800' : item.status === 'LATE' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {item.status}
                    </span>
                    </td>
                    
                    <td className="px-4 py-3 text-sm">
                    {item.photoInUrl ? (
                        <a 
                        href={`http://localhost:3000/api/${item.photoInUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                        >
                        Lihat Foto Masuk
                        </a>
                    ) : (
                        <span className="text-gray-400 italic">Tidak ada</span>
                    )}
                    </td>

                    {/* Kolom Foto Clock-Out (photoOutUrl) - BARU */}
                    <td className="px-4 py-3 text-sm">
                    {item.photoOutUrl ? (
                        <a 
                        href={`http://localhost:3000/api/${item.photoOutUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline font-medium"
                        >
                        Lihat Foto Keluar
                        </a>
                    ) : (
                        <span className="text-gray-400 italic">Belum clock-out</span>
                    )}
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}