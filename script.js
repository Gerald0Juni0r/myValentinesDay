// ========== CONTADOR ==========
const startDate = new Date("2018-03-29T00:00:00");
const display = document.getElementById("contador");

function updateCounter() {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  display.innerText = `${years} ano${years !== 1 ? "s" : ""}, ${months} mes${months !== 1 ? "es" : ""}, ${days} dia${days !== 1 ? "s" : ""}, ${hours}h ${minutes}min ${seconds}s`;
}

setInterval(updateCounter, 1000);
updateCounter();

// ========== CORAÇÕES ==========
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = `${Math.random() * window.innerWidth}px`;
  heart.style.animationDuration = `${2 + Math.random()}s`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
}

const heartInterval = setInterval(createHeart, 150);
setTimeout(() => clearInterval(heartInterval), 3000);

// ========== ÁUDIO ==========
const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");

playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playButton.innerHTML = '<img src="Img/icons/stop.png" alt="Pausar música">';
  } else {
    audio.pause();
    playButton.innerHTML = '<img src="Img/icons/play.png" alt="Tocar música">';
  }
});

// ========== CARROSSEL ==========
const imagens = [
  { principal: "Img/foto1.jpg", alternada: "Img/foto1-ghibli.png" },
  { principal: "Img/foto2.png", alternada: "Img/foto2-ghibli.png" },
  { principal: "Img/foto3.jpg", alternada: "Img/foto3-ghibli.png" },
  { principal: "Img/foto4.jpg", alternada: "Img/foto4-ghibli.png" },
  { principal: "Img/foto5.jpg", alternada: "Img/foto5-ghibli.png" },
  { principal: "Img/foto6.jpg", alternada: "Img/foto6-ghibli.png" },
];

let index = 0;
let isHeld = false;
const carouselImg = document.getElementById("carouselImage");

function updateCarousel() {
  if (!isHeld) {
    carouselImg.src = imagens[index].principal;
    index = (index + 1) % imagens.length;
  }
}
setInterval(updateCarousel, 4000);
updateCarousel();

function showAltImage() {
  isHeld = true;
  const atual = imagens[(index - 1 + imagens.length) % imagens.length];
  carouselImg.src = atual.alternada;
}

function restoreImage() {
  isHeld = false;
  const atual = imagens[(index - 1 + imagens.length) % imagens.length];
  carouselImg.src = atual.principal;
}

carouselImg.addEventListener("mousedown", showAltImage);
carouselImg.addEventListener("mouseup", restoreImage);
carouselImg.addEventListener("mouseleave", restoreImage);

carouselImg.addEventListener("touchstart", (e) => {
  e.preventDefault();
  showAltImage();
}, { passive: false });

carouselImg.addEventListener("touchend", restoreImage);
