const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});
const galleryImages = [...document.querySelectorAll(".card img")];
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

// OPEN
function openLightbox(index) {
  currentIndex = index;
  lightbox.classList.add("active");
  lightboxImg.src = galleryImages[currentIndex].src;
  document.body.style.overflow = "hidden";
}

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

// CLOSE
function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// NAVIGATION
function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
}

function showPrev() {
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
}

nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

// KEYBOARD
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "Escape") closeLightbox();
});


// 📱 TOUCH SWIPE SUPPORT
let startX = 0;
let startY = 0;

lightboxImg.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

lightboxImg.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const diffX = endX - startX;
  const diffY = endY - startY;

  // Horizontal swipe
  if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
    diffX > 0 ? showPrev() : showNext();
  }

  // Swipe down to close
  if (diffY > 80) {
    closeLightbox();
  }
});


document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

