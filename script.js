'use strict';

/* ================================================================
   A Gift Made With What I Have — script.js
   Semua logika interaksi, scene, animasi.
   ================================================================ */

/* ──────────────────────────────────────────────────────────────────
   PERSONALISASI — ubah CONFIG ini sesuai kebutuhanmu
   ────────────────────────────────────────────────────────────────── */
const CONFIG = {
  recipientName: "YASSHIFA IQLIMA AZZAHRA, S.Pd", // nama lengkap (untuk surat)
  recipientShort: "Yasshifa",                        // nama panggilan (untuk sapaan)
  senderName: "Hasbi Baihaqi",                   // namamu
  graduationTitle: "Sarjana Pendidikan",               // gelar lengkap
  graduationAbbr: "S.Pd",                            // singkatan gelar
  photoPath: "assets/photo.jpg",
  musicPath: "assets/music.mp4"                 // ← file asli adalah MP4
};

/* ──────────────────────────────────────────────────────────────────
   ISI SURAT (Scene Amplop)
   {short}=nama panggil, {name}=nama lengkap, {abbr}=gelar singkat, {from}=pengirim
   ────────────────────────────────────────────────────────────────── */
const LETTER = [
  'Untuk {short},',
  'Aku sebenarnya ingin memberikanmu sesuatu.',
  'Sesuatu yang bisa kamu pegang.',
  'Sesuatu yang bisa kamu simpan.',
  'Sesuatu yang bisa membuat hari kelulusanmu terasa sedikit lebih spesial.',
  'Tapi aku harus jujur...',
  '',
  'Saat ini aku belum mampu.',
  '',
  'Dan itu membuatku ingin meminta maaf.',
  'Bukan karena aku tidak ingin,',
  'tapi karena keadaan memang belum mengizinkan.',
  '',
  'Tapi aku percaya,',
  'bahwa yang tulus tidak selalu yang paling mahal.',
  '',
  '— {from}'
];

/* ──────────────────────────────────────────────────────────────────
   DEFINISI SCENE
   k: 'timed' | 'scroll' | 'tap' | 'env' | 'gift'
   Penanda baris: "# " = judul besar, "^ " = teks kecil emas, "" = jeda
   rep: baris sebelumnya diganti saat indeks ≤ rep
   conf: indeks baris yang memicu confetti
   auto: scene otomatis lanjut tanpa tombol
   dim: nilai overlay gelap (0–1)
   photo: 'frame' | 'big' | 'bg' | 'none'
   low: tombol di bawah layar
   cls: class tambahan pada scene
   btn: label tombol
   start: aktifkan musik saat tombol diklik
   to: nomor scene tujuan (override next)
   wait: delay awal sebelum teks muncul (ms)
   ────────────────────────────────────────────────────────────────── */
const SCENES = [
  // SCENE 0 — Loading (auto)
  {
    k: 'timed', rep: 99, auto: 1,
    lines: ['Preparing something for you...', 'Almost there...']
  },

  // SCENE 1 — Opening
  {
    k: 'timed', rep: 99, btn: '✦  Buka Hadiahku', start: 1, wait: 1400,
    lines: [
      'Aku tahu aku terlambat...',
      'Tapi aku tetap ingin mengucapkannya.'
    ]
  },

  // SCENE 2 — Graduation Reveal (foto muncul)
  {
    k: 'timed', photo: 'frame', low: 1, wait: 2000, conf: 2,
    lines: [
      '^ Untukmu, {short}.',
      '# YOU DID IT.',
      'Selamat atas gelar {abbr}-mu. 🎓',
      'Aku bangga melihatmu sampai di titik ini.'
    ]
  },

  // SCENE 3 — Interactive Photo (tap 3×)
  {
    k: 'tap', photo: 'frame', low: 1
  },

  // SCENE 4 — Digital Envelope
  {
    k: 'env'
  },

  // SCENE 5 — Tentang Hadiah (scroll)
  {
    k: 'scroll', dim: .4,
    lines: [
      'Ada banyak hal yang sedang aku perjuangkan dalam hidupku.',
      'Termasuk keadaan finansialku.',
      'Aku sebenarnya ingin memberikan hadiah yang lebih indah.',
      'Hadiah yang bisa kamu buka dengan tanganmu.',
      'Tapi untuk sekarang, aku belum bisa.',
      '# Jadi maaf...',
      'Hadiahku kali ini mungkin sangat sederhana.'
    ]
  },

  // SCENE 6 — Hadiah yang Sebenarnya (scroll)
  {
    k: 'scroll',
    lines: [
      'Tapi aku masih punya sesuatu.',
      'Aku punya waktu.',
      'Aku punya ingatan.',
      'Aku punya doa.',
      'Aku punya rasa bangga.',
      'Dan aku punya keinginan untuk membuat sesuatu yang hanya bisa kuberikan kepadamu.',
      'Jadi aku membuat ini.',
      'Sebuah tempat kecil untuk menyimpan satu ucapan yang mungkin terlambat...'
    ]
  },

  // SCENE 7 — Congratulations (timed, rep)
  {
    k: 'timed', rep: 8, conf: 9, wait: 1400,
    lines: [
      'Selamat...',
      '',
      'atas perjuanganmu...',
      '',
      'atas semua lelahmu...',
      '',
      'atas semua yang berhasil kamu lewati...',
      '',
      '# SELAMAT ATAS GELAR S.Pd-MU',
      '🎓',
      'Kamu berhasil.'
    ]
  },

  // SCENE 8 — Permintaan Maaf (scroll)
  {
    k: 'scroll',
    lines: [
      '# Aku juga ingin meminta maaf.',
      'Maaf karena aku menjadi orang yang terlambat mengucapkannya.',
      'Aku tahu mungkin sudah banyak orang yang lebih dulu memberikan ucapan.',
      'Mungkin sudah ada bunga.',
      'Mungkin sudah ada hadiah.',
      'Mungkin sudah ada kejutan.',
      'Sedangkan aku...',
      'datang hanya dengan sebuah website sederhana.',
      'Tapi keterlambatan ini bukan berarti aku tidak peduli.',
      'Aku hanya ingin tetap mengucapkannya dengan caraku sendiri.'
    ]
  },

  // SCENE 9 — Pesan Paling Personal (scroll, handwriting)
  {
    k: 'scroll', cls: 'letter',
    lines: [
      'Aku tidak punya banyak untuk kuberikan.',
      'Tapi aku punya waktu.',
      'Aku punya pikiran.',
      'Aku punya usaha.',
      'Dan aku punya perasaan yang ingin kusampaikan melalui halaman-halaman kecil ini.',
      'Mungkin website ini tidak mahal.',
      'Tidak bisa kamu pajang di kamar.',
      'Tidak bisa kamu simpan di dalam kotak hadiah.',
      'Tapi aku membuatnya dengan apa yang aku punya.',
      '# Dengan sepenuh hati.'
    ]
  },

  // SCENE 10 — Bittersweet (scroll)
  {
    k: 'scroll',
    lines: [
      '# Untuk perjalananmu setelah ini...',
      'Aku tidak tahu bagaimana kehidupan kita akan berjalan setelah hari ini.',
      'Mungkin semuanya akan tetap sama.',
      'Mungkin semuanya akan berubah.',
      'Mungkin suatu hari nanti kita akan melihat masa ini hanya sebagai sebuah kenangan.',
      'Tapi apapun yang terjadi...',
      'Aku berharap kamu tetap berjalan menuju semua hal yang kamu impikan.',
      'Jangan pernah merasa pencapaianmu hari ini kecil.',
      'Kamu berhasil mendapatkan sesuatu yang dulu mungkin hanya menjadi sebuah impian.',
      '# Hari ini kamu benar-benar menjadi {title}.'
    ]
  },

  // SCENE 11 — Digital Gift Box
  {
    k: 'gift'
  },

  // SCENE 12 — Final Message (foto sebagai background)
  {
    k: 'timed', photo: 'bg', rep: 99, wait: 2500,
    lines: [
      '# Aku bangga padamu.',
      'Selamat, {short}. 🎓',
      'Semoga hidup membawamu ke tempat-tempat yang lebih indah daripada yang pernah kamu bayangkan.',
      '',
      'Semoga semua lelahmu selama ini terbayarkan.',
      '',
      'Dan semoga kamu selalu menjadi seseorang yang bisa kamu banggakan sendiri.'
    ]
  },

  // SCENE 13 — Ending
  {
    k: 'timed', rep: 4, dim: .6, btn: '↺  Mulai Lagi', to: 1, wait: 2000,
    lines: [
      'Kalau suatu hari kamu membuka website ini lagi...',
      '',
      'semoga kamu mengingat satu hal.',
      '',
      '# Kamu pernah berjuang.',
      '',
      '# Dan kamu berhasil.',
      '',
      '— Dari seseorang yang bangga padamu. I LOVE U',
      '^ {from}'
    ]
  }
];

/* ──────────────────────────────────────────────────────────────────
   UTILITAS
   ────────────────────────────────────────────────────────────────── */
const $ = s => document.querySelector(s);
const app = $('#app');
const root = $('#scenes');
const frame = $('#frame');
const photo = $('#photo');
const loader = $('#loader');
const loaderText = $('#loader-text');
const progress = $('#progress');

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep = ms => new Promise(r => setTimeout(r, reduce ? Math.min(ms, 280) : ms));

/** Ganti placeholder teks */
const fill = s => s
  .replace(/\{name\}/g, CONFIG.recipientName)
  .replace(/\{short\}/g, CONFIG.recipientShort)
  .replace(/\{title\}/g, CONFIG.graduationTitle)
  .replace(/\{abbr\}/g, CONFIG.graduationAbbr)
  .replace(/\{from\}/g, CONFIG.senderName);

/** Buat elemen baris teks (belum tampil) */
function mk(t) {
  t = fill(t);
  const m = /^([#^]) /.exec(t);
  const p = document.createElement('p');
  p.className = 'l' + (m ? (m[1] === '#' ? ' h' : ' s') : '');
  p.textContent = m ? t.slice(2) : t;
  return p;
}

/** Tampilkan baris; rep=true → baris lama memudar dulu */
async function say(el, t, rep) {
  if (rep) {
    const old = [...el.querySelectorAll('.l')];
    old.forEach(x => x.classList.remove('in'));
    if (old.length) { await sleep(1300); old.forEach(x => x.remove()); }
  }
  const p = mk(t);
  el.append(p);
  void p.offsetWidth;
  p.classList.add('in');
  return p;
}

/** Buat tombol aksi */
function cont(el, label, fn, io) {
  const b = document.createElement('button');
  b.className = 'btn' + (label.includes('Mulai') ? ' ghost' : '');
  b.textContent = label;
  b.onclick = () => { b.disabled = true; fn(); };
  el.append(b);
  if (io) io.observe(b);
  else { void b.offsetWidth; b.classList.add('in'); }
  return b;
}

/** Efek mengetik karakter per karakter */
async function typeIn(p, t) {
  if (reduce) { p.textContent = t; return; }
  for (const ch of t) {
    p.textContent += ch;
    await sleep(/[.,…\-—]/.test(ch) ? 200 : 36);
  }
}

/* ──────────────────────────────────────────────────────────────────
   MUSIK — mendukung MP4 (audio track) dan MP3
   File Backsound.mp4 adalah MP4 container → gunakan musicPath mp4
   ────────────────────────────────────────────────────────────────── */
const bgm = $('#bgm');
const mute = $('#mute');
let noMusic = false;
let musicStarted = false;

/**
 * Setup sumber audio dengan fallback.
 * Browser modern bisa memainkan audio track dari file .mp4
 */
function setupAudio() {
  // Kosongkan source lama
  bgm.removeAttribute('src');
  bgm.innerHTML = '';

  const path = CONFIG.musicPath;
  const ext = path.split('.').pop().toLowerCase();

  if (ext === 'mp4' || ext === 'mp4a') {
    // MP4 container: gunakan <source type="video/mp4">
    const src = document.createElement('source');
    src.src = path;
    src.type = 'video/mp4';
    bgm.append(src);
    // Fallback: coba juga sebagai audio/mp4
    const src2 = document.createElement('source');
    src2.src = path;
    src2.type = 'audio/mp4';
    bgm.append(src2);
  } else {
    bgm.src = path;
  }

  bgm.volume = 0;
  bgm.load();

  bgm.onerror = () => {
    if (!musicStarted) { noMusic = true; mute.hidden = true; }
  };
}
setupAudio();

function fade(targetVol, durationMs) {
  const startVol = bgm.volume;
  const startTime = performance.now();
  (function step(now) {
    const k = Math.min((now - startTime) / durationMs, 1);
    bgm.volume = startVol + (targetVol - startVol) * k;
    if (k < 1) requestAnimationFrame(step);
  })(startTime);
}

function startMusic() {
  if (noMusic) return;
  musicStarted = true;
  mute.hidden = false;

  // Di mobile (HP), fungsi play() HARUS dipanggil secara sinkron langsung dari event click.
  // Menunggu event 'canplay' akan membuat browser memblokir audio karena dianggap bukan dari interaksi user.
  bgm.play()
    .then(() => {
      fade(.55, 3500);
    })
    .catch(err => {
      console.warn('Audio play failed:', err.message);
      // Coba unmute (kadang browser butuh di-unmute paksa jika autoplay policy ketat)
      bgm.muted = false;
      noMusic = true;
      mute.hidden = true;
    });
}

mute.onclick = () => {
  bgm.muted = !bgm.muted;
  mute.textContent = bgm.muted ? '🔇' : '🔊';
};

/* ──────────────────────────────────────────────────────────────────
   PARTIKEL AMBIEN + CONFETTI (canvas tunggal)
   ────────────────────────────────────────────────────────────────── */
const cv = $('#fx');
const cx = cv.getContext('2d');
const COLORS = ['#d8bf8a', '#f1ece2', '#9fb0d4', '#e8d4a0'];
const rnd = Math.random;

let W, H, particles = [], confetti = [];

const fitCanvas = () => {
  W = cv.width = innerWidth;
  H = cv.height = innerHeight;
};
fitCanvas();
addEventListener('resize', fitCanvas);

// Partikel ambien (bintang naik perlahan)
if (!reduce) {
  for (let i = 0; i < 38; i++) {
    particles.push({
      x: rnd() * innerWidth,
      y: rnd() * innerHeight,
      r: rnd() * 1.7 + .35,
      v: rnd() * .28 + .07,
      a: rnd() * .55 + .12
    });
  }
}

/** Picu confetti / spark dari tengah */
function pop(n, spark) {
  if (reduce) return;
  for (let i = 0; i < n; i++) {
    const ang = rnd() * Math.PI * 2;
    const spd = rnd() * 4.5 + 1;
    confetti.push({
      x: spark ? W / 2 : rnd() * W,
      y: spark ? H / 2 : -10,
      vx: spark ? Math.cos(ang) * spd : rnd() - .5,
      vy: spark ? Math.sin(ang) * spd : rnd() * 1.3 + .6,
      s: rnd() * 5.5 + 3,
      c: COLORS[i % COLORS.length],
      l: 1,
      sp: spark,
      rot: rnd() * 6.28
    });
  }
}

// Loop animasi canvas
(function loop() {
  cx.clearRect(0, 0, W, H);

  // Partikel ambien
  cx.fillStyle = '#d8bf8a';
  particles.forEach(p => {
    p.y -= p.v;
    if (p.y < -4) p.y = H + 4;
    cx.globalAlpha = p.a;
    cx.beginPath();
    cx.arc(p.x, p.y, p.r, 0, 6.28);
    cx.fill();
  });

  // Confetti / spark
  confetti = confetti.filter(p => p.l > 0);
  confetti.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += .05;
    p.l -= p.sp ? .013 : .0016;
    if (p.sp) { p.vx *= .97; p.vy *= .97; }
    else p.vx += Math.sin(p.rot) * .03;

    cx.globalAlpha = Math.max(p.l, 0) * .85;
    cx.fillStyle = p.c;
    if (p.sp) {
      cx.beginPath();
      cx.arc(p.x, p.y, p.s / 2, 0, 6.28);
      cx.fill();
    } else {
      cx.save();
      cx.translate(p.x, p.y);
      cx.rotate(p.rot);
      cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s * .5);
      cx.restore();
    }
  });

  requestAnimationFrame(loop);
})();

/* ──────────────────────────────────────────────────────────────────
   PARALLAX RINGAN — pointer (desktop) + gyroscope (HP)
   ────────────────────────────────────────────────────────────────── */
if (!reduce) {
  // Desktop: ikuti kursor
  addEventListener('pointermove', e => {
    if (e.pointerType === 'mouse') {
      app.style.setProperty('--px', (e.clientX / innerWidth - .5).toFixed(3));
      app.style.setProperty('--py', (e.clientY / innerHeight - .5).toFixed(3));
    }
  });

  // Mobile: ikuti kemiringan HP (gyroscope)
  if (typeof DeviceOrientationEvent !== 'undefined') {
    // iOS 13+ perlu permission
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      // Aktifkan saat ada interaksi pertama (sudah ada via tombol "Buka Hadiahku")
      document.addEventListener('click', function requestGyro() {
        DeviceOrientationEvent.requestPermission()
          .then(state => {
            if (state === 'granted') listenGyro();
          })
          .catch(() => { });
        document.removeEventListener('click', requestGyro);
      }, { once: true });
    } else {
      listenGyro();
    }
  }

  function listenGyro() {
    addEventListener('deviceorientation', e => {
      const x = Math.max(-1, Math.min(1, (e.gamma || 0) / 28));
      const y = Math.max(-1, Math.min(1, ((e.beta || 0) - 45) / 28));
      app.style.setProperty('--px', x.toFixed(3));
      app.style.setProperty('--py', y.toFixed(3));
    });
  }
}

/* ──────────────────────────────────────────────────────────────────
   PROGRESS DOTS
   ────────────────────────────────────────────────────────────────── */
SCENES.forEach(() => {
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.setAttribute('aria-hidden', 'true');
  progress.append(dot);
});

function updateProgress(i) {
  progress.hidden = i <= 1;
  [...progress.children].forEach((d, idx) => {
    d.classList.toggle('active', idx === i);
  });
}

/* ──────────────────────────────────────────────────────────────────
   HANDLER TIAP JENIS SCENE
   ────────────────────────────────────────────────────────────────── */
const Handler = {

  /* Teks muncul bertahap sesuai waktu baca */
  async timed(s, el, next) {
    await sleep(s.wait || 800);
    for (let i = 0; i < s.lines.length; i++) {
      const t = s.lines[i];
      if (!t) { await sleep(1600); continue; }
      await say(el, t, i <= (s.rep ?? -1));
      if (i === s.conf) pop(48);
      await sleep(1600 + t.length * 48);
    }
    if (s.auto) return next();
    cont(el, s.btn || 'lanjutkan ›', () => {
      if (s.start) startMusic();
      s.to != null ? go(s.to) : next();
    });
  },

  /* Teks muncul saat digulir */
  scroll(s, el, next) {
    el.classList.add('sc');
    if (s.cls) el.classList.add(s.cls);

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { root: el, threshold: .3, rootMargin: '0px 0px -6% 0px' });

    // Scroll hint
    const hint = document.createElement('div');
    hint.className = 'scroll-hint';
    hint.innerHTML = '<span>scroll</span>';
    hint.setAttribute('aria-hidden', 'true');
    el.append(hint);

    s.lines.forEach(t => {
      const p = mk(t);
      el.append(p);
      io.observe(p);
    });
    cont(el, 'lanjutkan ›', next, io);
  },

  /* Foto interaktif: tap 3 kali */
  async tap(s, el, next) {
    if (frame.hidden) return next();
    await sleep(1200);
    await say(el, '^ Sentuh fotonya...');
    app.classList.add('tap');

    const waitTap = () => new Promise(r => {
      // Dukung touch dan click
      const handler = () => r();
      frame.addEventListener('click', handler, { once: true });
      frame.addEventListener('touchstart', handler, { once: true, passive: true });
    });

    // Tap 1
    await waitTap();
    frame.classList.add('z');
    await say(el, 'Di balik foto ini...', true);

    // Tap 2
    await waitTap();
    frame.classList.add('g');
    await say(el, 'ada seseorang yang sudah melewati begitu banyak hal...', true);

    // Tap 3
    await waitTap();
    frame.classList.remove('g', 'z');
    await say(el, 'untuk sampai ke titik ini.', true);
    app.classList.remove('tap');

    await sleep(3200);
    await say(el, 'Dan aku ingin kamu tahu...', true);
    await sleep(3000);
    await say(el, '# Aku benar-benar bangga padamu.', true);
    await sleep(2800);
    cont(el, 'lanjutkan ›', next);
  },

  /* Amplop digital → surat dengan efek mengetik */
  async env(s, el, next) {
    await sleep(1000);
    await say(el, 'Ada surat yang belum sempat aku berikan.');

    el.insertAdjacentHTML('beforeend',
      '<button class="env" aria-label="Buka surat">' +
      '<i class="bk"></i><i class="pp"></i><i class="fr"></i><i class="fl"></i>' +
      '</button>'
    );
    const envBtn = el.querySelector('.env');
    await sleep(1000);
    await say(el, '^ Tap to open');

    await new Promise(r => {
      envBtn.addEventListener('click', r, { once: true });
      envBtn.addEventListener('touchstart', r, { once: true, passive: true });
    });

    envBtn.classList.add('open');
    await sleep(1800);
    el.classList.add('rd');

    const paper = document.createElement('div');
    paper.className = 'paper';
    el.append(paper);
    void paper.offsetWidth;
    paper.classList.add('in');
    await sleep(1200);

    for (const t of LETTER) {
      if (!t) { await sleep(1700); continue; }
      const p = document.createElement('p');
      paper.append(p);
      await typeIn(p, fill(t));
      paper.scrollTop = paper.scrollHeight;
      await sleep(750);
    }
    cont(paper, 'lanjutkan ›', next);
  },

  /* Kotak hadiah digital */
  async gift(s, el, next) {
    await sleep(900);
    await say(el, 'Aku memang belum bisa memberimu hadiah yang mahal.');
    await sleep(4000);
    await say(el, 'Tapi mungkin ini adalah sesuatu yang hanya bisa kuberikan kepadamu.');
    await sleep(2000);

    el.insertAdjacentHTML('beforeend',
      '<button class="gift" aria-label="Buka hadiah">' +
      '<i class="bx"></i><i class="ld"></i>' +
      '</button>'
    );
    const giftBtn = el.querySelector('.gift');
    let opened = false;

    const openGift = async () => {
      if (opened) return;
      opened = true;

      giftBtn.classList.add('open');
      pop(70, true);
      fade(.92, 7000);

      el.querySelectorAll('.l, .btn').forEach(x => x.classList.remove('in'));
      await sleep(1400);
      el.querySelectorAll('.l, .btn').forEach(x => x.remove());

      app.dataset.photo = 'big';
      el.classList.add('low');
      await sleep(7000);
      cont(el, 'lanjutkan ›', next);
    };

    giftBtn.addEventListener('click', openGift, { once: true });
    giftBtn.addEventListener('touchstart', openGift, { once: true, passive: true });
    cont(el, 'Buka hadiah terakhir', openGift);
  }
};

/* ──────────────────────────────────────────────────────────────────
   NAVIGASI ANTAR SCENE
   ────────────────────────────────────────────────────────────────── */
let currentScene = -1;

async function go(i) {
  const prev = root.children[currentScene];
  if (prev) {
    prev.classList.remove('on');
    await sleep(1400);
  }

  currentScene = i;
  const s = SCENES[i];
  const el = root.children[i];

  el.innerHTML = '';
  el.className = 'scene' + (s.low ? ' low' : '');
  el.scrollTop = 0;

  app.dataset.photo = s.photo || 'none';
  app.classList.remove('tap');
  frame.classList.remove('z', 'g');
  app.style.setProperty('--dim', s.dim || 0);

  updateProgress(i);

  void el.offsetWidth;
  el.classList.add('on');

  Handler[s.k](s, el, () => go(i + 1));
}

/* ──────────────────────────────────────────────────────────────────
   LOADING SCREEN
   ────────────────────────────────────────────────────────────────── */
async function runLoader() {
  await sleep(1400);
  loaderText.textContent = 'Almost there...';
  await sleep(1100);
  loader.classList.add('out');
  await sleep(1300);
  loader.remove();
  go(0);
}

/* ──────────────────────────────────────────────────────────────────
   INISIALISASI
   ────────────────────────────────────────────────────────────────── */
photo.src = CONFIG.photoPath;
$('#bgp').style.backgroundImage = `url("${CONFIG.photoPath}")`;
photo.onerror = () => { frame.hidden = true; };

// Buat elemen section untuk setiap scene
SCENES.forEach(() => root.append(document.createElement('section')));

// Mulai
runLoader();
