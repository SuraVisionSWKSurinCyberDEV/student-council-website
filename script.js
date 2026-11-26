const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "ปิดเมนู" : "เปิดเมนู");
    primaryNav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "เปิดเมนู");
      primaryNav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });
}

const track = document.querySelector(".project-track");
const projectCards = [...document.querySelectorAll(".project-card")];
const slideButtons = [...document.querySelectorAll("[data-slide]")];
let slideIndex = 0;

function slideStep() {
  if (!track || !projectCards.length) return 0;
  const cardWidth = projectCards[0].getBoundingClientRect().width;
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
  return cardWidth + gap;
}

function visibleProjectCount() {
  if (window.innerWidth <= 680) return 1;
  if (window.innerWidth <= 980) return 2;
  return 3;
}

function updateSlider() {
  if (!track) return;
  const lastIndex = Math.max(0, projectCards.length - visibleProjectCount());
  slideIndex = Math.min(Math.max(slideIndex, 0), lastIndex);
  track.style.transform = `translateX(${-slideIndex * slideStep()}px)`;
  slideButtons.forEach((button) => {
    button.disabled = button.dataset.slide === "prev" ? slideIndex === 0 : slideIndex === lastIndex;
  });
}

slideButtons.forEach((button) => {
  button.addEventListener("click", () => {
    slideIndex += button.dataset.slide === "next" ? 1 : -1;
    updateSlider();
  });
});
window.addEventListener("resize", updateSlider);
updateSlider();

const ideaForm = document.querySelector("#idea-form");
const formStatus = document.querySelector("#form-status");

if (ideaForm && formStatus) {
  ideaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = String(new FormData(ideaForm).get("message") || "").trim();
    if (!message) return;

    const ideas = JSON.parse(localStorage.getItem("studentCouncilIdeas") || "[]");
    ideas.push({ message, createdAt: new Date().toISOString() });
    localStorage.setItem("studentCouncilIdeas", JSON.stringify(ideas));
    ideaForm.reset();
    formStatus.textContent = "บันทึกไอเดียไว้ในเบราว์เซอร์เครื่องนี้แล้ว ขอบคุณที่ช่วยคิดนะ!";
  });
}

