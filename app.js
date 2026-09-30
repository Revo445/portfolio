const CONFIG = {
  available: true,
};

const CHAPTERS = {
  floor: "Floor ops",
  erp: "NetSuite / UFSP",
  redteam: "AI red team",
};

const steps = Array.from(document.querySelectorAll(".step"));
const cases = Array.from(document.querySelectorAll(".case"));
const logs = Array.from(document.querySelectorAll(".log-block"));
const grid = document.getElementById("work-grid");
const chapter = document.getElementById("chapter-label");
const live = document.getElementById("filter-live");
const header = document.querySelector(".site-header");

function applyAvailability() {
  const pill = document.querySelector(".status");
  if (!pill) return;
  const open = CONFIG.available;
  pill.dataset.state = open ? "open" : "engaged";
  pill.querySelectorAll(".status-label").forEach((label) => {
    const next = open ? label.dataset.open : label.dataset.closed;
    if (next) label.textContent = next;
  });
}

function setEra(era, silent) {
  steps.forEach((step) => {
    step.setAttribute("aria-pressed", step.dataset.era === era ? "true" : "false");
  });

  let count = 0;
  cases.forEach((card) => {
    const show = card.dataset.era === era;
    card.hidden = !show;
    if (show) count += 1;
  });

  logs.forEach((block) => {
    block.hidden = block.dataset.era !== era;
  });

  if (grid) grid.dataset.count = String(count);
  if (chapter) chapter.textContent = "Chapter · " + (CHAPTERS[era] || era);
  if (live && !silent) {
    const noun = count === 1 ? "case" : "cases";
    live.textContent = "Showing " + (CHAPTERS[era] || era) + ", " + count + " " + noun + ".";
    const work = document.getElementById("work");
    if (work && grid) {
      const top = grid.getBoundingClientRect().top;
      if (top > window.innerHeight * 0.65) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        work.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }
    }
  }
}

steps.forEach((step, index) => {
  step.addEventListener("click", () => setEra(step.dataset.era));
  step.addEventListener("keydown", (event) => {
    const nextKey = event.key === "ArrowRight" || event.key === "ArrowDown";
    const prevKey = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!nextKey && !prevKey && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    let next = index;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = steps.length - 1;
    else next = (index + (nextKey ? 1 : -1) + steps.length) % steps.length;
    steps[next].focus();
    setEra(steps[next].dataset.era);
  });
});

function onScroll() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  const viewport = window.innerHeight * 0.92;
  reveals.forEach((node) => {
    if (node.getBoundingClientRect().top < viewport) node.classList.add("is-in");
  });
  document.documentElement.classList.add("can-reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((node) => {
    if (!node.classList.contains("is-in")) observer.observe(node);
  });
}

applyAvailability();
setEra("redteam", true);
