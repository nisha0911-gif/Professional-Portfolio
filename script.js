const progressBar = document.getElementById('progress-bar');
const topBtn = document.getElementById('top');
const menuBtn = document.querySelector('.menu');
const navMenu = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');
const header = document.querySelector('header');
const heroName = document.getElementById('hero-name');
const heroTitle = document.getElementById('hero-title');
const heroRoles = document.getElementById('hero-roles');
const projectButtons = document.querySelectorAll('.project-open');
const modal = document.getElementById('project-modal');
const closeButton = modal.querySelector('.close');
const modalImage = document.getElementById('modal-image');
const modalGallery = document.getElementById('modal-gallery');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalHighlights = document.getElementById('modal-highlights');
const modalTech = document.getElementById('modal-tech');

function animateHeroContent() {
  const heroElements = [heroName, heroTitle, heroRoles, document.querySelector('.hero-intro-paragraph'), document.querySelector('.hero-actions')];
  const heroVisual = document.querySelector('.hero-visual');

  heroElements.forEach((element, index) => {
    if (!element) return;
    element.classList.remove('is-visible');
    element.classList.add('hero-line');
    setTimeout(() => {
      element.classList.add('is-visible');
    }, index * 160);
  });

  if (heroVisual) {
    heroVisual.classList.remove('is-visible');
    setTimeout(() => {
      heroVisual.classList.add('is-visible');
    }, 80);
  }
}

animateHeroContent();

function setupRevealAnimations() {
  const revealTargets = [
    ...document.querySelectorAll('.section-heading'),
    ...document.querySelectorAll('.hero-photo-frame'),
    ...document.querySelectorAll('.hero-info'),
    ...document.querySelectorAll('.career-card'),
    ...document.querySelectorAll('.personal-card'),
    ...document.querySelectorAll('.vm-card'),
    ...document.querySelectorAll('.skill-card'),
    ...document.querySelectorAll('.technology-card'),
    ...document.querySelectorAll('.project-card'),
    ...document.querySelectorAll('.achievement-card'),
    ...document.querySelectorAll('.stats > div'),
    ...document.querySelectorAll('.resume-actions a'),
    ...document.querySelectorAll('.contact-form'),
    ...document.querySelectorAll('.contact-info'),
  ];

  const heroElements = [];

  revealTargets.forEach((element, index) => {
    element.classList.add('reveal-item');
    
    // Only apply transition delay to non-hero elements
    if (!element.classList.contains('hero-photo-frame') && !element.classList.contains('hero-info')) {
      element.style.transitionDelay = `${Math.min(index * 0.06, 0.26)}s`;
    }

    if (element.classList.contains('hero-photo-frame') || element.classList.contains('hero-info')) {
      heroElements.push(element);
    }

    if (element.classList.contains('achievement-card')) {
      element.dataset.direction = index % 2 === 0 ? 'left' : 'right';
    }

    if (element.classList.contains('circle')) {
      const labelValue = element.getAttribute('data-label') || '0%';
      const numericValue = parseInt(labelValue, 10) || 0;
      element.dataset.progress = String(Math.round((numericValue / 100) * 360));
    }
  });

  document.querySelectorAll('.circle').forEach((circle) => {
    const labelValue = circle.getAttribute('data-label') || '0%';
    const numericValue = parseInt(labelValue, 10) || 0;
    circle.dataset.progress = String(Math.round((numericValue / 100) * 360));
  });

  // Trigger hero animations immediately on page load
  requestAnimationFrame(() => {
    heroElements.forEach((element) => {
      element.classList.add('is-visible');
      const circle = element.querySelector('.circle');
      if (circle && !circle.dataset.animated) {
        animateProgressCircle(circle);
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);

        const circle = entry.target.querySelector('.circle');
        if (circle && !circle.dataset.animated) {
          animateProgressCircle(circle);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealTargets.forEach((element) => {
    // Skip observing hero elements as they're already animated on load
    if (!element.classList.contains('hero-photo-frame') && !element.classList.contains('hero-info')) {
      observer.observe(element);
    }
  });
}

function animateProgressCircle(circle) {
  if (!circle || circle.dataset.animated === 'true') return;

  circle.dataset.animated = 'true';
  const targetDegrees = parseInt(circle.dataset.progress || '0', 10);
  let startTime = null;

  const animate = (time) => {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / 1100, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentDegrees = Math.round(easedProgress * targetDegrees);
    circle.style.background = `conic-gradient(var(--sky) ${currentDegrees}deg, #24324b ${currentDegrees}deg 360deg)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}

function updateActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  const offset = window.scrollY + 140;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const matchedLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);

    if (offset >= top && offset < bottom) {
      navLinks.forEach((link) => link.classList.remove('active'));
      if (matchedLink) matchedLink.classList.add('active');
    }
  });
}

const projectData = {
  ev: {
    category: 'IoT & Embedded Systems Project | Hackathon Award-Winning Project',
    title: 'IoT-Enabled Wireless Power Transmission for Electric Vehicles',
    description:
      'Built an innovative wireless charging system for electric vehicles using inductive power transfer integrated with IoT-based monitoring.',
    highlights: [
      'Contactless wireless EV charging',
      'Real-time IoT monitoring',
      'Energy-efficient power transmission',
      'Live charging status visualization',
      'Award-winning innovative solution',
    ],
    tech: 'Technologies: Arduino, NodeMCU (ESP8266), Wireless Power Transfer Coils, IoT Dashboard, MATLAB, Simulink',
    repo: 'https://github.com/nisha0911-gif/IOT-Enabled-Wireless-Power-Transmission-for-Electric-Vehcile',
    images: ['images/images/ev.jpg', 'images/images/ev.jpg'],
  },
  wearable: {
    category: 'IoT-Based Healthcare Monitoring System',
    title: 'Wearable Blood Blockage Detection in Early Stage',
    description:
      'Designed and developed an IoT-enabled wearable healthcare device for continuous monitoring of vital health parameters to support early detection of potential blood blockage risks.',
    highlights: [
      'Continuous health monitoring',
      'Real-time sensor data collection',
      'IoT-based remote monitoring',
      'Early risk detection and alert system',
      'Portable wearable solution',
    ],
    tech: 'Technologies: Arduino, NodeMCU (ESP8266), Health Sensors, Arduino IDE, IoT Platform',
    repo: 'https://github.com/nisha0911-gif/Wearable-Device-for-blood-blockage-in-early-stages',
    images: ['images/images/wearable.jpg', 'images/images/wearable.jpg'],
  },
  approval: {
    category: 'Full Stack Web Application | Personal Project',
    title: 'Digital Approval System',
    description:
      'Developed a secure web-based Digital Approval System to streamline request submission and approval workflows.',
    highlights: [
      'Automated approval workflow',
      'Secure user authentication',
      'Real-time request tracking',
      'Responsive and user-friendly interface',
      'Digital record management',
    ],
    tech: 'Technologies: HTML, CSS, JavaScript, Java, MySQL, VS Code, GitHub',
    repo: 'https://github.com/nisha0911-gif/Digital-Approval-System',
    images: ['images/images/approval.jpg', 'images/images/approval.jpg'],
  },
  netflix: {
    category: 'Data Analysis Project | SQL & Power BI',
    title: 'Netflix Data Analysis',
    description:
      'An end-to-end Netflix Data Analysis project using SQL and Power BI, featuring data cleaning, exploratory analysis, and an interactive dashboard to visualize content trends, genres, ratings, countries, and release patterns.',
    highlights: [
      'Cleaned and transformed raw Netflix data using SQL',
      'Performed exploratory data analysis to identify trends and patterns',
      'Built an interactive Power BI dashboard with dynamic filters and slicers',
      'Visualized KPIs such as total titles, movies vs TV shows, ratings distribution, top genres, top countries, and year-wise releases',
      'Generated actionable insights into Netflix content library and audience preferences',
    ],
    tech: 'Tools & Technologies: SQL (MySQL), Power BI, DAX, Power Query, Data Visualization',
    repo: 'https://github.com/nisha0911-gif/Netflix-Data-Analysis',
    images: ['images/images/Netflix.jpg', 'images/images/Netflix.jpg'],
  },
};

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  if (scrollTop > 500) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }

  header.classList.toggle('scrolled', scrollTop > 20);
  updateActiveNav();
}, { passive: true });

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('show')) {
      navMenu.classList.remove('show');
    }
  });
});

function setupTypewriter() {
  const typewriterText = document.querySelector('.typewriter-text');
  const phrases = [
    { text: 'Passionate Software Developer', color: '#38bdf8' },
    { text: 'Aspiring Java Developer', color: '#a855f7' },
    { text: 'Data Analyst', color: '#f472b6' },
  ];
  const typingSpeed = 70;
  const deletingSpeed = 45;
  const pauseDelay = 1800;
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function updateText() {
    const currentPhrase = phrases[phraseIndex].text;
    if (isDeleting) {
      charIndex = Math.max(charIndex - 1, 0);
    } else {
      charIndex = Math.min(charIndex + 1, currentPhrase.length);
    }

    typewriterText.textContent = currentPhrase.slice(0, charIndex);
    typewriterText.style.background = 'none';
    typewriterText.classList.remove('typewriter-glow');

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = pauseDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 300;
    }

    setTimeout(updateText, delay);
  }

  if (typewriterText) {
    updateText();
  }
}

function openModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  const images = project.images || [];
  const mainImage = images[0] || '';

  modalImage.src = mainImage;
  modalImage.alt = project.title;
  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalHighlights.innerHTML = project.highlights.map((highlight) => `<li>${highlight}</li>`).join('');
  modalTech.textContent = project.tech;
  const modalRepoLink = document.getElementById('modal-repo-link');
  if (modalRepoLink && project.repo) {
    modalRepoLink.href = project.repo;
    modalRepoLink.style.display = 'inline-block';
  } else if (modalRepoLink) {
    modalRepoLink.style.display = 'none';
  }

  if (modalGallery) {
    modalGallery.innerHTML = images
      .map(
        (src, index) =>
          `<img src="${src}" alt="${project.title} screenshot ${index + 1}" class="modal-thumb${index === 0 ? ' active' : ''}" data-src="${src}" />`
      )
      .join('');

    modalGallery.querySelectorAll('.modal-thumb').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        modalGallery.querySelectorAll('.modal-thumb').forEach((item) => item.classList.remove('active'));
        thumb.classList.add('active');
        modalImage.src = thumb.dataset.src;
      });
    });
  }

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

projectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openModal(button.dataset.project);
  });
});

closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

const form = document.getElementById('contact-form');
const submitButton = document.getElementById('contact-submit');
const nameInput = document.getElementById('contact-name');
const emailInput = document.getElementById('contact-email');
const messageInput = document.getElementById('contact-message');

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function setError(input, message) {
  input.setCustomValidity(message);
  input.reportValidity();
}

function clearError(input) {
  input.setCustomValidity('');
}

function setLoading(isLoading) {
  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? 'Sending...' : 'Send Message';
}

function showPopup(message) {
  window.alert(message);
}

async function submitToWeb3Forms(name, email, message) {
  const accessKey = form.dataset.accessKey || '58df457b-b877-4422-8f2c-c9c35b17206b';

  if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
    throw new Error('Replace the placeholder Web3Forms access key in the form with your real key from web3forms.com.');
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      message,
      subject: `Portfolio contact from ${name}`,
      from_name: 'Portfolio Website',
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Unable to send your message right now.');
  }

  return result;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  let formIsValid = true;

  clearError(nameInput);
  clearError(emailInput);
  clearError(messageInput);

  if (!name) {
    setError(nameInput, 'Name is required.');
    formIsValid = false;
  }

  if (!email) {
    setError(emailInput, 'Email is required.');
    formIsValid = false;
  } else if (!validateEmail(email)) {
    setError(emailInput, 'Please enter a valid email address.');
    formIsValid = false;
  }

  if (!message) {
    setError(messageInput, 'Message is required.');
    formIsValid = false;
  }

  if (!formIsValid) {
    return;
  }

  setLoading(true);

  try {
    await submitToWeb3Forms(name, email, message);
    form.reset();
    showPopup('✅ Your message was sent successfully.');
  } catch (error) {
    console.error('Web3Forms error:', error);
    showPopup(`⚠️ ${error.message}`);
  } finally {
    setLoading(false);
  }
});

window.addEventListener('load', () => {
  setupRevealAnimations();
  setupTypewriter();
  updateActiveNav();
});
