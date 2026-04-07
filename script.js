/* ========================================
   MJAYTEA — Interactive JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // -------- Navbar Scroll Effect --------
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // -------- Mobile Nav Toggle --------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // -------- Smooth Scroll for Anchor Links --------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // -------- Scroll Reveal Animation --------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // -------- Hero content entrance animation --------
  const heroContent = document.querySelector('.hero-content');
  const heroVisual = document.querySelector('.hero-visual');

  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 200);
  }

  if (heroVisual) {
    heroVisual.style.opacity = '0';
    heroVisual.style.transform = 'translateX(40px)';
    heroVisual.style.transition = 'opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    setTimeout(() => {
      heroVisual.style.opacity = '1';
      heroVisual.style.transform = 'translateX(0)';
    }, 500);
  }

  // -------- Active Nav Link Highlighting --------
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.querySelectorAll('a').forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = '#f97316';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // -------- Parallax subtle effect on hero blobs --------
  const blobs = document.querySelectorAll('.hero-blob');

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    blobs.forEach((blob, i) => {
      const factor = (i + 1) * 0.6;
      blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

  // -------- Counter animation for stats --------
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const animateStats = () => {
    if (statsAnimated) return;

    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      statsAnimated = true;

      statNumbers.forEach(stat => {
        const text = stat.textContent;
        const match = text.match(/^([\d.]+)(K?)(\+|★)?$/);
        if (!match) return;

        const target = parseFloat(match[1]);
        const suffix = (match[2] || '') + (match[3] || '');
        const isDecimal = text.includes('.');
        const duration = 1500;
        const start = performance.now();

        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;

          const spanContent = stat.querySelector('span')?.outerHTML || '';
          if (isDecimal) {
            stat.innerHTML = current.toFixed(1) + spanContent;
          } else {
            stat.innerHTML = Math.floor(current) + spanContent;
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      });
    }
  };

  window.addEventListener('scroll', animateStats, { passive: true });
  animateStats(); // run on load

  // -------- Menu card add-to-cart micro-interaction --------
  document.querySelectorAll('.menu-add-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      this.textContent = '✓';
      this.style.background = '#22c55e';
      this.style.borderColor = '#22c55e';
      this.style.color = '#fff';
      this.style.transform = 'scale(1.2)';

      setTimeout(() => {
        this.textContent = '+';
        this.style.background = '';
        this.style.borderColor = '';
        this.style.color = '';
        this.style.transform = '';
      }, 1200);
    });
  });

});
