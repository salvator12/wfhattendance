import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

async function createHrdTest() {
  const email = 'hrd.admin@company.com';
  const plainPassword = 'password123';
  const employeeNumber = 'HRD001';
  const name = 'HRD Administrator';

  // 1. Hash password menggunakan bcrypt
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(plainPassword, saltRounds);

  console.log('--- SEEDING AKUN HRD ---');
  console.log('Email:', email);
  console.log('Plain Password:', plainPassword);
  console.log('Generated Hash:', passwordHash);

  // 2. Koneksi ke MySQL & simpan data
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'appuser',
    password: 'apppassword', // Sesuaikan dengan password database kamu
    database: 'wfh_attendance_db'
  });

  // Hapus jika email sudah ada sebelumnya, lalu insert baru
  await connection.execute('DELETE FROM employees WHERE email = ?', [email]);
  
  const query = `
    INSERT INTO employees (employee_number, name, email, password_hash, role, department, created_at, updated_at)
    VALUES (?, ?, ?, ?, 'HRD', 'Human Resources', NOW(), NOW())
  `;

  await connection.execute(query, [employeeNumber, name, email, passwordHash]);
  
  console.log('✅ Akun HRD berhasil dibuat & disimpan ke MySQL!');

  // 3. Tes verifikasi password
  const isMatch = await bcrypt.compare(plainPassword, passwordHash);
  console.log('Hasil Test Compare:', isMatch ? '✅ MATCH! (100% VALID)' : '❌ FAILED');

  await connection.end();
}

createHrdTest().catch(console.error);