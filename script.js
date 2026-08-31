(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu on link click
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Simple typewriter effect for the hero headline
  const typeEl = document.querySelector(".type");
  if (!typeEl) return;

  const phrases = ["Web Developer", "UI Engineer", "Frontend & Integration"];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReduced) {
    typeEl.textContent = phrases[0];
    return;
  }

  const tick = () => {
    const current = phrases[phraseIndex];
    if (!deleting) {
      charIndex = Math.min(current.length, charIndex + 1);
      typeEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 900);
        return;
      }
      setTimeout(tick, 45);
    } else {
      charIndex = Math.max(0, charIndex - 1);
      typeEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      setTimeout(tick, 26);
    }
  };

  tick();

  // Demo contact form (front-end only)
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.textContent =
        "Thanks! This form is a front-end demo. Connect it to your backend to send messages.";
      form.reset();
    });
  }
})();
