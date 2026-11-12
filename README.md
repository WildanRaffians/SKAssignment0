# Recruitment Landing Page Section - Sekolah Karir

Sebuah *section recruitment landing page* yang responsif. Project ini dibangun sebagai bagian dari *assignment* rekrutmen paid internship di **Sekolah Karir**.

## Live Demo & Preview

- **Live Demo:** [https://sk-assignment.vercel.app/]
- **Repository:** `https://github.com/WildanRaffians/SKAssignment0`

## Fitur Utama

1. **Dynamic Search & Department Filter:** Pencarian posisi secara *real-time* berdasarkan nama peran serta *filter dropdown* departemen yang diekstrak secara dinamis dari data.
2. **Responsive Role Cards Grid:** Card pekerjaan dengan *visual hierarchy* yang jelas, menyesuaikan layout dari 1 kolom (Mobile), 2 kolom (Tablet), hingga 3 kolom (Desktop).
3. **Interactive Side Drawer (Job Details):** Panel geser dari sisi kanan untuk membaca detail deskripsi dan persyaratan pekerjaan tanpa merusak *state* atau konteks pencarian pengguna.
4. **Interactive Apply Form (Modal):** Form lamaran *dummy* yang dapat dipanggil baik dari tombol detail posisi maupun tombol *Open Application*.
5. **Toast Notification with Progress Bar:** Umpan balik (*feedback*) sukses pengiriman lamaran di posisi tengah-bawah layar, dilengkapi animasi indikator durasi 7,5 detik dan tombol tutup manual `[X]`.

## Tech Stack

- **React.js**
- **Vite**
- **Tailwind CSS** 

## Cara Menjalankan Project

### Prasyarat
Pastikan komputer sudah terinstal Node.js.

### Langkah-langkah

1. **Clone Repository / Buka Folder Project**
   - git clone [https://github.com/WildanRaffians/SKAssignment0]
   - cd SKAssignment0
2. **Install Dependensi**
   - npm install
3. **Jalankan Development Server**
   - npm run dev
4. **Buka Aplikasi**
   - Akses http://localhost:5173 di browser.

## Keputusan Utama
1. **Mobile-First & Layout Responsif**
   - Menggunakan kombinasi CSS Grid dan Flexbox bawaan Tailwind CSS.
   - Pada layar perangkat seluler (mobile), role cards ditumpuk secara vertikal untuk menjaga ukuran teks tetap mudah dibaca dan area sentuh (tap target) nyaman digunakan. Pada layar yang lebih lebar, layout secara otomatis beralih menjadi multi-kolom untuk memaksimalkan penggunaan ruang layar (viewport).

2. **Search & Dynamic Filtering**
   - Pencarian Real-time, pengguna tidak perlu menekan tombol "Cari", data difilter begitu pengguna mengetik kata kunci.
   - Dynamic Department Extraction, daftar pilihan departemen pada select dropdown tidak di-hardcode, melainkan diekstrak secara otomatis dari data pekerjaan. Jika di masa mendatang terdapat departemen baru, sistem filter akan menyesuaikan secara otomatis tanpa perubahan kode.
   - Memoization (useMemo), logika penyaringan dibungkus menggunakan hook useMemo. Hal ini memastikan kalkulasi penyaringan hanya dijalankan ulang saat state searchQuery atau filterDepartment berubah, mencegah komputasi berulang yang tidak perlu.

3. **Side Drawer**
   - Menggunakan Side Drawer (panel geser kanan) untuk menampilkan rincian pekerjaan. Untuk mencegah Context Switching, Pengguna dapat membaca detail pekerjaan lalu menutup panel tanpa kehilangan state pencarian atau posisi scroll terakhir.
   - Pada tampilan mobile, drawer secara otomatis menyesuaikan ukurannya menjadi full-screen sheet, meniru pola navigasi aplikasi native.

4. **Form Modal & Toast Notification**
   - Tombol Call to Action (CTA) seperti "Lamar Posisi Ini" dan "Kirimkan Open Application" dihubungkan langsung ke Form Modal. Memastikan tidak ada tombol aksi yang menjadi dead-end (jalan buntu).
   - Posisi Toast diletakkan di tengah-bawah layar, posisi terlihat jelas oleh pengguna tanpa memblokir area konten utama di tengah.
   - Progress Bar Animation: Indikator visual 7,5 detik menggunakan animasi CSS Keyframe memberikan transparansi (Visibility of System Status) kepada pengguna mengenai berapa lama notifikasi akan tampil. Dilengkapi tombol manual [X] agar pengguna dapat menutup notifikasi kapan saja jika diinginkan.

## Penggunaan AI

- **Tools yang digunakan:** Google Gemini (LLM)
- **Bagaimana AI membantu:** 
  1. Membantu mempercepat *setup boilerplate* kode komponen React dan *styling utility* Tailwind CSS.
  2. Membantu melakukan *troubleshooting* awal seperti ketika menghadapi *error* konfigurasi *library* di VS Code (pembaruan dari Tailwind v3 ke Tailwind v4).
  3. Membantu enyusunan kata-kata untuk dokumentasi pada README.
  
Seluruh keputusan logika, modifikasi layout, integrasi komponen telah ditinjau ulang, diuji, dan sepenuhnya saya pahami.
