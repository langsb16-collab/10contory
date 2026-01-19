import { Translation } from './types';

/**
 * Indonesian (Bahasa Indonesia) translations
 */
export const id: Translation = {
  nav: {
    home: 'Beranda',
    about: 'Tentang',
    courses: 'Kursus',
    universities: 'Universitas Mitra',
    companies: 'Perusahaan Mitra',
    medical: 'Wisata Medis',
    login: 'Masuk',
    signup: 'Daftar',
    dashboard: 'Dasbor',
    logout: 'Keluar'
  },
  home: {
    hero: {
      title: 'Belajar Korea dengan TOPIK Pro',
      subtitle: 'Platform multibahasa gratis untuk persiapan TOPIK dan peluang karir di Korea',
      cta: 'Mulai belajar sekarang'
    },
    features: {
      title: 'Mengapa memilih TOPIK Pro?',
      feature1: {
        title: 'Pembelajaran dengan AI',
        desc: 'Rencana studi yang dipersonalisasi berdasarkan level dan tujuan Anda'
      },
      feature2: {
        title: 'Pencocokan universitas dan pekerjaan',
        desc: 'Terhubung dengan universitas dan perusahaan di wilayah Gyeongsan'
      },
      feature3: {
        title: 'Gratis selamanya',
        desc: 'Persiapan TOPIK lengkap tanpa biaya'
      }
    }
  },
  medical: {
    hero: {
      title: 'Tur Kesehatan K-Medical',
      subtitle: 'Rasakan layanan kesehatan kelas dunia di Gyeongsan dengan pengobatan tradisional Korea',
      cta: 'Pesan pemeriksaan kesehatan'
    },
    packages: {
      title: 'Paket pemeriksaan kesehatan',
      basic: {
        title: 'Pemeriksaan Kesehatan Dasar',
        desc: 'Tes darah, urin, rontgen dada, EKG - sekitar 2 jam'
      },
      comprehensive: {
        title: 'Pemeriksaan Komprehensif',
        desc: 'Pemindaian tubuh lengkap + CT/MRI + endoskopi - sekitar 4 jam'
      },
      cancer: {
        title: 'Skrining 5 Kanker Utama',
        desc: 'Skrining khusus kanker lambung, usus besar, hati, paru-paru, dan payudara - sekitar 5 jam'
      },
      vip: {
        title: 'Pemeriksaan Premium VIP',
        desc: 'Pemeriksaan premium + koordinator khusus + layanan limusin - sekitar 6 jam'
      }
    },
    hanyang: {
      title: 'Penyembuhan Pengobatan Korea',
      subtitle: 'Sembuhkan tubuh dan pikiran dengan pengobatan tradisional Korea yang dipersonalisasi setelah pemeriksaan',
      digestive: {
        title: 'Akupunktur dan Moksibusi Pencernaan',
        desc: 'Pengobatan masalah pencernaan dan penyakit perut - sekitar 60 menit'
      },
      musculoskeletal: {
        title: 'Terapi Chuna Muskuloskeletal',
        desc: 'Meredakan nyeri leher, bahu, dan punggung - sekitar 45 menit'
      },
      stress: {
        title: 'Akupunktur Herbal Penghilang Stres',
        desc: 'Meredakan stres dan stabilitas mental - sekitar 50 menit'
      },
      constitutional: {
        title: 'Obat Herbal Konstitusional',
        desc: 'Resep herbal yang dipersonalisasi berdasarkan konstitusi - sekitar 30 menit'
      }
    },
    benefits: {
      title: 'Mengapa wisata medis Gyeongsan?',
      benefit1: {
        title: 'Biaya terjangkau',
        desc: '30-50% lebih murah dari kota-kota besar'
      },
      benefit2: {
        title: 'Tanpa waktu tunggu',
        desc: 'Janji temu segera, hasil di hari yang sama'
      },
      benefit3: {
        title: 'Perawatan terintegrasi',
        desc: 'Sinergi pengobatan Barat + pengobatan tradisional Korea'
      },
      benefit4: {
        title: 'Interpretasi medis',
        desc: 'Dukungan dalam 11 bahasa dengan layanan pendampingan'
      }
    },
    booking: {
      title: 'Pesan pemeriksaan kesehatan',
      name: 'Nama lengkap',
      email: 'Email',
      phone: 'Nomor telepon',
      nationality: 'Kebangsaan',
      checkupDate: 'Tanggal yang disukai',
      package: 'Paket pemeriksaan',
      hanyang: 'Program Pengobatan Korea (opsional)',
      interpreter: 'Butuh penerjemah',
      submit: 'Pesan sekarang'
    }
  },
  auth: {
    login: {
      title: 'Masuk ke akun Anda',
      email: 'Email',
      password: 'Kata sandi',
      submit: 'Masuk',
      noAccount: 'Belum punya akun?',
      signupLink: 'Daftar di sini'
    },
    signup: {
      title: 'Buat akun Anda',
      name: 'Nama lengkap',
      email: 'Email',
      password: 'Kata sandi',
      confirmPassword: 'Konfirmasi kata sandi',
      nativeLanguage: 'Bahasa asli',
      targetLevel: 'Level TOPIK target',
      purpose: 'Tujuan pembelajaran',
      submit: 'Daftar',
      hasAccount: 'Sudah punya akun?',
      loginLink: 'Masuk di sini'
    }
  },
  dashboard: {
    title: 'Dasbor Saya',
    currentLevel: 'Level saat ini',
    targetLevel: 'Level target',
    progress: 'Kemajuan',
    todayTasks: 'Tugas hari ini',
    startLearning: 'Mulai belajar',
    takeMockExam: 'Ikuti ujian simulasi',
    viewResults: 'Lihat hasil'
  },
  diagnostic: {
    title: 'Tes Penempatan',
    clickToStart: 'Periksa level Anda – klik sekarang!',
    subtitle: 'Ukur level Anda saat ini dan dapatkan rencana pembelajaran yang dipersonalisasi',
    testInfo: {
      title: 'Informasi tes',
      duration: 'Durasi: sekitar 20 menit',
      questions: 'Jumlah pertanyaan: 30',
      areas: 'Area penilaian: mendengarkan, membaca, menulis',
      results: 'Hasil: tersedia segera'
    },
    startButton: 'Mulai tes'
  },
  common: {
    save: 'Simpan',
    cancel: 'Batal',
    delete: 'Hapus',
    edit: 'Edit',
    view: 'Lihat',
    loading: 'Memuat...',
    error: 'Error',
    success: 'Sukses',
    bookNow: 'Pesan sekarang',
    learnMore: 'Pelajari lebih lanjut'
  }
};
