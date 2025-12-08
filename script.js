let hamburger = document.querySelector('.hamburger');
let closeBtn = document.querySelector('.close-hamburger');
let mobileMenu = document.querySelector('.nav-left ul');
let overlay = document.querySelector('.overlay');
let counterVar = document.querySelector(".counter-text");
let increaseBtn = document.querySelector(".icon-plus");
let decreaseBtn = document.querySelector(".icon-minus");
let mainImg = document.querySelector(".main-img");
let thumbnails = document.querySelectorAll(".thumbnail");
let mainThumbnail = document.querySelector(".main-thumb");
const cartBadge = document.querySelector('.cart-badge');
const addBtn = document.querySelector('.cart-section button');
const prevArrow = document.querySelector('.arrows img:first-child');
const nextArrow = document.querySelector('.arrows img:last-child');
let currentIndex = 0;

let counter = 0;

mainThumbnail.classList.add("active")

let increaseCount = () => {
    counter++
    counterVar.textContent = counter;
}

let decreaseCount = () => {
    if (counter == 0) return;
    counter--
    counterVar.textContent = counter;
}

const openMenu = () => {
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
};

const closeMenu = () => {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
};

thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
        thumbnails.forEach((t) => t.classList.remove("active"));
        thumbnail.classList.add("active")
        mainImg.src = thumbnail.src.replace("-thumbnail", "");
    })
});

addBtn.addEventListener('click', () => {
  if (counter === 0) return;
  cartBadge.textContent = Number(cartBadge.textContent) + counter;
  cartBadge.style.display = 'block';
});

const imagePaths = [
  './images/image-product-1.jpg',
  './images/image-product-2.jpg',
  './images/image-product-3.jpg',
  './images/image-product-4.jpg'
];

prevArrow.addEventListener('click', () => {
  currentIndex = currentIndex === 0 ? 3 : currentIndex - 1;
  mainImg.src = imagePaths[currentIndex];
});

nextArrow.addEventListener('click', () => {
  currentIndex = currentIndex === 3 ? 0 : currentIndex + 1;
  mainImg.src = imagePaths[currentIndex];
});

hamburger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
increaseBtn.addEventListener("click", increaseCount);
decreaseBtn.addEventListener("click", decreaseCount);