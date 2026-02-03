/* =====================================================
   MUNTASIR RAHMAN - PORTFOLIO JAVASCRIPT
   Interactive Effects, Animations & Theme Toggle
   ===================================================== */

// =====================================================
// INITIALIZATION
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCursor();
  initParticles();
  initNavigation();
  initTypingEffect();
  initCounterAnimation();
  initScrollAnimations();
  initSkillBars();
  initCompetencyRings();
  initContactForm();
  initProgressBars();
});

// =====================================================
// THEME TOGGLE (Dark/Light Mode)
// =====================================================
function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme") || "light";

  document.documentElement.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Add animation class
      document.body.classList.add("theme-transition");
      setTimeout(() => {
        document.body.classList.remove("theme-transition");
      }, 500);
    });
  }
}

// =====================================================
// CUSTOM CURSOR
// =====================================================
function initCursor() {
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  if (!cursor || !follower) return;

  // Check if touch device
  if ("ontouchstart" in window) {
    cursor.style.display = "none";
    follower.style.display = "none";
    return;
  }

  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor animation
  function animateCursor() {
    // Cursor follows immediately
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    // Follower has delay
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Hover effects on interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .btn, .nav-link, .social-link, .skill-card, .job-card, .education-card, .contact-card, .interest-item",
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
      follower.classList.add("hover");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
      follower.classList.remove("hover");
    });
  });

  // Hide cursor when leaving window
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    follower.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    follower.style.opacity = "0.5";
  });
}

// =====================================================
// PARTICLE BACKGROUND
// =====================================================
function initParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Random properties
  const size = Math.random() * 6 + 3;
  const left = Math.random() * 100;
  const delay = Math.random() * 15;
  const duration = Math.random() * 10 + 15;

  particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: -20px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
    `;

  container.appendChild(particle);
}

// =====================================================
// NAVIGATION
// =====================================================
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  // Scroll effect
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu on link click
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }
}

// =====================================================
// TYPING EFFECT
// =====================================================
function initTypingEffect() {
  const typingElement = document.getElementById("typingText");
  if (!typingElement) return;

  const phrases = [
    "Customer Service Officer",
    "Sales Associate",
    "Problem Solver",
    "Communication Expert",
    "B.B.S Student",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing after a delay
  setTimeout(type, 1000);
}

// =====================================================
// COUNTER ANIMATION
// =====================================================
function initCounterAnimation() {
  const counters = document.querySelectorAll(
    ".stat-number, .stat-value, .highlight-number[data-target]",
  );

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.target);
  if (!target) return;

  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  function updateCounter() {
    current += step;
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString();
      // Add plus sign for large numbers
      if (target >= 10000) {
        element.textContent += "+";
      }
    }
  }

  updateCounter();
}

// =====================================================
// SCROLL ANIMATIONS
// =====================================================
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(
    ".reveal, .timeline-item, .education-card, .skill-card, .contact-card",
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Add stagger delay for grid items
        const siblings = entry.target.parentElement.children;
        const index = Array.from(siblings).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

// =====================================================
// SKILL BARS ANIMATION
// =====================================================
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progress = entry.target.dataset.progress;
        entry.target.style.width = `${progress}%`;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillBars.forEach((bar) => observer.observe(bar));
}

// =====================================================
// COMPETENCY RINGS ANIMATION
// =====================================================
function initCompetencyRings() {
  const rings = document.querySelectorAll(".ring-progress");

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progress = parseInt(entry.target.dataset.progress);
        const circumference = 2 * Math.PI * 45; // radius = 45
        const offset = circumference - (progress / 100) * circumference;
        entry.target.style.strokeDashoffset = offset;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  rings.forEach((ring) => {
    // Set initial stroke color with gradient
    ring.style.stroke = "url(#gradient)";
    observer.observe(ring);
  });

  // Add SVG gradient definition if not exists
  addSVGGradient();
}

function addSVGGradient() {
  const svgs = document.querySelectorAll(".competency-ring svg");

  svgs.forEach((svg) => {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#6c63ff;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#4ecdc4;stop-opacity:1" />
            </linearGradient>
        `;
    svg.insertBefore(defs, svg.firstChild);
  });
}

// =====================================================
// PROGRESS BARS (Education)
// =====================================================
function initProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill");

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progress = entry.target.dataset.progress;
        entry.target.style.width = `${progress}%`;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  progressBars.forEach((bar) => observer.observe(bar));
}

// =====================================================
// CONTACT FORM
// =====================================================
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Create mailto link
    const subject = encodeURIComponent(
      data.subject || "Contact Form Submission",
    );
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    );

    // Open email client
    window.location.href = `mailto:muntasir2999@gmail.com?subject=${subject}&body=${body}`;

    // Show success feedback
    showFormFeedback(
      form,
      "Message prepared! Your email client will open shortly.",
    );

    // Reset form
    form.reset();
  });

  // Floating label effect
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      if (input.value) {
        input.classList.add("has-value");
      } else {
        input.classList.remove("has-value");
      }
    });
  });
}

function showFormFeedback(form, message) {
  // Remove existing feedback
  const existingFeedback = form.querySelector(".form-feedback");
  if (existingFeedback) existingFeedback.remove();

  // Create feedback element
  const feedback = document.createElement("div");
  feedback.className = "form-feedback";
  feedback.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
  feedback.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        background: linear-gradient(135deg, rgba(108, 99, 255, 0.1), rgba(78, 205, 196, 0.1));
        border-radius: 10px;
        color: #4ecdc4;
        font-weight: 500;
        margin-top: 1rem;
        animation: slideUp 0.5s ease;
    `;

  form.appendChild(feedback);

  // Remove after delay
  setTimeout(() => {
    feedback.style.opacity = "0";
    feedback.style.transform = "translateY(-10px)";
    setTimeout(() => feedback.remove(), 300);
  }, 3000);
}

// =====================================================
// MAGNETIC BUTTON EFFECT
// =====================================================
function initMagneticButtons() {
  const buttons = document.querySelectorAll(".btn-primary");

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)";
    });
  });
}

// =====================================================
// SMOOTH PAGE TRANSITIONS
// =====================================================
function initPageTransitions() {
  const links = document.querySelectorAll('a[href$=".html"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.hostname === window.location.hostname) {
        e.preventDefault();
        const href = link.getAttribute("href");

        document.body.classList.add("page-exit");

        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
}

// =====================================================
// TILT EFFECT ON CARDS
// =====================================================
function initTiltEffect() {
  const cards = document.querySelectorAll(
    ".job-card, .education-card, .skill-card",
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });
}

// =====================================================
// PARALLAX EFFECT
// =====================================================
function initParallax() {
  const parallaxElements = document.querySelectorAll(
    ".floating-badge, .image-decoration",
  );

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((el, index) => {
      const speed = 0.1 * (index + 1);
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// =====================================================
// RIPPLE EFFECT ON BUTTONS
// =====================================================
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement("span");

  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

  button.appendChild(ripple);

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
}

// Add ripple CSS animation
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .page-exit {
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    }
    
    .theme-transition {
        transition: background-color 0.5s ease, color 0.5s ease !important;
    }
`;
document.head.appendChild(style);

// Initialize ripple effect
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", createRipple);
});

// Initialize additional effects
initMagneticButtons();
initTiltEffect();
initParallax();

// =====================================================
// LOADING ANIMATION
// =====================================================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Trigger entrance animations
  const animatedElements = document.querySelectorAll(
    ".animate-slide-up, .animate-slide-right, .animate-fade-in",
  );
  animatedElements.forEach((el, index) => {
    el.style.animationPlayState = "running";
  });
});

// =====================================================
// KEYBOARD NAVIGATION
// =====================================================
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navMenu && navMenu.classList.contains("active")) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // T key toggles theme
  if (
    e.key === "t" &&
    !e.ctrlKey &&
    !e.altKey &&
    document.activeElement.tagName !== "INPUT" &&
    document.activeElement.tagName !== "TEXTAREA"
  ) {
    document.getElementById("themeToggle")?.click();
  }
});

// =====================================================
// CONSOLE GREETING
// =====================================================
console.log(
  "%c👋 Hello! Thanks for checking out my portfolio!",
  "color: #6c63ff; font-size: 20px; font-weight: bold;",
);
console.log(
  "%cBuilt with ❤️ by Muntasir Rahman",
  "color: #4ecdc4; font-size: 14px;",
);
