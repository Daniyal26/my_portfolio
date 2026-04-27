// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// Smooth in-page anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#" || href.length < 2) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Auto-update footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Navbar shadow + scroll-to-top FAB visibility
const navbar = document.querySelector(".navbar");
const scrollTopBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (navbar) navbar.classList.toggle("scrolled", y > 12);
  if (scrollTopBtn) scrollTopBtn.classList.toggle("visible", y > 600);
});

// Reveal-on-scroll animation
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el) => observer.observe(el));

// Stagger reveal for grid items
document
  .querySelectorAll(
    ".skills-grid .reveal, .projects-grid .reveal, .contact-grid .reveal, .stats-grid .reveal, .about-info .reveal"
  )
  .forEach((el, i) => {
    el.style.transitionDelay = `${i * 70}ms`;
  });

// Animated stat number count-up
const statNums = document.querySelectorAll(".stat-num");
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent.trim();
      const match = text.match(/^(\d+)(\D*)$/);
      if (!match) {
        statObserver.unobserve(el);
        return;
      }
      const target = parseInt(match[1], 10);
      const suffix = match[2];
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

statNums.forEach((el) => statObserver.observe(el));
