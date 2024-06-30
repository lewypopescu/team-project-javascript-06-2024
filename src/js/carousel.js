document.addEventListener('DOMContentLoaded', function () {
  const carouselImages = document.querySelectorAll('.carousel-img');
  let currentImageIndex = 0;
  const totalImages = carouselImages.length;

  // Funcție pentru afișarea unei imagini din carusel
  function showImage(index) {
    // Iterăm prin toate imaginile caruselului
    carouselImages.forEach((img, i) => {
      // Verificăm dacă indexul imaginii curente coincide cu indexul dat
      if (i === index) {
        img.classList.add('active'); // Afișăm imaginea curentă
      } else {
        img.classList.remove('active'); // Ascundem celelalte imagini
      }
    });
  }

  // Funcție pentru a avansa la următoarea imagine din carusel
  function nextImage() {
    // Incrementăm indexul imaginii curente și revenim la prima imagine după ultima
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    showImage(currentImageIndex);
  }

  // Setăm un interval pentru a schimba imaginea la fiecare 4 secunde
  setInterval(nextImage, 4000);

  // Afișăm imaginea curentă la încărcarea paginii
  showImage(currentImageIndex);
});
