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
      
      // Add to cart logic
      const card = this.closest('.menu-card');
      const title = card.querySelector('h3').textContent;
      const priceText = card.querySelector('.menu-price').childNodes[0].nodeValue.trim();
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
      const img = card.querySelector('img').src;
      
      // Get current currency symbol from the dropdown
      const currencySelect = document.getElementById('currencySelect');
      let currentCurrency = 'THB';
      let symbol = '฿';
      if(currencySelect) {
        currentCurrency = currencySelect.value;
        if(currentCurrency === 'USD') symbol = '$';
        else if(currentCurrency === 'EUR') symbol = '€';
        else if(currentCurrency === 'JPY') symbol = '¥';
      }
      
      cart.push({ title, price, img, symbol });
      updateCartUI(symbol);
      
      if(cart.length === 1) {
        setTimeout(openCart, 800);
      }
    });
  });

  // -------- Cart UI Logic --------
  const cartToggle = document.getElementById('cartToggle');
  const cartClose = document.getElementById('cartClose');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartBadge = document.getElementById('cartBadge');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  let cart = [];
  
  const openCart = () => {
    if(cartSidebar) cartSidebar.classList.add('open');
    if(cartOverlay) cartOverlay.classList.add('open');
  };
  
  const closeCart = () => {
    if(cartSidebar) cartSidebar.classList.remove('open');
    if(cartOverlay) cartOverlay.classList.remove('open');
  };
  
  if (cartToggle) cartToggle.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  
  const updateCartUI = (currencySymbol = '฿') => {
    if(!cartBadge) return;
    cartBadge.textContent = cart.length;
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="empty-cart-message">ตะกร้าสินค้าของคุณว่างเปล่า</div>';
      cartTotalEl.textContent = currencySymbol + '0';
      checkoutBtn.disabled = true;
      return;
    }
    
    checkoutBtn.disabled = false;
    let total = 0;
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
      total += item.price;
      const cartItemEl = document.createElement('div');
      cartItemEl.className = 'cart-item';
      cartItemEl.innerHTML = `
        <img src="${item.img}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">${currencySymbol}${item.price.toFixed(2).replace('.00', '')}</div>
        </div>
        <button class="cart-item-remove" data-index="${index}">&times;</button>
      `;
      cartItemsContainer.appendChild(cartItemEl);
    });
    
    cartTotalEl.textContent = currencySymbol + total.toFixed(2).replace('.00', '');
    
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        cart.splice(idx, 1);
        updateCartUI(currencySymbol);
      });
    });
  };

  // -------- Currency API Integration --------
  const currencySelect = document.getElementById('currencySelect');
  const priceElements = document.querySelectorAll('.menu-price');
  
  const basePrices = [];
  priceElements.forEach(el => {
    const textNode = el.childNodes[0].nodeValue;
    const priceStr = textNode.replace(/[^0-9.]/g, '');
    basePrices.push(parseFloat(priceStr));
  });

  let exchangeRates = null;

  fetch('https://api.exchangerate-api.com/v4/latest/THB')
    .then(res => res.json())
    .then(data => {
      exchangeRates = data.rates;
    })
    .catch(err => console.error("Currency API Error:", err));

  if (currencySelect) {
    currencySelect.addEventListener('change', (e) => {
      const targetCurrency = e.target.value;
      if (!exchangeRates) return;
      
      const rate = exchangeRates[targetCurrency];
      
      let symbol = '';
      if(targetCurrency === 'THB') symbol = '฿';
      else if(targetCurrency === 'USD') symbol = '$';
      else if(targetCurrency === 'EUR') symbol = '€';
      else if(targetCurrency === 'JPY') symbol = '¥';
      else symbol = targetCurrency + ' ';

      priceElements.forEach((el, index) => {
        const basePrice = basePrices[index];
        const converted = basePrice * rate;
        
        let formattedPrice = '';
        if (targetCurrency === 'JPY' || targetCurrency === 'THB') {
          formattedPrice = Math.round(converted);
        } else {
          formattedPrice = converted.toFixed(2);
        }
        
        const smallTag = el.querySelector('small');
        el.innerHTML = `${symbol}${formattedPrice} ${smallTag ? smallTag.outerHTML : ''}`;
      });
      
      // Clear cart when currency changes to avoid mixed currency calculations
      if (cart.length > 0) {
        cart = [];
        updateCartUI(symbol);
      }
    });
  }

  // -------- 3D Tilt Effect --------
  const tiltCards = document.querySelectorAll('.menu-card, .feature-card, .blog-card');
  
  tiltCards.forEach(card => {
    card.classList.add('tilt-effect');
    
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; 
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 0.5s ease, box-shadow 0.4s ease, border-color 0.4s ease';
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  // -------- FAQ Accordion --------
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const parent = question.parentElement;
      const answer = question.nextElementSibling;
      const isActive = parent.classList.contains('active');
      
      // Close all other FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const ans = item.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });
      
      if (!isActive) {
        parent.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

});
