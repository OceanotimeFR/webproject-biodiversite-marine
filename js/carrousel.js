let currentSlide = 1;
const totalSlides = 3;

const goToSlide = (n) => {
  document.getElementById(`slide${n}`).checked = true;
  currentSlide = n;
}

const nextSlide = () => {
  currentSlide = currentSlide % totalSlides + 1;
  goToSlide(currentSlide);
}

let interval = setInterval(nextSlide, 5000); // change toutes les 5s

document.querySelectorAll('input[name="slide"]').forEach((input, index) => {
  input.addEventListener('change', () => {
    currentSlide = index + 1;
    clearInterval(interval); // stop auto défilement temporairement
    interval = setInterval(nextSlide, 5000); // relance
  });
});