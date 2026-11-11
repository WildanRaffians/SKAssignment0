# Recruitment Landing Page Section - Sekolah Karir

Sebuah *section recruitment landing page* yang responsif, interaktif, dan berorientasi pada *User Experience* (UX) yang baik. Project ini dibangun sebagai bagian dari *assignment* rekrutmen paid internship di **Sekolah Karir** untuk mendemonstrasikan pemecahan masalah produk, kemampuan eksekusi kode yang bersih (*clean code*), serta pertimbangan arsitektur yang matang.

---

## Live Demo & Preview

- **Live Demo:** []
- **Repository:** ``

---

## Fitur Utama

1. **Header Navigation (Sticky Navbar):** Logo *brand* Sekolah Karir dan tombol akses profil yang selalu berada di atas layar saat di-*scroll*.
2. **Dynamic Search & Department Filter:** Pencarian posisi secara *real-time* berdasarkan nama peran serta *filter dropdown* departemen yang diekstrak secara dinamis dari data.
3. **Responsive Role Cards Grid:** Card pekerjaan dengan *visual hierarchy* yang jelas, menyesuaikan layout dari 1 kolom (Mobile), 2 kolom (Tablet), hingga 3 kolom (Desktop).
4. **Interactive Side Drawer (Job Details):** Panel geser dari sisi kanan untuk membaca detail deskripsi dan persyaratan pekerjaan tanpa merusak *state* atau konteks pencarian pengguna.
5. **Interactive Apply Form (Modal):** Form lamaran *dummy* yang dapat dipanggil baik dari tombol detail posisi maupun tombol *Open Application*.
6. **Toast Notification with Progress Bar:** Umpan balik (*feedback*) sukses pengiriman lamaran di posisi tengah-bawah layar, dilengkapi animasi indikator durasi 7,5 detik dan tombol tutup manual `[X]`.
7. **Empty State & Reset Control:** Tampilan khusus saat kriteria pencarian tidak ditemukan, dilengkapi tombol *reset* cepat.

---

## Tech Stack & Alasan Pemilihan

- **React.js:** Memungkinkan pembangunan antarmuka berbasis komponen (*component-based architecture*) yang modular, re-usable, serta mempermudah pengelolaan *state* interaktif.
- **Vite:** Dipilih sebagai *build tool* karena proses inisialisasi yang sangat cepat, *Hot Module Replacement* (HMR) yang instan, serta efisiensi *bundling*.
- **Tailwind CSS (v4):** Mempercepat pembuatan *styling* responsif secara *utility-first*, menjaga ukuran bundle tetap optimal, serta memastikan konsistensi sistem desain (*spacing*, *colors*, *typography*).

---

## Cara Menjalankan Project

### Prasyarat\n
Pastikan komputer kamu sudah terinstal [Node.js](https://nodejs.org/)

### Langkah-langkah

1. **Clone Repository / Buka Folder Project**\n
   git clone []\n
   cd SKAssignment0
2. **Install Dependensi**\n
   npm install
3. **Jalankan Development Server**\n
   npm run dev
4. **Buka Aplikasi**\n
   Akses http://localhost:5173 di browser Anda.

## Keputusan Utama & Reasoning (Key Decisions)
1. **Mobile-First & Layout Responsif**
Pendekatan: Menggunakan kombinasi CSS Grid dan Flexbox bawaan Tailwind CSS (grid-cols-1 md:grid-cols-2 lg:grid-cols-3).

Reasoning: Pada layar perangkat seluler (mobile), role cards ditumpuk secara vertikal untuk menjaga ukuran teks tetap mudah dibaca dan area sentuh (tap target) nyaman digunakan. Pada layar yang lebih lebar, layout secara otomatis beralih menjadi multi-kolom untuk memaksimalkan penggunaan ruang layar (viewport).

2. **Search & Dynamic Filtering (Optimasi Performa)**
Pencarian Real-time: Pengguna tidak perlu menekan tombol "Cari" secara manual. Data difilter secara instant begitu pengguna mengetik kata kunci.

Dynamic Department Extraction: Daftar pilihan departemen pada select dropdown tidak di-hardcode, melainkan diekstrak secara otomatis dari data pekerjaan menggunakan [...new Set(openRoles.map(...))]. Jika di masa mendatang terdapat departemen baru, sistem filter akan menyesuaikan secara otomatis tanpa perubahan kode.

Memoization (useMemo): Logika penyaringan dibungkus menggunakan hook useMemo. Hal ini memastikan kalkulasi penyaringan hanya dijalankan ulang saat state searchQuery atau filterDepartment berubah, mencegah komputasi berulang yang tidak perlu.

3. **Side Drawer vs Multi-Page Routing**
Pendekatan: Menggunakan Side Drawer (panel geser kanan) alih-alih berpindah halaman (multi-page routing) untuk menampilkan rincian pekerjaan.

Reasoning:

Mencegah Context Switching: Pengguna dapat membaca detail pekerjaan lalu menutup panel tanpa kehilangan state pencarian atau posisi scroll terakhir.

Efisiensi Scope: Menjaga kompleksitas aplikasi tetap terukur (lightweight) tanpa perlu dependensi routing tambahan seperti react-router-dom.

Adaptabilitas Layout: Pada tampilan mobile, drawer secara otomatis menyesuaikan ukurannya menjadi full-screen sheet, meniru pola navigasi aplikasi native.

4. **End-to-End User Flow (Form Modal & Toast Notification)**
Penyelesaian Siklus (Funnel): Tombol Call to Action (CTA) seperti "Lamar Posisi Ini" dan "Kirimkan Open Application" dihubungkan langsung ke Form Modal. Ini memastikan tidak ada tombol aksi yang menjadi dead-end (jalan buntu).

Non-Intrusive Toast Feedback:

Posisi Toast diletakkan di tengah-bawah layar (bottom-6 left-1/2 -translate-x-1/2), posisi ideal yang terlihat jelas oleh pengguna tanpa memblokir area konten utama di tengah.

Progress Bar Animation: Indikator visual 7,5 detik menggunakan animasi CSS Keyframe memberikan transparansi (Visibility of System Status) kepada pengguna mengenai berapa lama notifikasi akan tampil.

User Control & Freedom: Dilengkapi tombol manual [X] agar pengguna dapat menutup notifikasi kapan saja jika diinginkan.

5. **Pengelolaan State & Keamanan Memori**
Pembersihan Timer (useRef): Penggunaan toastTimerRef memastikan bahwa ketika notifikasi ditutup secara manual oleh pengguna (atau saat aplikasi melamar ulang), timeout sebelumnya langsung dibersihkan (cleared). Ini mencegah masalahkebocoran memori (memory leak) atau state update yang tidak terduga di latar belakang.

Reset Animasi (toastKey): Menggunakan state toastKey yang diperbarui setiap kali form dikirimkan, sehingga animasi CSS progress bar di-reset dari 100% secara konsisten meski notifikasi dipanggil berturut-turut.

## Struktur Folder Project
SKAssignment0/
├── public/
├── src/
│   ├── App.jsx              # Main App entry point
│   ├── RecruitmentSection.jsx # Main recruitment component (All-in-one UI logic)
│   ├── index.css            # Global CSS & Tailwind CSS import
│   └── main.jsx             # React DOM Rendering
├── package.json
├── vite.config.js
└── README.md