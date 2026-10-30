const track = document.getElementById("carousel-track");
const prevBtn = document.getElementById("carousel-prev");
const nextBtn = document.getElementById("carousel-next");
const countText = document.getElementById("carousel-count");
const items = track.querySelectorAll(".carousel-item");

function getStep() {
  return items[1].offsetLeft - items[0].offsetLeft;
}

function updateCarousel() {
  const step = getStep();
  const gap = step - items[0].offsetWidth;
  const visibleCount = Math.round((track.clientWidth + gap) / step);
  const firstVisible = Math.round(track.scrollLeft / step);
  const lastVisible = Math.min(firstVisible + visibleCount, items.length);

  if (firstVisible + 1 === lastVisible) {
    countText.textContent = "Showing " + lastVisible + " of " + items.length;
  } else {
    countText.textContent =
      "Showing " + (firstVisible + 1) + " to " + lastVisible + " of " + items.length;
  }

  prevBtn.disabled = track.scrollLeft <= 0;
  nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
}

prevBtn.addEventListener("click", function () {
  track.scrollBy({ left: -getStep(), behavior: "smooth" });
});

nextBtn.addEventListener("click", function () {
  track.scrollBy({ left: getStep(), behavior: "smooth" });
});

track.addEventListener("scroll", updateCarousel);
window.addEventListener("resize", updateCarousel);

updateCarousel();