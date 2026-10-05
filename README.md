# 🎓 A Gift Made With What I Have

Website personal interaktif — hadiah digital untuk seseorang yang baru mendapatkan gelar S1.

---

## 📁 Struktur Folder

```
/
├── index.html          ← Struktur halaman utama
├── style.css           ← Desain & animasi
├── script.js           ← Logika & interaksi (CONFIG ada di sini)
├── assets/
│   ├── photo.jpg       ← Foto yang kamu sediakan
│   └── music.mp3       ← Musik instrumen (opsional)
└── README.md
```

---

## ✏️ Cara Personalisasi

Buka file **`script.js`**, cari bagian paling atas:

```javascript
const CONFIG = {
  recipientName:  "NAMA DIA",      // ← ganti nama pacarmu
  senderName:     "NAMA SAYA",     // ← ganti namamu
  graduationTitle:"Sarjana",       // ← ganti gelar jika perlu
  photoPath:      "assets/photo.jpg",
  musicPath:      "assets/music.mp3"
};
```

---

## 🖼️ Mengganti Foto

1. Siapkan foto, rename menjadi **`photo.jpg`**
2. Masukkan ke folder **`assets/`**

---

## 🎵 Mengganti Musik

1. Siapkan file audio, rename menjadi **`music.mp3`**
2. Masukkan ke folder **`assets/`**

> Jika file musik tidak tersedia, website tetap berjalan sempurna tanpa suara.

---

## 🚀 Cara Menjalankan Secara Lokal

Double-click file `index.html` — tidak perlu install apapun.

Jika foto/musik tidak muncul, gunakan Live Server di VS Code atau:

```bash
python -m http.server 8080
```

Lalu buka `http://localhost:8080`

---

## 🌐 Hosting via GitHub Pages (GRATIS)

### Langkah 1 — Buat Repository

1. Daftar/login di [github.com](https://github.com)
2. Klik **"New repository"**
3. Beri nama, pilih **Public**, klik **"Create repository"**

### Langkah 2 — Upload File

**Cara mudah (tanpa Git):**

1. Klik **"uploading an existing file"** di halaman repository
2. Drag & drop semua file: `index.html`, `style.css`, `script.js`, dan folder `assets/`
3. Klik **"Commit changes"**

**Cara via Git:**

```bash
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

### Langkah 3 — Aktifkan GitHub Pages

1. Buka tab **Settings** di repository
2. Klik **Pages** di sidebar kiri
3. Source: branch `main`, folder `/ (root)`
4. Klik **Save**

### Langkah 4 — Dapatkan Link

```
https://USERNAME.github.io/NAMA-REPO/
```

Link ini yang dikirim ke dia! 🎁 (Deploy 1–3 menit setelah Save)

---

## ⚠️ Tips Penting

| Hal | Penjelasan |
|-----|-----------|
| **Ukuran file** | GitHub Pages batas 100MB. Kompres foto & musik jika perlu |
| **Format musik** | Gunakan `.mp3` untuk kompatibilitas terbaik |
| **Nama file** | Huruf besar/kecil nama file harus sama persis dengan CONFIG |
| **Cache browser** | Jika ada perubahan tidak muncul, tekan `Ctrl+Shift+R` |
| **Mobile** | Website sudah dioptimasi smartphone. Test di HP sebelum mengirim |

---

*Dibuat dengan ❤️ — A Gift Made With What I Have*
