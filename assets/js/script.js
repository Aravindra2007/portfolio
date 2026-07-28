/* ── Typewriter ── */
const phrases = [
  "Full-Stack Developer",
  "Embedded Systems Engineer",
  "AI/ML Enthusiast",
  "Open Source Contributor",
  "LeetCode Problem Solver",
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById("typed");
function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 40 : 80);
}
setTimeout(type, 800);

/* ── Counter animation ── */
function animateCounter(el) {
  const target = +el.dataset.count;
  const suffix = target >= 100 ? "+" : target >= 10 ? "+" : "";
  let start = 0;
  const step = Math.ceil(target / 40);
  const interval = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start + suffix;
    if (start >= target) clearInterval(interval);
  }, 30);
}
let countersStarted = false;

/* ── Intersection Observer (reveal + counters) ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* Counters trigger on hero scroll into view */
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      document.querySelectorAll("[data-count]").forEach(animateCounter);
    }
  });
}, { threshold: 0.5 });
heroObserver.observe(document.getElementById("hero"));
/* Also trigger on load if already in view */
setTimeout(() => {
  if (!countersStarted) {
    countersStarted = true;
    document.querySelectorAll("[data-count]").forEach(animateCounter);
  }
}, 600);

/* ── Navbar scroll effect ── */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.style.background = "rgba(10,15,30,0.97)";
  } else {
    navbar.style.background = "rgba(10,15,30,0.85)";
  }
});

/* ── Active nav link highlight ── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const activateNav = () => {
  let current = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute("href") === "#" + current
      ? "var(--cyan)" : "";
  });
};
window.addEventListener("scroll", activateNav);

/* ── Smooth section eyebrow text reveal ── */
document.querySelectorAll(".section-eyebrow, .section-title, .hero-content > *")
  .forEach((el, i) => {
    el.classList.add("reveal");
    if (i > 0 && i < 4) el.classList.add(`reveal-delay-${i}`);
  });
/* Hero content visible immediately */
setTimeout(() => {
  document.querySelectorAll(".hero-content .reveal").forEach(el => el.classList.add("visible"));
}, 100);