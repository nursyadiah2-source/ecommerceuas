# 👶 NuraBaby - E-Commerce Website

## 📖 Deskripsi

**NuraBaby** adalah website E-Commerce sederhana yang menyediakan berbagai kebutuhan bayi seperti pakaian, perlengkapan makan, mainan, dan perlengkapan perawatan bayi. Website ini dikembangkan menggunakan **HTML, CSS, dan JavaScript** tanpa framework maupun database. Seluruh data disimpan menggunakan **Local Storage** sehingga tetap tersedia meskipun halaman di-refresh.

---
### 👤 IDENTITAS MAHASISWA
* **Nama:** Nur Syadiah
* **NIM :** 209250263
* **Mata Kuliah :** Komputer Aplikasi IT-II (KAIT II)
* **Program Studi :** Administrasi Bisnis (ABI 8)
* **Semester :** Genap 2025/2026
--- 
## 🔗 LINK AKSES UTAMA
* **Link Website (Costumer) :** [Klik disini] (https://nursyadiah2-source.github.io/ecommerceuas/login.html) untuk mengakses toko utama pelanggan.
* **Link Website (Admin) :** [Klik disini] (https://nursyadiah2-source.github.io/ecommerceuas/admin/login_admin.html) untuk masuk ke panel pengelolaan admin.
* **Link Repository GitHub :** [Klik disini] (https://github.com/nursyadiah2-source/ecommerceuas) untuk melihat *source code* repositori.

---
# 📊 Business Overview

### 🎯 Value Proposition

* Tampilan modern dan responsif.
* Proses belanja mudah dan cepat.
* Dashboard admin untuk mengelola produk.
* Penyimpanan data menggunakan Local Storage.

### 👨‍👩‍👧 Target Market

* Orang tua dengan bayi atau balita.
* Calon orang tua.
* Keluarga yang membutuhkan perlengkapan bayi.

### 🛍️ Produk yang Dijual

* Pakaian Bayi
* Mainan Edukatif
* Perlengkapan Makan
* Perlengkapan Mandi
* Popok & Baby Care

---

# ✨ Fitur Website

### Customer

* Login & Register
* Melihat dan mencari produk
* Menambahkan produk ke keranjang
* Checkout
* Melihat riwayat pesanan

### Admin

* Login Admin
* Dashboard
* Tambah, edit, dan hapus produk
* Melihat data pesanan

---

# 💻 Teknologi

| Teknologi     | Fungsi             |
| ------------- | ------------------ |
| HTML5         | Struktur halaman   |
| CSS3          | Tampilan antarmuka |
| JavaScript    | Logika aplikasi    |
| Local Storage | Penyimpanan data   |

---

# ⚙️ Penjelasan Teknis

Website menggunakan **Local Storage** sebagai media penyimpanan data, meliputi:

* Data pengguna
* Data produk
* Keranjang belanja
* Data pesanan
* Session login

### Alur Singkat

**Customer**

1. Login atau Register.
2. Memilih produk.
3. Menambahkan ke keranjang.
4. Checkout.
5. Pesanan tersimpan.

**Admin**

1. Login.
2. Mengelola data produk.
3. Perubahan otomatis tersimpan di Local Storage dan langsung ditampilkan pada website.

---

# 🖥️ Dokumentasi Tampilan Desktop

## 🏠 Home

![Home Desktop] <img width="1366" height="768" alt="Screenshot (73)" src="https://github.com/user-attachments/assets/c4630dac-afbc-4cfc-bc6f-91b626b33d04" />


Menampilkan banner, kategori produk, dan daftar produk unggulan.

---

## 🛍️ Halaman Produk

![Produk Desktop] <img width="1366" height="768" alt="Screenshot (75)" src="https://github.com/user-attachments/assets/f333572f-ca23-4f03-b1f7-31d1dc78df22" />



Menampilkan seluruh produk lengkap dengan fitur pencarian dan filter kategori.

---

# 📱 Dokumentasi Tampilan Mobile

## 🏠 Home Mobile

<p align="center">
  <img src="https://github.com/user-attachments/assets/42182051-967d-4d9c-b642-549d9f4db495" width="220"/>
  <img src="https://github.com/user-attachments/assets/bf778345-a02b-4b9f-bc70-17b335370af4" width="220"/>
</p>

Tampilan responsif yang memudahkan pengguna berbelanja melalui smartphone.

---

## 👨‍💼 Dashboard Admin Mobile

<p align="center">
  <img src="https://github.com/user-attachments/assets/80c3af30-8e94-489d-8e19-aff30a0b3b43" width="220"/>
</p>


Dashboard admin tetap responsif sehingga pengelolaan produk dapat dilakukan melalui perangkat mobile.

---

# 🚀 Cara Menjalankan

1. Clone atau download repository.
2. Buka folder project.
3. Jalankan file **index.html** menggunakan browser.
4. Login sebagai Customer atau Admin untuk mengakses fitur sesuai hak akses.

---
# 📝 Struktur Proyek 
ecommerceuas-main/
├── index.html                # Halaman Beranda
├── produk.html                # Katalog produk
├── detail_produk.html         # Detail produk & ulasan
├── keranjang.html              # Keranjang belanja
├── checkout.html               # Checkout & simulasi QRIS
├── checkout_success.html       # Invoice digital
├── pesanan.html                 # Riwayat pesanan
├── login.html / register.html   # Autentikasi pelanggan
├── profile.html                 # Pengaturan & privasi akun
├── script.js                    # Logika utama sisi customer
├── style.css                    # Stylesheet sisi customer
│
├── images/
│   ├── kategori/                # Ikon kategori produk
│   ├── logo/                    # Logo Nura Baby Care
│   ├── produk/                  # Foto produk
│   └── qris.png                 # Gambar QRIS simulasi
│
└── admin/
    ├── login_admin.html         # Login admin
    ├── dashboard.html           # Dashboard statistik
    ├── produk.html               # Kelola produk
    ├── tambah_produk.html        # Tambah produk
    ├── edit_produk.html          # Edit produk
    ├── stok.html                 # Manajemen stok
    ├── pesanan.html                # Kelola pesanan
    ├── script_admin.js            # Logika sisi admin
    ├── sidebar_mobile_fix.js      # Perbaikan sidebar mobile
    ├── style_admin.css            # Stylesheet admin
    └── images/produk/              # Salinan aset produk

---
# 📌 Kesimpulan

NuraBaby merupakan website E-Commerce sederhana yang mengimplementasikan proses jual beli online menggunakan HTML, CSS, JavaScript, dan Local Storage. Website menyediakan fitur lengkap untuk Customer dan Admin dengan tampilan yang responsif sehingga dapat digunakan dengan nyaman pada perangkat desktop maupun mobile.

---
