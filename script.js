/* script.js — mobile-first, clean style + Comments */
(() => {
  'use strict';

  // ---------- Helpers ----------
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };

  // ---------- 1) Соц.кнопкаларды суреттің астына орналастыру ----------
  function placeSocialUnderAvatar() {
    const img = $('.container > img');
    const social = $('.social-box');
    if (img && social && img.nextElementSibling !== social) {
      img.insertAdjacentElement('afterend', social);
    }
  }

  // ---------- 2) Reveal on scroll + stagger ----------
  function setupReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = $('.container');
    if (!container) return;

    const step = Number(container.getAttribute('data-stagger')) || 120;
    const targets = $$('.reveal', container);
    targets.forEach((el, i) => el.style.setProperty('--d', `${i * step}ms`));

    if (prefersReduced) {
      targets.forEach(el => el.classList.add('show'));
      return;
    }

    const io = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    targets.forEach(el => io.observe(el));
  }

  // ---------- 3) Language switch (KK/EN) ----------
  const STRINGS = {
    kk: {
      siteTitle: 'Portfolio',
      name: 'Садыжан Еламан',
      lblDob: 'Туған күні:',
      valDob: '29.09.2011',
      lblBirthplace: 'Туған жері:',
      valBirthplace: 'Қазақстан, Жетісу облысы, Үшарал ауылы',
      secInterests: 'Қызығушылықтарым',
      int1: '💻 IT саласында бағдарлама кодтау',
      int2: '🎮 ПК Roblox ойнау',
      secDream: 'Арманым',
      dream1: '🌟 Өз орнымды тауып, жақсы IT компанияда істеу',
      dream2: '📈 IELTS 8.0-ден жоғары бал жинау',
      dream3: '🎓 Азия мен Еуропаның топ IT университеттеріне түсу',
      secProjects: 'Жобаларым',
      proj1: '🌐 Vernox 2.0 атты сайт',
      proj2: '🤖 Telegram бот',
      proj3: '🖊️ 3D Картинка',
      lblWhatsApp: 'WhatsApp',
      lblInstagram: 'Instagram',
      lblTelegram: '@elaamaan0',
      comments: {
        name: 'Атың',
        contact: 'Байланыс (тел/Telegram)',
        message: 'Пікірің',
        send: 'Жіберу',
        sent: 'Пікіріңіз жіберілді! Рақмет 🙌',
        error: 'Қате кетті. Кейінірек көріңіз.',
        rate: 'Жіберу тым жиі. Біраздан соң байқап көріңіз.',
        empty: 'Әзірге пікір жоқ.'
      }
    },
    en: {
      siteTitle: 'Portfolio',
      name: 'Sadyzhan Elaman',
      lblDob: 'Date of birth:',
      valDob: '29.09.2011',
      lblBirthplace: 'Birthplace:',
      valBirthplace: 'Kazakhstan, Zhetisu Region, Usharal village',
      secInterests: 'Interests',
      int1: '💻 Programming in IT',
      int2: '🎮 Playing Roblox on PC',
      secDream: 'Goals',
      dream1: '🌟 Find my path and work at a great IT company',
      dream2: '📈 Score 8.0+ on IELTS',
      dream3: '🎓 Enter top IT universities in Asia and Europe',
      secProjects: 'Projects',
      proj1: '🌐 Website "Vernox 2.0"',
      proj2: '🤖 Telegram bot',
      proj3: '🖊️ 3D Image',
      lblWhatsApp: 'WhatsApp',
      lblInstagram: 'Instagram',
      lblTelegram: '@elaamaan0',
      comments: {
        name: 'Your name',
        contact: 'Contact (phone/Telegram)',
        message: 'Message',
        send: 'Send',
        sent: 'Thanks! Your comment was sent 🙌',
        error: 'Something went wrong. Try later.',
        rate: 'Too many attempts. Please wait a bit.',
        empty: 'No comments yet.'
      }
    }
  };

  function applyLang(lang) {
    const D = STRINGS[lang] || STRINGS.kk;

    document.title = D.siteTitle;
    setText('name', D.name);

    setText('lblDob', D.lblDob);
    setText('valDob', D.valDob);
    setText('lblBirthplace', D.lblBirthplace);
    setText('valBirthplace', D.valBirthplace);

    setText('secInterests', D.secInterests);
    setText('int1', D.int1);
    setText('int2', D.int2);

    setText('secDream', D.secDream);
    setText('dream1', D.dream1);
    setText('dream2', D.dream2);
    setText('dream3', D.dream3);

    setText('secProjects', D.secProjects);
    setText('proj1', D.proj1);
    setText('proj2', D.proj2);
    setText('proj3', D.proj3);

    setText('lblWhatsApp', D.lblWhatsApp);
    setText('lblInstagram', D.lblInstagram);
    setText('lblTelegram', D.lblTelegram);

    // Пікір батырмасының мәтінін де аударамыз
    const btn = $('.btn-send');
    if (btn) btn.textContent = D.comments.send;

    // Батырма күйлері
    $$('.lang-btn').forEach(btn => {
      const pressed = btn.dataset.lang === lang;
      btn.setAttribute('aria-pressed', String(pressed));
    });

    localStorage.setItem('lang', lang);
  }

  function setupLangSwitcher() {
    const saved = localStorage.getItem('lang') || 'kk';
    applyLang(saved);
    $$('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });
  }

  // ---------- 4) WhatsApp префилл ----------
  function setupWhatsAppLink() {
    const wa = document.getElementById('wa-link');
    if (!wa) return;

    wa.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = wa.dataset.waPhone || '77770545697';
      const text  = wa.dataset.waText  || '';
      const url   = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener');
    });
  }

  // ---------- 5) Comments (Firebase REST) ----------
  const DB_BASE = 'https://shadowkurox-a74dd-default-rtdb.europe-west1.firebasedatabase.app';
  const COMMENTS_URL = `${DB_BASE}/comments.json`;

  const sanitize = (s) =>
    String(s ?? '')
      .replace(/[<>&"'`]/g, (c) => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;','`':'&#96;'}[c]));

  const visitorId = (() => {
    const key = 'visitorId';
    let id = localStorage.getItem(key);
    if (!id) { id = Math.random().toString(36).slice(2); localStorage.setItem(key, id); }
    return id;
  })();

  const RATE_SECONDS = 45; // 45 сек ішінде 1 рет қана
  function canSubmit() {
    const last = Number(localStorage.getItem('lastSubmitTs') || 0);
    const now = Date.now();
    return (now - last) / 1000 > RATE_SECONDS;
  }
  function markSubmitted() { localStorage.setItem('lastSubmitTs', String(Date.now())); }

  async function fetchComments() {
    try {
      const res = await fetch(COMMENTS_URL);
      const data = await res.json();
      // data — {key: {name, message, createdAt, ...}, ...}
      const list = Object.entries(data || {}).map(([id, v]) => ({ id, ...v }));
      // Соңғы жазылғандар жоғарыда
      list.sort((a,b) => (b.createdAt||0) - (a.createdAt||0));
      renderComments(list);
    } catch (e) {
      // console.log('comments read error', e);
      renderComments([]);
    }
  }

  function renderComments(items) {
    const wrap = $('#commentsList');
    if (!wrap) return;
    wrap.innerHTML = '';

    const lang = localStorage.getItem('lang') || 'kk';
    const emptyText = STRINGS[lang].comments.empty;

    if (!items.length) {
      const p = document.createElement('p');
      p.className = 'muted';
      p.textContent = emptyText;
      wrap.appendChild(p);
      return;
    }

    for (const c of items.slice(0, 30)) { // максимум 30 пікір
      const card = document.createElement('div');
      card.className = 'comment-card';

      const dt = c.createdAt ? new Date(c.createdAt) : new Date();
      const time = dt.toLocaleString();

      card.innerHTML = `
        <div class="comment-head">
          <strong class="comment-name">${sanitize(c.name || 'Қонақ')}</strong>
          <span class="comment-time">${sanitize(time)}</span>
        </div>
        <p class="comment-text">${sanitize(c.message || '')}</p>
      `;

      wrap.appendChild(card);
    }
  }

  async function submitComment(e) {
    e.preventDefault();
    const lang = localStorage.getItem('lang') || 'kk';
    const T = STRINGS[lang].comments;

    const status = $('#formStatus');
    const btn = $('.btn-send');

    const form = $('#commentForm');
    const hp = $('#website'); // honeypot
    if (!form || !canSubmit()) {
      if (status) status.textContent = T.rate;
      return;
    }
    if (hp && hp.value.trim() !== '') {
      // спам — үндемей шығамыз
      form.reset();
      return;
    }

    const name = $('#cName')?.value.trim();
    const contact = $('#cContact')?.value.trim();
    const message = $('#cMsg')?.value.trim();

    if (!name || !message) {
      status.textContent = 'Атыңды және пікіріңді толтыр!';
      return;
    }

    btn.disabled = true;
    status.textContent = 'Жіберілуде...';

    try {
      const payload = {
        name, contact, message,
        createdAt: Date.now(),
        ua: navigator.userAgent.slice(0,160),
        visitorId
      };

      const res = await fetch(COMMENTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('post failed');

      // Сәтті — форма тазалау, тізімді жаңарту
      form.reset();
      markSubmitted();
      status.textContent = T.sent;
      btn.disabled = false;
      fetchComments();
    } catch (err) {
      status.textContent = T.error;
      btn.disabled = false;
    }
  }

  function setupComments() {
    const form = $('#commentForm');
    if (form) {
      form.addEventListener('submit', submitComment);
      fetchComments();
    }
  }

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', () => {
    placeSocialUnderAvatar();
    setupReveal();
    setupLangSwitcher();
    setupWhatsAppLink();
    setupComments();
  });
})();