
## WFH Attendance & Employee Management System

Aplikasi pencatatan absensi karyawan (*Work From Home*) berbasis **Microservices (NestJS)** dengan antarmuka **React (Vite)** dan database **PostgreSQL**, yang dikemas dalam lingkungan **Docker**.

---

## 🚀 Prasyarat Sistem

Pastikan Anda sudah menginstal perangkat lunak berikut di komputer Anda:
* [Docker](https://www.docker.com/) & Docker Compose
* Node.js (opsional, jika Anda ingin menjalankan *frontend* secara lokal)

---

## 🛠️ Cara Menjalankan Aplikasi (Quick Start)

* **Clone repository** ini ke komputer lokal Anda.
* Buat file `.env` di root folder (Anda dapat menyalinnya dari contoh `.env.example` jika tersedia).
* Jalankan perintah berikut di terminal pada root folder untuk membangun dan menghidupkan seluruh container Docker:
   ```bash
   docker compose up --build -d
   ```
* Pastikan semua container berjalan normal dengan mengecek:
    ```bash
   docker compose ps
   ```

## 🌐 Akses Layanan & Port (Endpoints)
Sistem ini berjalan di atas beberapa layanan mikro terpisah yang diatur melalui API Gateway:

* **Frontend (React Dashboard)**: http://localhost:5173
* **API Gateway (Main Entry Point)**: http://localhost:3000
* **Auth Service**: http://localhost:3001 (Layanan autentikasi & manajemen token)
* **Employee Service**: http://localhost:3002 (Layanan manajemen data pegawai)
* **Attendance Service**: http://localhost:3003 (Layanan absensi, clock-in/out, & manajemen foto)

## 🔑 Akun Uji Coba (Default Credentials)
Untuk memulai pengujian, silakan gunakan akun HRD/Admin berikut yang sudah disiapkan di dalam database:

* **Email/Username**: hrd.admin@company.com
* **Password**: password123

## 🧪 Alur Pengujian (Testing Scenario)
Anda dapat melakukan testing dengan mengikuti skenario berikut dari awal:

* **Login**: Masuk ke aplikasi melalui Auth Service menggunakan akun HRD/Admin yang tersedia.
* **Kelola Karyawan**: Menambahkan atau memperbarui data karyawan baru melalui Employee Service.
* **Absensi (Clock-In)**: Mensimulasikan Clock-In harian lewat Attendance Service.
Mengunggah foto bukti kehadiran (file foto akan tersimpan otomatis dan dapat Anda akses melalui tautan Lihat Foto Masuk).
* **Absensi (Clock-Out)**: Melakukan Clock-Out di penghujung hari dan mengunggah foto keluar.
Verifikasi Data: Memastikan data kehadiran tampil rapi pada tabel dengan kolom status kehadiran serta tautan foto yang valid.

**Catatan**: Folder uploads diabaikan oleh Git (.gitignore), sehingga folder penyimpanan foto akan terbuat secara otomatis di dalam container Docker milik Anda saat pengujian berlangsung.