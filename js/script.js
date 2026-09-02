(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }),
    );
  }

  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  items.forEach((item) => observer.observe(item));

  const glow = document.querySelector(".cursor-glow");
  if (glow && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
      glow.style.opacity = "1";
    });
  }
})();

// Scroll progress + subtle tilt for project cards.
(() => {
  const header = document.querySelector(".header");
  const cards = document.querySelectorAll(".project");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    header?.style.setProperty("--scroll-progress", progress);
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });

  if (window.matchMedia("(pointer:fine)").matches) {
    cards.forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 2.5).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg) translateY(-7px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }
})();
