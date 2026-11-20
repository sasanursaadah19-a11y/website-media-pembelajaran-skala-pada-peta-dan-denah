/* ==========================================================
   Petualangan Skala: Peta & Denah - Script
   Isi file ini (berurutan):
     1. Helper
     2. Data materi (5 tab)
     3. Tab materi
     4. Alat: konversi satuan & simulasi skala
     5. Suara (efek + musik latar sintetis)
     6. Quiz (10 soal)
     7. Animasi: konfeti, muncul saat scroll, ganti background
   ========================================================== */


/* ===== 1. HELPER ===== */

// Pecahan bertingkat, contoh: F(1, 'P') -> 1 di atas P
const F = (n, d) => `<span class="fr"><span>${n}</span><span>${d}</span></span>`;

// Format angka ala Indonesia (1.000.000)
const fmt = (n) => Number(n).toLocaleString('id-ID', { maximumFractionDigits: 6 });

// Singkatan document.querySelector
const $ = (s) => document.querySelector(s);


/* ===== 2. DATA MATERI =====
   Tiap item: [judul tab, isi HTML]. Mau tambah materi? Tambah item baru di sini. */

const MATERI = [
    ["📍 Pengertian",`<h3>Pengertian Skala</h3>
        <p><b>Skala</b> adalah perbandingan antara ukuran pada gambar (peta, denah, atau sketsa) dengan ukuran sebenarnya di lapangan/bumi.</p>
        <ul><li>Bentuk penulisan skala: <b>1 : P</b> atau ${F(1,'P')} (misalnya 1 : 100 atau 1 : 500.000).</li>
        <li>Makna: jika skala peta 1 : 100.000, artinya <b>1 cm</b> pada peta mewakili <b>100.000 cm</b> (= <b>1 km</b>) pada jarak sebenarnya.</li></ul>
        <div class="svgbox"><svg viewBox="0 0 520 190" font-family="Nunito" font-weight="800" font-size="14"><rect x="4" y="4" width="512" height="182" rx="14" fill="#d3f9d8"/><path d="M40 150c60-60 120 10 190-40s120-20 170-60" stroke="#74c0fc" stroke-width="10" fill="none"/><circle cx="90" cy="70" r="9" fill="#e8590c"/><text x="75" y="52" fill="#1d2b3a">Kota A</text><circle cx="290" cy="70" r="9" fill="#e8590c"/><text x="275" y="52" fill="#1d2b3a">Kota B</text><line x1="90" y1="70" x2="290" y2="70" stroke="#1d2b3a" stroke-dasharray="6 4"/><text x="150" y="92" fill="#1d2b3a">jarak pada peta</text><rect x="330" y="120" width="150" height="46" rx="8" fill="#fff"/><rect x="340" y="132" width="40" height="10" fill="#1d2b3a"/><text x="340" y="158" fill="#1d2b3a" font-size="12">1 cm = 1 km</text><text x="390" y="141" fill="#1d2b3a" font-size="12">skala 1 : 100.000</text></svg></div>
        <div class="tip">💡 Skala = perbandingan. Angka kiri (1) untuk gambar, angka kanan (P) untuk kenyataan.</div>`],
    ["🧮 Rumus",`<h3>Rumus Utama Skala</h3>
        <div class="formula">Skala (S) = ${F('Jarak pada Peta (JP)','Jarak Sebenarnya (JS)')}</div>
        <p>Dari rumus utama dapat diturunkan 3 rumus praktis:</p>
        <div class="formula">1. Mencari Skala: S = ${F('JP','JS')}<br>2. Mencari Jarak pada Peta: JP = S × JS<br>3. Mencari Jarak Sebenarnya: JS = ${F('JP','S')}</div>
        <div class="svgbox"><svg viewBox="0 0 300 170" font-family="Fredoka" font-size="22" text-anchor="middle"><polygon points="150,8 285,160 15,160" fill="#fff4e6" stroke="#e8590c" stroke-width="4"/><line x1="55" y1="100" x2="245" y2="100" stroke="#e8590c" stroke-width="3"/><line x1="150" y1="100" x2="150" y2="160" stroke="#e8590c" stroke-width="3"/><text x="150" y="85" fill="#1d2b3a">JP</text><text x="95" y="140" fill="#1d2b3a">S</text><text x="205" y="140" fill="#1d2b3a">JS</text></svg></div>
        <p>Segitiga rumus: tutup yang dicari. Tutup JP → S × JS. Tutup S → JP ÷ JS. Tutup JS → JP ÷ S.</p>
        <div class="tip">⚠️ Penting: ubah satuan dulu (biasanya ke cm) sebelum menghitung. 1 km = 100.000 cm; 1 m = 100 cm.</div>`],
    ["📏 Jenis Skala",`<h3>Jenis-Jenis Skala Peta</h3>
        <div class="grid"><div><b>Skala Angka (Numerik)</b><p>Ditunjukkan dengan angka perbandingan, contoh 1 : 50.000.</p></div>
        <div><b>Skala Garis (Grafis)</b><p>Berbentuk garis/batang yang dibagi beberapa bagian dengan angka km/m. Contoh: 0 – 1 km – 2 km – 3 km (tiap ruas 1 cm mewakili 1 km).</p>
        <div class="svgbox"><svg viewBox="0 0 260 50" font-family="Nunito" font-weight="800" font-size="13"><rect x="10" y="10" width="60" height="12" fill="#1d2b3a"/><rect x="70" y="10" width="60" height="12" fill="#fff" stroke="#1d2b3a"/><rect x="130" y="10" width="60" height="12" fill="#1d2b3a"/><g fill="#1d2b3a"><text x="10" y="42">0</text><text x="62" y="42">1 km</text><text x="122" y="42">2 km</text><text x="182" y="42">3 km</text></g></svg></div></div>
        <div><b>Skala Verbal (Kalimat)</b><p>Dinyatakan dengan kata-kata. Contoh: “1 inch to 5 miles” (1 inci mewakili 5 mil).</p></div></div>`],
    ["✏️ Contoh Soal",`<h3>Contoh Soal dan Pembahasan</h3>
        <h4>Contoh 1: Mencari Jarak Sebenarnya</h4>
        <p><b>Soal:</b> Sebuah peta memiliki skala 1 : 200.000. Jarak Kota A dan Kota B pada peta adalah 5 cm. Berapa kilometer jarak sebenarnya?</p>
        <div class="formula">JS = ${F('JP','S')} = ${F('5 cm',F(1,'200.000'))} = 5 × 200.000 = 1.000.000 cm</div>
        <p>Ubah ke kilometer: 1.000.000 cm = 10 km. <b>Jadi, jarak sebenarnya adalah 10 km.</b></p>
        <h4>Contoh 2: Ukuran pada Denah</h4>
        <p><b>Soal:</b> Sebuah kamar tidur berukuran 4 m × 3 m. Jika digambar pada denah berskala 1 : 100, berapa ukurannya pada denah?</p>
        <p>Ubah ke cm: panjang = 4 m = 400 cm; lebar = 3 m = 300 cm.</p>
        <div class="formula">Panjang pada denah = ${F(1,100)} × 400 cm = 4 cm<br>Lebar pada denah = ${F(1,100)} × 300 cm = 3 cm</div>
        <p><b>Jadi, ukuran di denah adalah 4 cm × 3 cm.</b></p>
        <div class="svgbox"><svg viewBox="0 0 420 170" font-family="Nunito" font-weight="800" font-size="13" fill="#1d2b3a"><rect x="20" y="20" width="160" height="120" fill="#e7f5ff" stroke="#1971c2" stroke-width="4"/><rect x="150" y="136" width="30" height="8" fill="#fff"/><text x="60" y="85">Kamar tidur</text><text x="75" y="160">4 m</text><text x="184" y="85">3 m</text><text x="215" y="85" font-size="22">➜</text><rect x="260" y="40" width="120" height="90" fill="#fff4e6" stroke="#e8590c" stroke-width="3"/><text x="290" y="90">Denah 1:100</text><text x="305" y="152">4 cm</text><text x="384" y="90">3 cm</text></svg></div>`],
    ["🗂️ Klasifikasi",`<h3>Klasifikasi Skala Peta</h3><p>Berdasarkan besar kecilnya skala, peta dibagi menjadi:</p>
        <table><tr><th>Jenis Peta</th><th>Skala</th><th>Untuk</th></tr>
        <tr><td>Peta Kadaster</td><td>1 : 100 s.d. 1 : 5.000</td><td>Sertifikat tanah</td></tr>
        <tr><td>Peta Skala Besar</td><td>1 : 5.000 s.d. 1 : 250.000</td><td>Kelurahan/kecamatan</td></tr>
        <tr><td>Peta Skala Sedang</td><td>1 : 250.000 s.d. 1 : 500.000</td><td>Kabupaten/provinsi</td></tr>
        <tr><td>Peta Skala Kecil</td><td>1 : 500.000 s.d. 1 : 1.000.000</td><td>Negara</td></tr>
        <tr><td>Peta Geografi</td><td>lebih kecil dari 1 : 1.000.000 (P &gt; 1.000.000)</td><td>Benua/dunia</td></tr></table>
        <div class="tip">💡 Makin besar angka P, makin kecil skalanya, dan makin luas daerah yang tergambar.</div>`]
];



/* ===== 3. TAB MATERI ===== */

const tabsEl = $('#tabs');
const paneEl = $('#pane');

MATERI.forEach(([judul, isi]) => {
    const btn = document.createElement('button');
    btn.textContent = judul;
    btn.onclick = () => {
        [...tabsEl.children].forEach((x) => x.classList.remove('on'));
        btn.classList.add('on');
        paneEl.innerHTML = isi;
        // restart animasi "pop" setiap pindah tab
        paneEl.classList.remove('in');
        void paneEl.offsetWidth;
        paneEl.classList.add('in');
    };
    tabsEl.appendChild(btn);
});
tabsEl.children[0].click(); // buka tab pertama


/* ===== 4. ALAT ===== */

// --- Konversi satuan panjang (km / m / cm -> cm) ---
function hitungKonversi() {
    const nilai = +$('#cv').value || 0;
    const satuan = +$('#cu').value;
    const cm = nilai * satuan;
    $('#cvo').innerHTML = `${fmt(nilai)} ${$('#cu').selectedOptions[0].text} = <b>${fmt(cm)} cm</b>`;
}
$('#cv').oninput = $('#cu').onchange = hitungKonversi;
hitungKonversi();

// --- Simulasi skala: JS = JP x P ---
function simulasiSkala() {
    const p = +$('#sp').value;   // penyebut skala (1 : P)
    const j = +$('#jp').value;   // jarak pada peta (cm)
    $('#jpv').textContent = fmt(j);
    $('#ruler').setAttribute('width', 380 * j / 20); // 20 cm = lebar penuh
    const cm = j * p;
    $('#so').innerHTML =
        `JS = JP ÷ S = ${j} × ${fmt(p)} = ${fmt(cm)} cm<br>` +
        `= <b>${fmt(cm / 100000)} km</b> (${fmt(cm / 100)} m)`;
}
$('#sp').onchange = $('#jp').oninput = simulasiSkala;
simulasiSkala();


/* ===== 5. SUARA (Web Audio API, tanpa file mp3) ===== */

let audioCtx;
let musikNyala = false;
let musikTimer;

// AudioContext dibuat saat pertama dipakai (browser butuh interaksi user dulu)
const getAudio = () => audioCtx || (audioCtx = new (window.AudioContext || window.webkitAudioContext)());

// Bunyi satu nada: frekuensi, jeda mulai, durasi, bentuk gelombang, volume
function tone(freq, mulai, durasi, tipe = 'sine', vol = 0.15) {
    const c = getAudio();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = tipe;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, c.currentTime + mulai);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + mulai + durasi);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(c.currentTime + mulai);
    osc.stop(c.currentTime + mulai + durasi);
}

const suaraBenar = () => {
    try { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.25, 'triangle', 0.2)); } catch (e) {}
};
const suaraSalah = () => {
    try {
        tone(200, 0, 0.25, 'sawtooth', 0.12);
        tone(150, 0.22, 0.4, 'sawtooth', 0.12);
    } catch (e) {}
};

// Musik latar: melodi 16 nada yang berulang
const MELODI = [523, 587, 659, 784, 659, 587, 523, 392, 440, 523, 587, 659, 587, 523, 440, 392];
let noNada = 0;

function mainkanNada() {
    tone(MELODI[noNada % 16], 0, 0.4, 'triangle', 0.05);
    if (noNada % 4 == 0) tone(MELODI[noNada % 16] / 2, 0, 0.9, 'sine', 0.05); // bass tiap 4 nada
    noNada++;
}

// Tombol musik di navbar
$('#mus').onclick = function () {
    musikNyala = !musikNyala;
    this.setAttribute('aria-pressed', musikNyala);
    this.textContent = '🎵 Musik: ' + (musikNyala ? 'nyala' : 'mati');
    try { getAudio().resume(); } catch (e) {}
    clearInterval(musikTimer);
    if (musikNyala) musikTimer = setInterval(mainkanNada, 420);
};


/* ===== 6. QUIZ =====
   Tiap soal: [pertanyaan, [pilihan A-D], index jawaban benar (0-3), pembahasan]. */

const SOAL = [
    ["Peta Jawa Barat berskala 1 : 500.000. Jarak Kota A ke Kota B pada peta 4 cm. Berapa kilometer jarak sebenarnya?",["2 km","20 km","200 km","2.000 km"],1,`JS = JP ÷ S = 4 × 500.000 = 2.000.000 cm<br>1 km = 100.000 cm, maka 2.000.000 ÷ 100.000 = <b>20 km</b>.`],
    ["Jarak sebenarnya dua kota 12 km. Pada peta jaraknya 6 cm. Berapa skala petanya?",["1 : 200.000","1 : 20.000","1 : 2.000.000","1 : 120.000"],0,`Ubah dulu: 12 km = 1.200.000 cm.<br>S = ${F('JP','JS')} = ${F('6','1.200.000')} = ${F(1,'200.000')}, jadi skalanya <b>1 : 200.000</b>.`],
    ["Sebidang tanah panjangnya 50 m digambar dengan skala 1 : 1.000. Berapa panjang pada gambar?",["50 cm","0,5 cm","5 cm","500 cm"],2,`50 m = 5.000 cm.<br>JP = S × JS = ${F(1,'1.000')} × 5.000 = <b>5 cm</b>.`],
    ["Pada denah rumah berskala 1 : 200, panjang ruang tamu 8 cm. Berapa meter panjang sebenarnya?",["16 m","160 m","1,6 m","8 m"],0,`JS = JP ÷ S = 8 × 200 = 1.600 cm.<br>1 m = 100 cm, maka 1.600 ÷ 100 = <b>16 m</b>.`],
    ["Peta berskala 1 : 250.000. Jarak Kota A–B di peta 3,2 cm. Berapa km jarak sebenarnya?",["80 km","0,8 km","800 km","8 km"],3,`JS = 3,2 × 250.000 = 800.000 cm.<br>800.000 ÷ 100.000 = <b>8 km</b>.`],
    ["Jarak sebenarnya rumah ke sekolah 2,5 km. Pada peta berskala 1 : 50.000, berapa cm jaraknya?",["5 cm","50 cm","0,5 cm","2,5 cm"],0,`2,5 km = 2,5 × 100.000 = 250.000 cm.<br>JP = S × JS = ${F(1,'50.000')} × 250.000 = <b>5 cm</b>.`],
    ["Kamar berukuran 5 m × 4 m digambar pada denah berskala 1 : 50. Ukuran pada denah adalah …",["5 cm × 4 cm","10 cm × 8 cm","50 cm × 40 cm","1 cm × 0,8 cm"],1,`5 m = 500 cm dan 4 m = 400 cm.<br>Panjang = ${F(1,50)} × 500 = 10 cm; lebar = ${F(1,50)} × 400 = 8 cm.<br>Jadi <b>10 cm × 8 cm</b>.`],
    ["Peta kecamatan memakai skala 1 : 100.000. Menurut klasifikasinya, peta ini termasuk …",["Peta Kadaster","Peta Skala Besar","Peta Skala Kecil","Peta Geografi"],1,`Peta Skala Besar berkisar 1 : 5.000 sampai 1 : 250.000. Karena 5.000 ≤ 100.000 ≤ 250.000, peta ini termasuk <b>Peta Skala Besar</b>.`],
    ["Sebuah peta menulis “1 cm mewakili 5 km”. Jika ditulis sebagai skala angka menjadi …",["1 : 5","1 : 50.000","1 : 500.000","1 : 5.000.000"],2,`5 km = 5 × 100.000 = 500.000 cm.<br>Jadi 1 cm mewakili 500.000 cm, skalanya <b>1 : 500.000</b>.`],
    ["Jarak kota P ke kota Q sebenarnya 120 km. Pada peta jaraknya 4 cm. Skala peta tersebut adalah …",["1 : 300.000","1 : 3.000.000","1 : 30.000.000","1 : 480.000"],1,`120 km = 12.000.000 cm.<br>S = ${F(4,'12.000.000')} = ${F(1,'3.000.000')}, jadi <b>1 : 3.000.000</b>.`]
];


let peserta = { nama: '', kelas: '' };
let noSoal = 0;
let skor = 0;
let salah = [];

// Kategori nilai
function kategori(nilai) {
    if (nilai >= 90) return ['🏆 Sangat Baik', 'Kamu sudah menguasai skala!'];
    if (nilai >= 75) return ['🌟 Baik', 'Hampir sempurna, pelajari lagi bagian yang salah.'];
    if (nilai >= 60) return ['👍 Cukup', 'Ulangi materi dan rumus, lalu coba lagi.'];
    return ['📚 Perlu Belajar Lagi', 'Tenang, baca ulang materi pelan-pelan dan latihan lagi.'];
}

// Layar awal: isi nama & kelas
function mulaiQuiz() {
    $('#qbox').innerHTML = `
        <h2>📝 Quiz Skala</h2>
        <p>10 soal cerita. Isi identitas dulu ya!</p>
        <label for="nm">Nama</label>
        <input id="nm" placeholder="Nama lengkap">
        <label for="kl">Kelas</label>
        <select id="kl">
            <option value="">-- pilih kelas --</option>
            <option>VII</option>
            <option>VIII</option>
            <option>IX</option>
        </select>
        <p id="er" style="color:var(--bad);font-weight:800"></p>
        <table>
            <tr><th>Nilai</th><th>Kategori</th></tr>
            <tr><td>90 – 100</td><td>Sangat Baik</td></tr>
            <tr><td>75 – 89</td><td>Baik</td></tr>
            <tr><td>60 – 74</td><td>Cukup</td></tr>
            <tr><td>0 – 59</td><td>Perlu Belajar Lagi</td></tr>
        </table>
        <br>
        <button class="btn" id="go">Mulai Quiz</button>`;

    $('#go').onclick = () => {
        const nama = $('#nm').value.trim();
        const kelas = $('#kl').value;
        if (!nama || !kelas) {
            $('#er').textContent = 'Nama dan kelas wajib diisi.';
            return;
        }
        peserta = { nama, kelas };
        noSoal = 0;
        skor = 0;
        salah = [];
        try { getAudio().resume(); } catch (e) {}
        tampilSoal();
    };
}

// Tampilkan satu soal
function tampilSoal() {
    const q = SOAL[noSoal];
    $('#qbox').innerHTML = `
        <small>${peserta.nama} · Kelas ${peserta.kelas}</small>
        <div class="bar"><i style="width:${noSoal * 10}%"></i></div>
        <h3>Soal ${noSoal + 1} dari ${SOAL.length}</h3>
        <p>${q[0]}</p>
        <div id="os"></div>
        <div id="fb"></div>`;

    q[1].forEach((teks, i) => {
        const btn = document.createElement('button');
        btn.className = 'opt';
        btn.innerHTML =
            '<span class="lt">' + String.fromCharCode(65 + i) + '</span>' +
            '<span>' + teks + '</span>';
        btn.onclick = () => pilihJawaban(i);
        $('#os').appendChild(btn);
    });
}

// Cek jawaban yang dipilih
function pilihJawaban(i) {
    const q = SOAL[noSoal];
    const opsi = [...document.querySelectorAll('.opt')];
    opsi.forEach((b) => (b.disabled = true));
    opsi[q[2]].classList.add('ok');   // tandai jawaban benar
    const benar = i == q[2];

    if (benar) {
        skor++;
        suaraBenar();
        konfeti(18);
    } else {
        opsi[i].classList.add('no');
        salah.push(noSoal + 1);
        suaraSalah();
    }

    $('#fb').innerHTML = `
        <div class="fb ${benar ? 'ok' : 'no'}">
            <b>${benar ? '✅ Benar! Hebat!' : '❌ Belum tepat. Ini cara yang benar:'}</b><br>${q[3]}
        </div>
        <br>
        <button class="btn" id="nx">${noSoal == SOAL.length - 1 ? 'Lihat Hasil' : 'Soal Berikutnya ➜'}</button>`;

    $('#nx').onclick = () => {
        noSoal++;
        noSoal < SOAL.length ? tampilSoal() : tampilHasil();
    };
}

// Layar hasil akhir
function tampilHasil() {
    const nilai = skor * 10;
    const [judul, pesan] = kategori(nilai);
    if (nilai >= 60) suaraBenar();
    if (nilai >= 75) konfeti(60);

    $('#qbox').innerHTML = `
        <h2>Hasil ${peserta.nama} (Kelas ${peserta.kelas})</h2>
        <div class="ring" style="--p:${nilai}"><b>${nilai}</b></div>
        <h3>${judul}</h3>
        <p>${pesan}</p>
        <p>Benar ${skor} dari ${SOAL.length} soal.${salah.length ? ' Soal yang salah: no. ' + salah.join(', ') + '.' : ' Semua benar!'}</p>
        <button class="btn" id="re">Ulangi Quiz</button>
        <a href="#materi"><button class="btn alt">Baca Materi</button></a>`;

    $('#re').onclick = mulaiQuiz;
}

mulaiQuiz();


/* ===== 7. ANIMASI ===== */

// Konfeti: n potongan kertas jatuh dari atas layar
function konfeti(n) {
    const warna = ['#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c', '#4dabf7', '#9775fa'];
    for (let i = 0; i < n; i++) {
        const el = document.createElement('i');
        el.className = 'cf';
        el.style.cssText =
            'left:' + Math.random() * 100 + 'vw;' +
            'background:' + warna[i % 6] + ';' +
            '--dx:' + (Math.random() - 0.5) * 220 + 'px;' +
            'animation-delay:' + Math.random() * 0.3 + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2400);
    }
}

// Kartu muncul pelan saat di-scroll
const revealObs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('vis');
    }),
    { threshold: 0.08 }
);
document.querySelectorAll('.card').forEach((c) => {
    c.classList.add('rv');
    revealObs.observe(c);
});

// Background foto ganti sesuai section yang sedang terlihat (data-bg="0/1/2")
const bgs = [...document.querySelectorAll('#bg div')];
const bgObs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
            bgs.forEach((b, i) => b.classList.toggle('on', i == +e.target.dataset.bg));
        }
    }),
    { threshold: 0.35 }
);
document.querySelectorAll('section[data-bg]').forEach((s) => bgObs.observe(s));
