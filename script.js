const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "เปิดเมนู" : "ปิดเมนู");
    primaryNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
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

const filterButtons = [...document.querySelectorAll(".filter-button")];
const ideaCards = [...document.querySelectorAll(".idea-card")];

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    ideaCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const ideaForm = document.querySelector("#idea-form");
const formStatus = document.querySelector("#form-status");
const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 4200);
}

if (ideaForm) {
  ideaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(ideaForm);
    const message = String(formData.get("message") || "").trim();
    if (!message) return;

    const savedIdeas = JSON.parse(localStorage.getItem("studentCouncilIdeas") || "[]");
    savedIdeas.push({
      category: String(formData.get("category") || "ทั่วไป"),
      message,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("studentCouncilIdeas", JSON.stringify(savedIdeas));
    ideaForm.reset();
    formStatus.textContent = "บันทึกไอเดียไว้ในเบราว์เซอร์เครื่องนี้แล้ว ขอบคุณที่ช่วยคิดนะ!";
    showToast("ไอเดียถูกบันทึกไว้ในเครื่องนี้แล้ว ยังไม่ได้ส่งให้โรงเรียน");
  });
}

