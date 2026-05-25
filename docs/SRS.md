# Software Requirements Specification (SRS)
## Zaportfolio — Personal Portfolio Website

| | |
|---|---|
| **Dokumen** | Software Requirements Specification |
| **Versi** | 1.0.0 |
| **Tanggal** | 2026-05-26 |
| **Penulis** | Mohamad Reza Reziyanto |
| **Status** | Released |

---

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Gambaran Umum Sistem](#2-gambaran-umum-sistem)
3. [Kebutuhan Fungsional](#3-kebutuhan-fungsional)
   - [SRS-AUTH — Autentikasi & Otorisasi](#srs-auth--autentikasi--otorisasi)
   - [SRS-HOME — Halaman Beranda](#srs-home--halaman-beranda)
   - [SRS-ABOUT — Halaman Tentang Saya](#srs-about--halaman-tentang-saya)
   - [SRS-PROJ — Halaman Proyek](#srs-proj--halaman-proyek)
   - [SRS-ACH — Halaman Pencapaian](#srs-ach--halaman-pencapaian)
   - [SRS-DASH — Halaman Dashboard](#srs-dash--halaman-dashboard)
   - [SRS-CHAT — Halaman Chat Room](#srs-chat--halaman-chat-room)
   - [SRS-CONT — Halaman Kontak](#srs-cont--halaman-kontak)
   - [SRS-LINK — Halaman Links](#srs-link--halaman-links)
   - [SRS-AI — Fitur Smart Talk (AI)](#srs-ai--fitur-smart-talk-ai)
   - [SRS-I18N — Internasionalisasi](#srs-i18n--internasionalisasi)
   - [SRS-SEO — SEO & Metadata](#srs-seo--seo--metadata)
   - [SRS-UI — Antarmuka Umum](#srs-ui--antarmuka-umum)
4. [Kebutuhan Non-Fungsional](#4-kebutuhan-non-fungsional)
5. [Antarmuka Eksternal](#5-antarmuka-eksternal)
6. [Batasan Sistem](#6-batasan-sistem)

---

## 1. Pendahuluan

### 1.1 Tujuan
Dokumen ini mendefinisikan seluruh kebutuhan fungsional dan non-fungsional untuk sistem **Zaportfolio** — website portofolio pribadi milik Mohamad Reza Reziyanto yang berfungsi sebagai media presentasi diri, manajemen konten, dan interaksi dengan calon klien maupun rekruter.

### 1.2 Ruang Lingkup
Zaportfolio adalah aplikasi web full-stack yang mencakup:
- Presentasi portofolio (proyek, pencapaian, skill, karir, pendidikan)
- Sistem manajemen konten (CMS) oleh pemilik (Author)
- Chat room real-time untuk pengunjung
- Integrasi dashboard dengan API eksternal (GitHub, WakaTime, Codewars, Monkeytype, Umami)
- Dukungan dua bahasa (Indonesia & English)
- Fitur AI chatbot (Smart Talk)
- Halaman Linktree personal

### 1.3 Definisi & Akronim

| Istilah | Definisi |
|---|---|
| **Author** | Pemilik website (Mohamad Reza Reziyanto) yang memiliki hak akses penuh |
| **Visitor** | Pengunjung umum tanpa akun |
| **Authenticated User** | Pengguna yang login via OAuth (Google/GitHub), dapat berinteraksi di Chat Room |
| **CMS** | Content Management System — fitur kelola konten oleh Author |
| **SRS ID** | Kode unik identifikasi setiap requirement, format: `SRS-[MODUL]-[NNN]` |
| **OAuth** | Open Authorization — protokol autentikasi pihak ketiga |
| **i18n** | Internationalization — dukungan multi-bahasa |

### 1.4 Referensi
- Next.js App Router Documentation
- Supabase Documentation
- NextAuth.js v4 Documentation
- IEEE Std 830-1998 (SRS Template)

---

## 2. Gambaran Umum Sistem

### 2.1 Perspektif Produk
Zaportfolio adalah website portofolio generasi berikutnya yang bukan hanya menampilkan karya, tetapi juga berfungsi sebagai platform CMS dinamis. Semua konten dapat dikelola langsung dari UI oleh Author tanpa perlu mengubah kode.

### 2.2 Fungsi Produk (Ringkasan)

```
Zaportfolio
├── Pengunjung Umum
│   ├── Melihat portofolio (proyek, skill, karir, pendidikan, pencapaian)
│   ├── Berinteraksi di chat room (perlu login Google/GitHub)
│   ├── Menghubungi via form kontak / WhatsApp
│   └── Melihat dashboard statistik real-time
│
├── Author (Pemilik)
│   ├── Semua akses pengunjung +
│   ├── CRUD Proyek, Skill, Pencapaian, Karir, Pendidikan, Links
│   ├── Edit bio paragraf secara inline
│   ├── Akses Smart Talk AI (eksklusif)
│   └── Moderasi chat room
│
└── Authenticated User (Login via OAuth)
    ├── Kirim pesan di chat room
    ├── Balas pesan
    └── Hapus pesan milik sendiri
```

### 2.3 Karakteristik Pengguna

| Tipe | Deskripsi | Akses |
|---|---|---|
| **Visitor** | Rekruter, calon klien, atau pengunjung umum | Read-only semua halaman publik |
| **Authenticated User** | Pengguna yang login via Google/GitHub | Read + Post di Chat Room |
| **Author** | Pemilik website (email = `NEXT_PUBLIC_AUTHOR_EMAIL`) | Full access + CMS |

### 2.4 Stack Teknologi

| Komponen | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS v3, Framer Motion, GSAP, AOS |
| Autentikasi | NextAuth.js v4 (Google + GitHub OAuth) |
| Database | Supabase (PostgreSQL + Real-time) |
| State | SWR (server state), Zustand (client state) |
| Forms | React Hook Form |
| i18n | next-intl |
| AI | Google Gemini API |
| Email | Nodemailer |
| Analitik | Umami Analytics, Vercel Analytics |
| Deployment | Vercel |

---

## 3. Kebutuhan Fungsional

---

### SRS-AUTH — Autentikasi & Otorisasi

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-AUTH-001** | Sistem menyediakan login via akun Google menggunakan OAuth 2.0 | Visitor | Wajib |
| **SRS-AUTH-002** | Sistem menyediakan login via akun GitHub menggunakan OAuth 2.0 | Visitor | Wajib |
| **SRS-AUTH-003** | Sistem mendeteksi apakah pengguna yang login adalah Author dengan membandingkan email session dengan `NEXT_PUBLIC_AUTHOR_EMAIL` | Sistem | Wajib |
| **SRS-AUTH-004** | Sistem menampilkan tombol/aksi CMS (tambah, edit, hapus) hanya ketika Author sedang login | Author | Wajib |
| **SRS-AUTH-005** | Semua endpoint API yang bersifat mutasi (`POST`, `PUT`, `DELETE`) harus memvalidasi sesi Author sebelum memproses request | Sistem | Wajib |
| **SRS-AUTH-006** | Sistem menampilkan tombol Sign Out di sidebar untuk Author yang sedang login | Author | Wajib |
| **SRS-AUTH-007** | Session disimpan secara aman menggunakan NextAuth.js session strategy | Sistem | Wajib |

---

### SRS-HOME — Halaman Beranda

**Route**: `/[locale]`  
**File**: `modules/home/`

#### Seksi Introduksi

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-HOME-001** | Sistem menampilkan nama, lokasi, dan status pekerjaan (Freelance) pada seksi introduksi | Visitor | Wajib |
| **SRS-HOME-002** | Sistem menampilkan bio/deskripsi diri dalam 2 paragraf sesuai bahasa aktif (EN/ID) | Visitor | Wajib |
| **SRS-HOME-003** | Bio paragraf diambil dari database Supabase tabel `bio` sebagai sumber utama | Sistem | Wajib |
| **SRS-HOME-004** | Author dapat mengedit bio paragraf secara inline dengan klik ikon pensil yang muncul saat hover | Author | Wajib |
| **SRS-HOME-005** | Form edit bio menampilkan dua kolom teks (EN dan ID) secara bersamaan | Author | Wajib |
| **SRS-HOME-006** | Perubahan bio disimpan via `PUT /api/bio/[index]` dan halaman diperbarui tanpa reload | Author | Wajib |

#### Seksi Skills

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-HOME-007** | Sistem menampilkan daftar skill dalam bentuk tag berikon dengan filter kategori | Visitor | Wajib |
| **SRS-HOME-008** | Filter kategori yang tersedia: Semua, Utama, Frontend, Backend, Database, Tools | Visitor | Wajib |
| **SRS-HOME-009** | Setiap kategori menampilkan jumlah skill di badge | Visitor | Wajib |
| **SRS-HOME-010** | Skill yang tidak aktif (`is_active = false`) disembunyikan dari Visitor | Visitor | Wajib |
| **SRS-HOME-011** | Author dapat menampilkan/menyembunyikan skill tersembunyi dengan tombol "Show all" | Author | Wajib |
| **SRS-HOME-012** | Skill tersembunyi ditampilkan dengan opasitas 40% saat mode "Show all" aktif | Author | Wajib |
| **SRS-HOME-013** | Author dapat menambah skill baru via `SkillFormModal` dengan klik tombol "Tambah" | Author | Wajib |
| **SRS-HOME-014** | Form tambah/edit skill memiliki field: nama, icon key, background (hex), color (Tailwind class), kategori, display order, status aktif | Author | Wajib |
| **SRS-HOME-015** | Author dapat mengedit skill dengan klik ikon pensil yang muncul saat hover pada skill | Author | Wajib |
| **SRS-HOME-016** | Author dapat toggle `is_active` skill dengan klik ikon mata yang muncul saat hover | Author | Wajib |
| **SRS-HOME-017** | Author dapat menghapus skill dengan konfirmasi dialog terlebih dahulu | Author | Wajib |
| **SRS-HOME-018** | Icon skill di-resolve dari konstanta `STACKS` berdasarkan `icon_key` yang disimpan di database | Sistem | Wajib |
| **SRS-HOME-019** | Animasi transisi skill menggunakan Framer Motion `AnimatePresence` saat filter berubah | Visitor | Opsional |

---

### SRS-ABOUT — Halaman Tentang Saya

**Route**: `/[locale]/about`  
**File**: `modules/about/`

#### Seksi Cerita

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-ABOUT-001** | Sistem menampilkan bio 4 paragraf dari database tabel `bio` sesuai bahasa aktif | Visitor | Wajib |
| **SRS-ABOUT-002** | Author dapat mengedit setiap paragraf bio secara inline dari halaman About | Author | Wajib |
| **SRS-ABOUT-003** | Sistem menampilkan gambar tanda tangan di bawah teks bio | Visitor | Opsional |

#### Seksi Karir

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-ABOUT-004** | Sistem menampilkan daftar riwayat karir dalam urutan kronologis terbaru di atas | Visitor | Wajib |
| **SRS-ABOUT-005** | Setiap kartu karir menampilkan: posisi, perusahaan, logo, periode, dan deskripsi pekerjaan | Visitor | Wajib |
| **SRS-ABOUT-006** | Author dapat menambah entri karir baru via `CareerFormModal` | Author | Wajib |
| **SRS-ABOUT-007** | Author dapat mengedit entri karir yang ada via `AuthorActions` overlay (edit/hapus muncul saat hover) | Author | Wajib |
| **SRS-ABOUT-008** | Author dapat menghapus entri karir dengan konfirmasi dialog | Author | Wajib |
| **SRS-ABOUT-009** | Form karir memiliki field: posisi, perusahaan, logo URL, tanggal mulai, tanggal selesai, deskripsi (EN + ID), status aktif | Author | Wajib |

#### Seksi Pendidikan

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-ABOUT-010** | Sistem menampilkan daftar riwayat pendidikan | Visitor | Wajib |
| **SRS-ABOUT-011** | Setiap kartu pendidikan menampilkan: nama sekolah/universitas, jurusan, periode, logo | Visitor | Wajib |
| **SRS-ABOUT-012** | Author dapat menambah, mengedit, dan menghapus entri pendidikan | Author | Wajib |
| **SRS-ABOUT-013** | Form pendidikan memiliki field: nama sekolah, jurusan (EN + ID), logo URL, tanggal mulai, tanggal selesai | Author | Wajib |

---

### SRS-PROJ — Halaman Proyek

**Route**: `/[locale]/projects` dan `/[locale]/projects/[slug]`  
**File**: `modules/projects/`

#### Daftar Proyek

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-PROJ-001** | Sistem menampilkan daftar proyek dalam grid responsif (1 kolom mobile, 2 kolom desktop) | Visitor | Wajib |
| **SRS-PROJ-002** | Sistem menyediakan filter proyek berdasarkan tipe (Semua, Website, Mobile, dsb.) | Visitor | Wajib |
| **SRS-PROJ-003** | Sistem menyediakan pencarian proyek berdasarkan judul | Visitor | Wajib |
| **SRS-PROJ-004** | Setiap kartu proyek menampilkan: gambar, judul, deskripsi singkat, stack teknologi, dan link | Visitor | Wajib |
| **SRS-PROJ-005** | Klik kartu proyek membuka halaman detail (`/projects/[slug]`) | Visitor | Wajib |
| **SRS-PROJ-006** | Proyek dengan `is_show = false` disembunyikan dari Visitor | Visitor | Wajib |
| **SRS-PROJ-007** | Author dapat menambah proyek baru via `ProjectFormModal` | Author | Wajib |
| **SRS-PROJ-008** | Author dapat mengedit dan menghapus proyek via `AuthorActions` overlay | Author | Wajib |
| **SRS-PROJ-009** | Form proyek memiliki field: judul, slug, deskripsi (EN + ID), gambar URL, link demo, link GitHub, stack (comma-separated), kategori, tipe, status tampil, status featured | Author | Wajib |
| **SRS-PROJ-010** | Slug proyek harus unik dan digunakan sebagai URL parameter halaman detail | Sistem | Wajib |

#### Detail Proyek

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-PROJ-011** | Halaman detail menampilkan: gambar hero, judul, deskripsi lengkap, stack teknologi, link demo, link GitHub | Visitor | Wajib |
| **SRS-PROJ-012** | Stack teknologi ditampilkan dalam bentuk ikon dari konstanta `STACKS` | Visitor | Wajib |
| **SRS-PROJ-013** | Jika proyek tidak ditemukan di database, sistem mengembalikan halaman 404 | Sistem | Wajib |
| **SRS-PROJ-014** | Metadata halaman detail (title, description, OG) digenerate secara dinamis berdasarkan data proyek | Sistem | Wajib |

---

### SRS-ACH — Halaman Pencapaian

**Route**: `/[locale]/achievements`  
**File**: `modules/achievements/`

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-ACH-001** | Sistem menampilkan daftar sertifikat dan badge dalam grid responsif | Visitor | Wajib |
| **SRS-ACH-002** | Sistem menyediakan filter berdasarkan tipe (Certificate, Badge, dll.) | Visitor | Wajib |
| **SRS-ACH-003** | Sistem menyediakan filter berdasarkan kategori (Frontend, Backend, dsb.) | Visitor | Wajib |
| **SRS-ACH-004** | Sistem menyediakan pencarian berdasarkan nama pencapaian | Visitor | Wajib |
| **SRS-ACH-005** | Hanya pencapaian dengan `is_show = true` yang ditampilkan ke Visitor | Visitor | Wajib |
| **SRS-ACH-006** | Klik kartu pencapaian membuka modal detail dengan gambar sertifikat dan info lengkap | Visitor | Wajib |
| **SRS-ACH-007** | Modal detail menampilkan: gambar, nama, organisasi penerbit, Credential ID, tipe, kategori, tanggal terbit, dan tombol ke URL kredensial | Visitor | Wajib |
| **SRS-ACH-008** | Modal detail responsif: info panel ditampilkan di bawah gambar pada mobile, di samping pada desktop | Visitor | Wajib |
| **SRS-ACH-009** | Nama dan organisasi pencapaian mendukung dua bahasa (EN + ID) | Visitor | Wajib |
| **SRS-ACH-010** | Author dapat menambah pencapaian baru via `AchievementFormModal` | Author | Wajib |
| **SRS-ACH-011** | Author dapat mengedit dan menghapus pencapaian via `AuthorActions` overlay | Author | Wajib |
| **SRS-ACH-012** | Form pencapaian memiliki field: nama (EN + ID), organisasi (EN + ID), Credential ID, tipe (EN + ID), kategori (EN + ID), URL kredensial, tanggal terbit, URL gambar, status tampil | Author | Wajib |

---

### SRS-DASH — Halaman Dashboard

**Route**: `/[locale]/dashboard`  
**File**: `modules/dashboard/`

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-DASH-001** | Sistem menampilkan statistik traffic website dari Umami Analytics (pageviews, unique visitors, bounce rate) | Visitor | Wajib |
| **SRS-DASH-002** | Sistem menampilkan grafik tren traffic dalam visualisasi Chart.js dengan filter periode | Visitor | Wajib |
| **SRS-DASH-003** | Sistem menampilkan kalender kontribusi GitHub dan ringkasan statistik kontribusi | Visitor | Wajib |
| **SRS-DASH-004** | Sistem menampilkan statistik aktivitas coding dari WakaTime (bahasa, waktu, proyek) | Visitor | Wajib |
| **SRS-DASH-005** | Sistem menampilkan statistik dan ranking Codewars (level, poin, bahasa) | Visitor | Wajib |
| **SRS-DASH-006** | Sistem menampilkan statistik dan leaderboard Monkeytype (WPM, akurasi) | Visitor | Wajib |
| **SRS-DASH-007** | Setiap seksi dashboard menampilkan skeleton loading saat data sedang diambil | Visitor | Wajib |
| **SRS-DASH-008** | Halaman dashboard tidak diindeks oleh mesin pencari (`robots: noindex`) | Sistem | Wajib |

---

### SRS-CHAT — Halaman Chat Room

**Route**: `/[locale]/chat`  
**File**: `modules/chat/`

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-CHAT-001** | Sistem menampilkan daftar pesan real-time dari semua pengguna terautentikasi | Visitor | Wajib |
| **SRS-CHAT-002** | Visitor yang belum login melihat prompt untuk login sebelum dapat mengirim pesan | Visitor | Wajib |
| **SRS-CHAT-003** | Authenticated User dapat mengirim pesan baru via form input | Auth User | Wajib |
| **SRS-CHAT-004** | Authenticated User dapat membalas pesan yang ada (threading/reply) | Auth User | Wajib |
| **SRS-CHAT-005** | Authenticated User dapat menghapus pesan milik sendiri | Auth User | Wajib |
| **SRS-CHAT-006** | Author dapat menghapus pesan siapa pun | Author | Wajib |
| **SRS-CHAT-007** | Pesan baru muncul secara real-time tanpa perlu refresh halaman (Supabase Realtime) | Auth User | Wajib |
| **SRS-CHAT-008** | Setiap pesan menampilkan: avatar pengguna, nama, timestamp, dan isi pesan | Visitor | Wajib |
| **SRS-CHAT-009** | Floating chat button tersedia di semua halaman (kecuali halaman Chat dan Links) | Visitor | Wajib |
| **SRS-CHAT-010** | Halaman chat tidak diindeks oleh mesin pencari (`robots: noindex`) | Sistem | Wajib |

---

### SRS-CONT — Halaman Kontak

**Route**: `/[locale]/contact`  
**File**: `modules/contact/`

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-CONT-001** | Sistem menampilkan daftar kartu media sosial/kontak: Gmail, Instagram, LinkedIn, GitHub, WhatsApp | Visitor | Wajib |
| **SRS-CONT-002** | Setiap kartu kontak memiliki tautan ke platform terkait yang terbuka di tab baru | Visitor | Wajib |
| **SRS-CONT-003** | Kartu WhatsApp menyertakan pesan pre-fill dalam URL | Visitor | Wajib |
| **SRS-CONT-004** | Tampilan kartu kontak responsif pada mobile (padding & layout menyesuaikan) | Visitor | Wajib |

---

### SRS-LINK — Halaman Links

**Route**: `/[locale]/links`  
**File**: `modules/links/`

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-LINK-001** | Sistem menampilkan halaman Linktree-style dengan profil, bio singkat, dan daftar tautan | Visitor | Wajib |
| **SRS-LINK-002** | Halaman Links menggunakan layout terpisah (tanpa sidebar) dengan background penuh | Sistem | Wajib |
| **SRS-LINK-003** | Header halaman Links menampilkan foto profil, nama, dan QR code website | Visitor | Wajib |
| **SRS-LINK-004** | Sistem menampilkan daftar tautan kustom dari database | Visitor | Wajib |
| **SRS-LINK-005** | Author dapat menambah tautan kustom baru via `LinkFormModal` | Author | Wajib |
| **SRS-LINK-006** | Author dapat mengedit dan menghapus tautan via `AuthorActions` overlay | Author | Wajib |
| **SRS-LINK-007** | Form tautan memiliki field: judul, URL, ikon, warna | Author | Wajib |

---

### SRS-AI — Fitur Smart Talk (AI)

**Route**: `/[locale]/smart-talk`  
**File**: `modules/smarttalk/`

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-AI-001** | Halaman Smart Talk hanya dapat diakses oleh Author (menu hanya muncul saat Author login) | Author | Wajib |
| **SRS-AI-002** | Sistem menampilkan antarmuka chatbot berbasis teks menggunakan Google Gemini API | Author | Tinggi |
| **SRS-AI-003** | Halaman Smart Talk tidak diindeks oleh mesin pencari (`robots: noindex`) | Sistem | Wajib |
| **SRS-AI-004** | *(Planned)* Integrasi dengan n8n untuk auto-generate artikel harian menggunakan AI | Author | Rendah |

---

### SRS-I18N — Internasionalisasi

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-I18N-001** | Sistem mendukung dua bahasa: Indonesia (`id`) dan English (`en`) | Visitor | Wajib |
| **SRS-I18N-002** | URL menggunakan prefix locale: `/id/[path]` dan `/en/[path]` | Sistem | Wajib |
| **SRS-I18N-003** | Semua teks UI tersedia dalam kedua bahasa via file `messages/id.json` dan `messages/en.json` | Sistem | Wajib |
| **SRS-I18N-004** | Konten dinamis yang memiliki nilai berbahasa (deskripsi, nama, dsb.) menyimpan field `_en` dan `_id` di database | Sistem | Wajib |
| **SRS-I18N-005** | Pengguna dapat mengganti bahasa melalui toggle di header/sidebar | Visitor | Wajib |
| **SRS-I18N-006** | Bahasa default adalah Indonesia (`id`) | Sistem | Wajib |

---

### SRS-SEO — SEO & Metadata

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-SEO-001** | Setiap halaman memiliki metadata `title` dan `description` yang unik | Sistem | Wajib |
| **SRS-SEO-002** | Halaman beranda menggunakan keywords yang menarget "freelancer indonesia, web developer indonesia" | Sistem | Wajib |
| **SRS-SEO-003** | Sistem menghasilkan `sitemap.xml` secara otomatis untuk semua halaman publik dengan kedua locale | Sistem | Wajib |
| **SRS-SEO-004** | Sistem menghasilkan `robots.txt` yang memblokir halaman private (`/dashboard`, `/chat`, `/smart-talk`, `/api/`) | Sistem | Wajib |
| **SRS-SEO-005** | Setiap halaman publik memiliki tag `hreflang` untuk versi EN dan ID | Sistem | Wajib |
| **SRS-SEO-006** | Sistem menyertakan JSON-LD structured data (Person + WebSite schema) di setiap halaman | Sistem | Wajib |
| **SRS-SEO-007** | Semua halaman publik memiliki Open Graph tags (title, description, image, locale) | Sistem | Wajib |
| **SRS-SEO-008** | Semua halaman publik memiliki Twitter Card metadata | Sistem | Wajib |
| **SRS-SEO-009** | Halaman private (dashboard, chat, smart-talk) memiliki `robots: noindex, nofollow` | Sistem | Wajib |
| **SRS-SEO-010** | Halaman beranda menyertakan canonical URL sesuai locale aktif | Sistem | Wajib |

---

### SRS-UI — Antarmuka Umum

| SRS ID | Requirement | Aktor | Prioritas |
|---|---|---|---|
| **SRS-UI-001** | Sistem mendukung tema terang (light) dan gelap (dark) yang dapat di-toggle | Visitor | Wajib |
| **SRS-UI-002** | Preferensi tema disimpan dan diingat antar sesi pengguna | Visitor | Wajib |
| **SRS-UI-003** | Semua halaman responsif di breakpoint: mobile (< 640px), tablet (640–1024px), desktop (> 1024px) | Visitor | Wajib |
| **SRS-UI-004** | Semua form modal (tambah/edit) responsif — input stack menjadi 1 kolom di mobile (< 640px) | Author | Wajib |
| **SRS-UI-005** | Sidebar navigasi tersembunyi pada mobile dan dapat dibuka via tombol hamburger | Visitor | Wajib |
| **SRS-UI-006** | Halaman menampilkan skeleton loading (bukan blank) saat data sedang diambil dari API | Visitor | Wajib |
| **SRS-UI-007** | Konfirmasi dialog ditampilkan sebelum setiap aksi hapus | Author | Wajib |
| **SRS-UI-008** | Progress bar halaman (NProgress) ditampilkan saat navigasi antar halaman | Visitor | Opsional |
| **SRS-UI-009** | Custom cursor animasi ditampilkan di desktop | Visitor | Opsional |
| **SRS-UI-010** | Semua kontras teks memenuhi standar keterbacaan di mode terang maupun gelap | Visitor | Wajib |
| **SRS-UI-011** | Tombol aksi Author (edit/hapus) muncul saat hover pada item terkait, tersembunyi saat tidak di-hover | Author | Wajib |
| **SRS-UI-012** | Animasi `AnimatePresence` dari Framer Motion digunakan untuk transisi masuk/keluar elemen | Visitor | Opsional |

---

## 4. Kebutuhan Non-Fungsional

### 4.1 Performa

| SRS ID | Requirement | Target |
|---|---|---|
| **SRS-NFR-001** | Waktu muat halaman pertama (LCP) kurang dari 2.5 detik | < 2.5s |
| **SRS-NFR-002** | Skor Lighthouse Performance minimal 80 pada halaman beranda | ≥ 80 |
| **SRS-NFR-003** | Gambar dioptimalkan menggunakan Next.js `<Image>` dengan lazy loading | — |
| **SRS-NFR-004** | API response untuk halaman beranda kurang dari 500ms | < 500ms |

### 4.2 Keamanan

| SRS ID | Requirement |
|---|---|
| **SRS-NFR-005** | Semua endpoint API mutasi memverifikasi sesi sebelum memproses request |
| **SRS-NFR-006** | Environment variables sensitif tidak diekspos ke client-side (tanpa prefix `NEXT_PUBLIC_`) |
| **SRS-NFR-007** | Input pengguna pada form divalidasi di sisi client (React Hook Form) dan sisi server |
| **SRS-NFR-008** | Supabase RLS (Row Level Security) diaktifkan pada semua tabel database |

### 4.3 Ketersediaan

| SRS ID | Requirement |
|---|---|
| **SRS-NFR-009** | Website di-deploy di Vercel dengan uptime ≥ 99.9% |
| **SRS-NFR-010** | Database Supabase menggunakan plan dengan backup otomatis |

### 4.4 Maintainability

| SRS ID | Requirement |
|---|---|
| **SRS-NFR-011** | Kode menggunakan TypeScript dengan type safety penuh |
| **SRS-NFR-012** | Setiap module fitur diorganisasi dalam folder terpisah di `/modules/` |
| **SRS-NFR-013** | Komponen UI yang reusable diletakkan di `/common/components/` |
| **SRS-NFR-014** | Semua konten yang dapat diedit disimpan di database, tidak di hardcode dalam kode |

---

## 5. Antarmuka Eksternal

### 5.1 API Eksternal

| API | Endpoint | Kegunaan | SRS Ref |
|---|---|---|---|
| **Google OAuth** | `accounts.google.com` | Login pengguna | SRS-AUTH-001 |
| **GitHub OAuth** | `github.com` | Login pengguna | SRS-AUTH-002 |
| **Supabase** | `[project].supabase.co` | Database + Realtime | SRS-CHAT-007 |
| **Google Gemini** | `generativelanguage.googleapis.com` | AI chatbot | SRS-AI-002 |
| **GitHub API** | `api.github.com` | Kontribusi stats | SRS-DASH-003 |
| **WakaTime API** | `wakatime.com/api/v1` | Coding activity | SRS-DASH-004 |
| **Codewars API** | `www.codewars.com/api/v1` | Coding stats | SRS-DASH-005 |
| **Monkeytype API** | `monkeytype.com/api/v0.1` | Typing stats | SRS-DASH-006 |
| **Umami API** | `cloud.umami.is` | Traffic analytics | SRS-DASH-001 |
| **Nodemailer/SMTP** | SMTP server | Email notifikasi | SRS-CONT-001 |

### 5.2 Tabel Database (Supabase)

| Tabel | Digunakan Oleh | SRS Ref |
|---|---|---|
| `projects` | Projects module | SRS-PROJ-001 s/d SRS-PROJ-014 |
| `achievements` | Achievements module | SRS-ACH-001 s/d SRS-ACH-012 |
| `skills` | Home module | SRS-HOME-007 s/d SRS-HOME-019 |
| `careers` | About module | SRS-ABOUT-004 s/d SRS-ABOUT-009 |
| `education` | About module | SRS-ABOUT-010 s/d SRS-ABOUT-013 |
| `messages` | Chat module | SRS-CHAT-001 s/d SRS-CHAT-009 |
| `links` | Links module | SRS-LINK-004 s/d SRS-LINK-007 |
| `bio` | Home + About module | SRS-HOME-003, SRS-ABOUT-001 |

---

## 6. Batasan Sistem

| Batasan | Keterangan |
|---|---|
| **Satu Author** | Sistem hanya mendukung satu pemilik/author yang ditentukan via environment variable |
| **Bahasa** | Hanya mendukung dua bahasa: Indonesia dan English |
| **OAuth Provider** | Login hanya tersedia via Google dan GitHub (tidak ada registrasi manual) |
| **Real-time** | Fitur real-time (chat) bergantung pada koneksi aktif ke Supabase WebSocket |
| **AI** | Smart Talk bergantung pada ketersediaan Google Gemini API dan kuota penggunaan |
| **Dashboard** | Data dashboard bergantung pada ketersediaan dan quota API eksternal masing-masing |
| **Gambar** | Gambar proyek dan pencapaian disimpan di layanan CDN eksternal (URL), bukan di server |

---

*Dokumen ini dibuat otomatis berdasarkan analisis kode sumber pada 2026-05-26.*  
*Untuk update, sesuaikan dokumen ini setiap kali ada perubahan fitur besar.*
