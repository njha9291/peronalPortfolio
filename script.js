document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Timeline toggle
  const timelineToggle = document.getElementById('timelineToggle');
  const timeline = document.getElementById('timeline');
  timelineToggle.addEventListener('click', () => {
    timelineToggle.classList.toggle('active');
    timeline.classList.toggle('open');
    const span = timelineToggle.querySelector('span');
    span.textContent = timeline.classList.contains('open')
      ? 'Hide Journey'
      : 'View Full Journey';
  });

  // Animated number counters
  const animateCounters = () => {
    document.querySelectorAll('.stat-number').forEach(counter => {
      if (counter.dataset.animated) return;
      const target = parseInt(counter.dataset.target, 10);
      const duration = 2000;
      const start = performance.now();

      const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
          counter.dataset.animated = 'true';
        }
      };
      requestAnimationFrame(update);
    });
  };

  // Scroll reveal
  const revealElements = () => {
    const elements = document.querySelectorAll(
      '.service-card, .pricing-card, .timeline-item, .about-highlights .highlight, .contact-card, .about-skills'
    );
    elements.forEach(el => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });
  };
  revealElements();

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Counter animation on hero visible
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      heroObserver.disconnect();
    }
  }, { threshold: 0.3 });

  const heroSection = document.getElementById('hero');
  if (heroSection) heroObserver.observe(heroSection);

  // Active nav link highlight
  const sections = document.querySelectorAll('section[id]');
  const highlightNav = () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        link.style.color = (scrollY >= top && scrollY < top + height)
          ? 'var(--primary)'
          : '';
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // Form submission
  const form = document.getElementById('scheduleForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Booking Confirmed!';
      btn.style.background = '#10b981';
      btn.style.borderColor = '#10b981';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  // Set min date for date picker
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
});
