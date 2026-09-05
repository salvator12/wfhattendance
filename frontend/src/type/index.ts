// Tipe untuk User / Session Auth
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'EMPLOYEE' | 'HRD';
  department?: string;
}

// Tipe Response API Login
export interface LoginResponse {
  access_token: string;
  user: User;
}

// Tipe Data Absensi WFH
export interface Attendance {
  id: number;
  userId: number;
  date: string;
  clockIn: string;
  clockOut?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  workSummary?: string;
  proofImageUrl?: string;
}