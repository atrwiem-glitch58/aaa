/* ============================================================
   ATELIER WILLEHEM — Scripts principaux
   ============================================================ */
'use strict';

/* ===== Scroll Optimization (Header & Parallax) ===== */
(function () {
  const header = document.getElementById('header');
  const bg = document.querySelector('.hero__bg');
  const hasParallax = bg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!header && !hasParallax) return;

  let lastScrollY = 0;
  let ticking = false;

  const updateScroll = () => {
    const y = lastScrollY;
    if (header) {
      header.classList.toggle('header--scrolled', y > 40);
    }
    if (hasParallax) {
      bg.style.transform = `scale(1.06) translateY(${y * 0.22}px)`;
    }
    ticking = false;
  };

  const onScroll = () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Run once initially
  lastScrollY = window.scrollY;
  updateScroll();
})();


/* ===== Mobile menu ===== */
(function () {
  const btn  = document.getElementById('burger-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  const spans = btn.querySelectorAll('span');

  const open = () => {
    menu.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    spans[0].style.transform = 'translateY(9px) rotate(45deg)';
    spans[1].style.opacity  = '0';
    spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
  };

  const close = () => {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    spans[0].style.transform = '';
    spans[1].style.opacity  = '';
    spans[2].style.transform = '';
  };

  btn.addEventListener('click', () => menu.classList.contains('open') ? close() : open());
  menu.querySelectorAll('a').forEach(l => l.addEventListener('click', close));
})();

/* ===== Scroll reveal ===== */
(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

/* ===== Gallery lightbox ===== */
(function () {
  const lb     = document.getElementById('lightbox');
  const lbImg  = document.getElementById('lightbox-img');
  const lbClose= document.getElementById('lightbox-close');
  const lbPrev = document.getElementById('lightbox-prev');
  const lbNext = document.getElementById('lightbox-next');
  if (!lb || !lbImg) return;

  let imgs = [];
  let cur  = 0;

  const openLb = (i) => {
    cur = i;
    lbImg.src = imgs[cur];
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeLb = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 300);
  };
  const showIdx = (i) => {
    cur = (i + imgs.length) % imgs.length;
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = imgs[cur];
      lbImg.style.opacity = '1';
    }, 150);
  };
  lbImg.style.transition = 'opacity 0.15s';

  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    const img = item.querySelector('img');
    if (img) { imgs.push(img.src); item.addEventListener('click', () => openLb(i)); }
  });

  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lbPrev)  lbPrev.addEventListener('click',  () => showIdx(cur - 1));
  if (lbNext)  lbNext.addEventListener('click',  () => showIdx(cur + 1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLb();
    if (e.key === 'ArrowLeft')   showIdx(cur - 1);
    if (e.key === 'ArrowRight')  showIdx(cur + 1);
  });
})();

/* ===== Gallery filters ===== */
(function () {
  const btns  = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach(item => {
        const show = f === 'all' || item.dataset.cat === f;
        item.style.display = show ? '' : 'none';
        if (show) {
          item.style.opacity = '0';
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.3s';
            item.style.opacity = '1';
          });
        }
      });
    });
  });
})();

/* ===== FAQ accordion ===== */
(function () {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    if (!q) return;
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
})();

/* ===== Contact form — Formspree ===== */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.style.display = 'none';
        const s = document.getElementById('form-success');
        if (s) s.style.display = 'block';
      } else {
        throw new Error();
      }
    } catch {
      btn.textContent = 'Erreur — veuillez réessayer';
      btn.disabled = false;
      setTimeout(() => { btn.textContent = original; }, 3500);
    }
  });
})();

/* ===== Active nav link ===== */
(function () {
  const path = window.location.pathname;
  document.querySelectorAll('.header__nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href === '/' && path === '/') link.classList.add('active');
    else if (href !== '/' && path.startsWith(href)) link.classList.add('active');
  });
})();

/* ===== Smooth anchor scroll ===== */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();

/* ===== WebMCP Integration ===== */
(function () {
  if (typeof navigator !== 'undefined' && 'modelContext' in navigator) {
    navigator.modelContext.registerTool({
      name: 'demanderDevis',
      description: 'Envoyer une demande de devis ou de contact pour des travaux de toiture à Atelier Willehem. Ce formulaire transmet directement les détails à l\'artisan couvreur.',
      inputSchema: {
        type: 'object',
        properties: {
          prenom: { type: 'string', description: 'Prénom du demandeur' },
          nom: { type: 'string', description: 'Nom du demandeur' },
          telephone: { type: 'string', description: 'Numéro de téléphone' },
          email: { type: 'string', description: 'Adresse email du demandeur' },
          commune: { type: 'string', description: 'Commune ou ville du chantier (ex: Rueil-Malmaison)' },
          service: {
            type: 'string',
            description: 'Type de prestation demandée (ex: Rénovation complète de toiture, Pose de toiture neuve, Démoussage / nettoyage, Réparation gouttières, Pose Velux neuf)'
          },
          description: { type: 'string', description: 'Description détaillée du projet et des travaux à effectuer' },
          disponibilites: { type: 'string', description: 'Disponibilités pour une visite sur place (optionnel)' }
        },
        required: ['prenom', 'nom', 'telephone', 'email', 'commune', 'service']
      },
      execute: async (input) => {
        const form = document.getElementById('contact-form');
        if (!form) {
          return { content: [{ type: 'text', text: 'Erreur: Le formulaire de contact est introuvable sur cette page.' }] };
        }
        
        // Remplir les champs du formulaire
        for (const [key, value] of Object.entries(input)) {
          const field = form.querySelector(`[name="${key}"], [id="${key}"]`);
          if (field) {
            field.value = value;
          }
        }
        
        // Simuler la soumission
        const formData = new FormData(form);
        try {
          const res = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
          });
          if (res.ok) {
            form.style.display = 'none';
            const s = document.getElementById('form-success');
            if (s) s.style.display = 'block';
            return { content: [{ type: 'text', text: 'Succès: La demande de devis a été soumise avec succès.' }] };
          } else {
            return { content: [{ type: 'text', text: 'Erreur: Échec de la soumission du formulaire au serveur.' }] };
          }
        } catch (error) {
          return { content: [{ type: 'text', text: `Erreur technique lors de la soumission: ${error.message}` }] };
        }
      }
    });
  }
})();
