# Petualangan Skala: Peta & Denah v2

Website belajar Matematika SMP: materi skala, konversi satuan, simulasi, dan quiz 10 soal
(dengan efek suara, musik latar, dan konfeti).

## Struktur
```
skala-peta-denah-v2/
├── index.html
├── css/style.css
├── js/script.js
└── assets/
    ├── bg-1.jpg      # background bagian Hero
    ├── bg-2.jpg      # background bagian Materi & Simulasi
    └── bg-3.jpg      # background bagian Quiz
```

## Cara jalanin
Buka folder ini di VSCode -> klik kanan `index.html` -> **Open with Live Server**.
(Bisa juga langsung double-click `index.html`.)
Klik tombol **Musik** di navbar untuk menyalakan musik latar (browser tidak
mengizinkan suara otomatis bunyi sebelum ada klik). Musik dan efek suara dibuat
lewat Web Audio API, jadi tidak ada file mp3.

Butuh internet untuk memuat font Google (Fredoka & Nunito). Tanpa internet,
website tetap jalan dengan font bawaan.

## Yang gampang diubah
- Tambah / ubah materi: array `MATERI` di `js/script.js` (bagian 2).
- Tambah / ubah soal quiz: array `SOAL` di `js/script.js` (bagian 6).
  Format: `[pertanyaan, [pilihan A-D], index jawaban benar (0-3), pembahasan]`.
  Kalau jumlah soal bukan 10, ubah juga pengali `noSoal * 10` dan `skor * 10`.
- Kecepatan musik: angka `420` (milidetik) di fungsi tombol `#mus` pada `js/script.js`.
- Nada musik: array `MELODI` di `js/script.js`.
- Ganti foto background: timpa `assets/bg-1.jpg`, `bg-2.jpg`, `bg-3.jpg` (nama file sama).
- Warna tema: variabel `--pri`, `--sec`, `--g1`, `--g2` di bagian atas `css/style.css`.
