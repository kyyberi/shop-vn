document.getElementById("year").textContent = new Date().getFullYear();

const slides = [...document.querySelectorAll(".hero-image")];
const carouselToggle = document.querySelector(".carousel-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeSlide = 0;
let isPaused = reducedMotion.matches;

function showSlide(index) {
  activeSlide = index;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === activeSlide);
  });
}

function updateToggle() {
  carouselToggle.setAttribute("aria-pressed", String(isPaused));
  carouselToggle.textContent = isPaused ? "Chạy ảnh nền" : "Tạm dừng ảnh nền";
}

function nextSlide() {
  if (!isPaused) {
    showSlide((activeSlide + 1) % slides.length);
  }
}

if (slides.length > 1 && carouselToggle) {
  updateToggle();
  window.setInterval(nextSlide, 6000);
  carouselToggle.addEventListener("click", () => {
    isPaused = !isPaused;
    updateToggle();
  });
  reducedMotion.addEventListener("change", (event) => {
    isPaused = event.matches;
    updateToggle();
  });
}
