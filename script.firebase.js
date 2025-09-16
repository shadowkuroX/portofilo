/* script.js — mobile-first, clean style + Comments */
(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };

  function placeSocialUnderAvatar() {
    const img = $('.container > img');
    const social = $('.social-box');
    if (img && social && img.nextElementSibling !== social) {
      img.insertAdjacentElement('afterend', social);
    }
  }

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
      proj3: '🖊️ Програма C#',
      secSkills: 'Білімдерім',
      skill1: '🎨 Figma',
      skill2: '🔥 FireBase',
      skill3: '🐙 GitHub',
      skill4: '💻 Visual Studio',
      skill5: '🟦 Magica Voxel',
      skill6: '🟥 Magica CSG',
      skill7: '🤖 Telegram боты жасау',
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
      proj3: '🖊️ C# Program',
      secSkills: 'Skills',
      skill1: '🎨 Figma',
      skill2: '🔥 FireBase',
      skill3: '🐙 GitHub',
      skill4: '💻 Visual Studio',
      skill5: '🟦 Magica Voxel',
      skill6: '🟥 Magica CSG',
      skill7: '🤖 Creating Telegram bots',
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

    // === Жаңа Skills бөлімі ===
    setText('secSkills', D.secSkills);
    setText('skill1', D.skill1);
    setText('skill2', D.skill2);
    setText('skill3', D.skill3);
    setText('skill4', D.skill4);
    setText('skill5', D.skill5);
    setText('skill6', D.skill6);
    setText('skill7', D.skill7);

    setText('lblWhatsApp', D.lblWhatsApp);
    setText('lblInstagram', D.lblInstagram);
    setText('lblTelegram', D.lblTelegram);

    const btn = $('.btn-send');
    if (btn) btn.textContent = D.comments.send;

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

  // WhatsApp + Comments кодтарың өзгеріссіз қалады...

  document.addEventListener('DOMContentLoaded', () => {
    placeSocialUnderAvatar();
    setupReveal();
    setupLangSwitcher();
    setupWhatsAppLink();
    setupComments();
  });
})();