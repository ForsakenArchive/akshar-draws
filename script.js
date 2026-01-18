const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

const galleryImages = document.querySelectorAll(".card img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// Open fullscreen
galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
    document.body.style.overflow = "hidden";
  });
});

// Close on click outside image
lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});


document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

