/* =========================
   REVEAL ON SCROLL
========================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* =========================
   GALLERY LIGHTBOX SYSTEM
========================= */

// Get all gallery images
const galleryImages = Array.from(document.querySelectorAll(".card img"));

// Lightbox elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

/* ---------- OPEN ---------- */
function openLightbox(index) {
  document.querySelector("header").style.display = "none";
  currentIndex = index;
  lightbox.classList.add("active");
  lightboxImg.src = galleryImages[currentIndex].src;
  document.body.style.overflow = "hidden";
}

// Attach click to gallery images
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

/* ---------- CLOSE ---------- */
function closeLightbox() {
  document.querySelector("header").style.display = "";
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close when clicking background (not image / buttons)
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

/* ---------- NAVIGATION ---------- */
function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
}

function showPrev() {
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
}

// Arrow buttons
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showPrev();
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showNext();
});

/* ---------- KEYBOARD SUPPORT ---------- */
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "Escape") closeLightbox();
});

/* ---------- MOBILE TOUCH SUPPORT ---------- */
let startX = 0;
let startY = 0;

lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

lightbox.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const diffX = endX - startX;
  const diffY = endY - startY;

  // Swipe left / right
  if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY)) {
    diffX > 0 ? showPrev() : showNext();
  }

  // Swipe down to close
  if (diffY > 90) {
    closeLightbox();
  }
});

/* ---------- DISABLE RIGHT CLICK ---------- */
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

/* ---------- DISABLE IMAGE DRAG ---------- */
document.addEventListener("dragstart", (e) => {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});
