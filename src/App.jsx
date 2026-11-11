import React, { useState, useMemo, useRef } from 'react';

// Menambahkan data deskripsi dan kualifikasi untuk simulasi detail pekerjaan
const openRoles = [
  {
    id: 1,
    title: "Frontend Engineer Intern",
    department: "Engineering",
    location: "Remote",
    type: "Paid Internship",
    description: "Sebagai Frontend Engineer Intern, kamu akan membantu tim dalam membangun antarmuka pengguna yang interaktif dan responsif menggunakan React dan ekosistem modern lainnya.",
    requirements: [
      "Menguasai dasar HTML, CSS, dan JavaScript.",
      "Familiar dengan React.js atau framework frontend lainnya.",
      "Memiliki passion terhadap UI/UX dan detail desain.",
      "Sedang menempuh pendidikan atau *fresh graduate* di bidang IT."
    ]
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "Jakarta, Hybrid",
    type: "Full-time",
    description: "Kami mencari Product Manager yang visioner untuk memimpin pengembangan produk digital kami, mulai dari riset kebutuhan pengguna hingga peluncuran fitur.",
    requirements: [
      "Pengalaman minimal 2 tahun di bidang Product Management.",
      "Mampu menerjemahkan kebutuhan bisnis menjadi fitur produk.",
      "Terbiasa bekerja dengan metodologi Agile/Scrum.",
      "Kemampuan komunikasi dan kepemimpinan yang kuat."
    ]
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Contract",
    description: "Bergabunglah dengan tim desain kami untuk menciptakan pengalaman pengguna yang mulus dan antarmuka yang estetis untuk berbagai produk digital Sekolah Karir.",
    requirements: [
      "Portofolio desain UI/UX yang solid.",
      "Mahir menggunakan Figma.",
      "Memahami prinsip desain responsif dan *design system*.",
      "Kemampuan melakukan riset pengguna dasar adalah nilai tambah."
    ]
  }
];

// State untuk Form & Notifikasi

export default function RecruitmentSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [applyTarget, setApplyTarget] = useState(''); // Menyimpan posisi apa yang dilamar
  const handleApplyClick = (targetName) => {
    setApplyTarget(targetName);
    setIsFormOpen(true);
  };

  const [showToast, setShowToast] = useState(false);
  const [toastKey, setToastKey] = useState(0); // Digunakan untuk me-reset animasi progress bar
  const toastTimerRef = useRef(null);

  // Fungsi untuk menutup Toast secara manual
  const closeToast = () => {
    setShowToast(false);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setIsFormOpen(false);
    if (selectedRole) closeDrawer();
    
    // Hapus timer sebelumnya jika notifikasi dipanggil ulang
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);

    setShowToast(true);
    setToastKey((prev) => prev + 1); // Reset key agar animasi progress bar diulang dari 100%

    // Otomatis tutup setelah 7.5 detik (7500 ms)
    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
    }, 7500);
  };


  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('Semua');
  
  // State untuk Side Drawer
  const [selectedRole, setSelectedRole] = useState(null);

  const departments = ['Semua', ...new Set(openRoles.map(role => role.department))];

  const filteredRoles = useMemo(() => {
    return openRoles.filter((role) => {
      const matchesSearch = role.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = filterDepartment === 'Semua' || role.department === filterDepartment;
      return matchesSearch && matchesDepartment;
    });
  }, [searchQuery, filterDepartment]);

  // Fungsi untuk menutup drawer
  const closeDrawer = () => setSelectedRole(null);

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      
      {/* Navbar Section */}
      <nav className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="font-extrabold text-xl text-gray-900 tracking-tight">Sekolah Karir</span>
        </div>
        <button className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </nav>

      {/* Main Content */}
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Bangun Karirmu Bersama Kami
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Bergabunglah dengan tim yang berdedikasi membangun ekosistem digital terbaik. Kami mencari talenta yang siap memberikan dampak nyata.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari posisi pekerjaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm outline-none transition-all"
              />
            </div>
            
            <div className="sm:w-64">
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm outline-none transition-all cursor-pointer appearance-none"
              >
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept === 'Semua' ? 'Semua Departemen' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Role Cards Grid */}
          {filteredRoles.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {filteredRoles.map((role) => (
                <div 
                  key={role.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4">
                      {role.department}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {role.title}
                    </h2>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>📍 {role.location}</p>
                      <p>💼 {role.type}</p>
                    </div>
                  </div>
                  {/* Tombol yang mentrigger Side Drawer */}
                  <button 
                    onClick={() => setSelectedRole(role)}
                    className="mt-6 w-full text-blue-600 font-medium text-sm hover:text-blue-800 text-left focus:outline-none focus:underline"
                  >
                    Lihat Detail &rarr;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200 border-dashed mb-12">
              <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">Tidak ada posisi yang sesuai</h3>
              <p className="mt-2 text-sm text-gray-500">Coba gunakan kata kunci yang berbeda atau pilih departemen lain.</p>
              <button 
                onClick={() => { setSearchQuery(''); setFilterDepartment('Semua'); }}
                className="mt-4 text-blue-600 font-medium text-sm hover:underline focus:outline-none"
              >
                Reset pencarian
              </button>
            </div>
          )}

          {/* CTA Bawah */}
          <div className="text-center bg-blue-600 rounded-2xl p-8 sm:p-10 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-3">Tidak menemukan posisi yang pas?</h2>
            <p className="mb-6 text-blue-100 max-w-xl mx-auto">
              Kirimkan CV kamu, dan kami akan menghubungi jika ada posisi yang sesuai dengan profilmu.
            </p>
            <button 
              onClick={() => handleApplyClick('Open Application')}
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
            >
              Kirimkan Open Application
            </button>
          </div>

        </div>
      </main>

      {/* --- SIDE DRAWER COMPONENT --- */}
      
      {/* 1. Backdrop Overlay (Hitam transparan) */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          selectedRole ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeDrawer}
      ></div>

      {/* 2. Side Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out flex flex-col ${
          selectedRole ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-gray-900">Detail Pekerjaan</h2>
          <button 
            onClick={closeDrawer}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 flex-1">
          {selectedRole && (
            <>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4">
                {selectedRole.department}
              </span>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-4">
                {selectedRole.title}
              </h1>
              
              <div className="flex flex-col gap-2 mb-8 text-sm text-gray-600 border-l-2 border-gray-200 pl-4">
                <p>📍 Lokasi: <span className="font-medium text-gray-900">{selectedRole.location}</span></p>
                <p>💼 Tipe: <span className="font-medium text-gray-900">{selectedRole.type}</span></p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Tentang Peran Ini</h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedRole.description}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Persyaratan</h3>
                <ul className="space-y-2">
                  {selectedRole.requirements.map((req, index) => (
                    <li key={index} className="flex gap-2 text-gray-600">
                      <span className="text-blue-500 flex-shrink-0">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer (Sticky action button) */}
        <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0">
          <button 
            onClick={() => handleApplyClick(selectedRole.title)}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Lamar Posisi Ini
          </button>
        </div>
      </div>
      {/* --- FORM MODAL DUMMY --- */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <h2 className="text-xl font-bold text-gray-900 mb-1">Kirim Lamaran</h2>
            <p className="text-sm text-gray-500 mb-6">Melamar untuk: <span className="font-semibold text-blue-600">{applyTarget}</span></p>
            
            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload CV (PDF)</label>
                <input required type="file" accept=".pdf" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors mt-6">
                Kirim Lamaran
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- TOAST NOTIFICATION (SUCCESS MESSAGE) --- */}
      {/* --- TOAST NOTIFICATION (DI TENGAH BAWAH LAYAR) --- */}
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] w-full max-w-sm px-4 transition-all duration-300 transform ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Style keyframe untuk animasi progress bar */}
        <style>{`
          @keyframes toastProgress {
            from { width: 100%; }
            to { width: 0%; }
          }
          .animate-toast-progress {
            animation: toastProgress 7s linear forwards;
          }
        `}</style>

        <div className="bg-gray-900 text-white rounded-2xl shadow-2xl overflow-hidden relative border border-gray-800">
          <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
            
            {/* Pesan & Icon */}
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 text-green-400 p-2 rounded-full flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Lamaran Berhasil Dikirim!</h4>
                <p className="text-xs text-gray-400 mt-0.5">Tim kami akan meninjau profil kamu secepatnya.</p>
              </div>
            </div>

            {/* Tombol X (Manual Close) */}
            <button 
              onClick={closeToast}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none"
              aria-label="Tutup notifikasi"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Indikator Durasi (Progress Bar) */}
          {showToast && (
            <div className="w-full bg-gray-800 h-1">
              <div 
                key={toastKey}
                className="bg-green-500 h-full animate-toast-progress"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}