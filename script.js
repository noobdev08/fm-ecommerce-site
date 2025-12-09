// SELECTORS
let hamburger     = document.querySelector('.hamburger');
let closeBtn      = document.querySelector('.close-hamburger');
let mobileMenu    = document.querySelector('.nav-left ul');
let overlay       = document.querySelector('.overlay');

let counterVar    = document.querySelector(".counter-text");
let increaseBtn   = document.querySelector(".icon-plus");
let decreaseBtn   = document.querySelector(".icon-minus");

let mainImg       = document.querySelector(".main-img");
let thumbnails    = document.querySelectorAll(".thumbnail");
let mainThumbnail = document.querySelector(".main-thumb");

const cartIcon        = document.querySelector(".cart");
const cartBadge       = document.querySelector('.cart-badge');
const addBtn          = document.querySelector('.cart-section button');
const cartDropdown    = document.querySelector('.cart-show');

const prevArrow   = document.querySelector('.arrows img:first-child');
const nextArrow   = document.querySelector('.arrows img:last-child');

const lightbox        = document.querySelector('.lightbox');
const lightboxImg     = document.querySelector('.lightbox-img');
const lightboxThumbs  = document.querySelectorAll('.lightbox-thumbs img');
const lightboxClose   = document.querySelector('.lightbox-close');
const lightboxPrev    = document.querySelector('.lightbox-prev');
const lightboxNext    = document.querySelector('.lightbox-next');

let counter       = 0;
let currentIndex  = 0;
let lightboxIndex = 0;

// INITIAL STATE
mainThumbnail.classList.add("active");

// IMAGE PATHS
const imagePaths = [
  './images/image-product-1.jpg',
  './images/image-product-2.jpg',
  './images/image-product-3.jpg',
  './images/image-product-4.jpg'
];

// COUNTER FUNCTIONS
let increaseCount = () => {
    counter++;
    counterVar.textContent = counter;
}

let decreaseCount = () => {
    if (counter == 0) return;
    counter--;
    counterVar.textContent = counter;
}

// MOBILE MENU
const openMenu = () => {
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
};

const closeMenu = () => {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
};

// THUMBNAILS
thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
        thumbnails.forEach((t) => t.classList.remove("active"));
        thumbnail.classList.add("active");
        mainImg.src = thumbnail.src.replace("-thumbnail", "");
        currentIndex = Array.from(thumbnails).indexOf(thumbnail); // keep index in sync
    })
});

// ADD TO CART
addBtn.addEventListener('click', () => {
  if (counter === 0) return;

  let totalInCart = Number(cartBadge.textContent) + counter;

  cartBadge.textContent = totalInCart;
  cartBadge.classList.add('show');

  updateCart(totalInCart);

  // Reset counter after adding
  counter = 0;
  counterVar.textContent = '0';
});

// MOBILE ARROWS
prevArrow.addEventListener('click', () => {
  currentIndex = currentIndex === 0 ? 3 : currentIndex - 1;
  mainImg.src = imagePaths[currentIndex];
});

nextArrow.addEventListener('click', () => {
  currentIndex = currentIndex === 3 ? 0 : currentIndex + 1;
  mainImg.src = imagePaths[currentIndex];
});

// LIGHTBOX
const openLightbox = () => {
  lightboxIndex = currentIndex;
  lightboxImg.src = imagePaths[lightboxIndex];
  lightboxThumbs.forEach((t, i) => {
    t.classList.toggle('thumb-active', i === lightboxIndex);
  });
  lightbox.classList.add('active');
};

const closeLightbox = () => lightbox.classList.remove('active');

mainImg.addEventListener('click', openLightbox);
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

lightboxPrev.addEventListener('click', () => {
  lightboxIndex = lightboxIndex === 0 ? 3 : lightboxIndex - 1;
  lightboxImg.src = imagePaths[lightboxIndex];
  lightboxThumbs.forEach((t, i) => t.classList.toggle('thumb-active', i === lightboxIndex));
});

lightboxNext.addEventListener('click', () => {
  lightboxIndex = lightboxIndex === 3 ? 0 : lightboxIndex + 1;
  lightboxImg.src = imagePaths[lightboxIndex];
  lightboxThumbs.forEach((t, i) => t.classList.toggle('thumb-active', i === lightboxIndex));
});

lightboxThumbs.forEach((thumb, i) => {
  thumb.addEventListener('click', () => {
    lightboxIndex = i;
    lightboxImg.src = imagePaths[i];
    lightboxThumbs.forEach((t, idx) => t.classList.toggle('thumb-active', idx === i));
  });
});

// CART UPDATE FUNCTION 
function updateCart(quantity = 0) {
  const innerCart = document.querySelector('.inner-cart');

  if (quantity <= 0) {
    innerCart.innerHTML = '<p>Your cart is empty</p>';
    innerCart.classList.remove('has-items');
    cartBadge.classList.remove('show');
    cartBadge.textContent = '0';
  } else {
    innerCart.innerHTML = `
      <div class="cart-item">
        <div class="cart-img"></div>
        <div class="desc">
          <p>Fall Limited Edition Sneakers</p>
          <p>$125.00 x ${quantity} <strong>$${(125 * quantity).toFixed(2)}</strong></p>
        </div>
        <img src="./images/icon-delete.svg" alt="Delete" class="cart-delete">
      </div>
      <button class="checkout-btn">Checkout</button>
    `;
    innerCart.classList.add('has-items');

    document.querySelector('.cart-delete').addEventListener('click', () => {
      updateCart(0);
      counter = 0;
      counterVar.textContent = '0';
    });
  }
}

// EVENT LISTENERS
hamburger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

increaseBtn.addEventListener("click", increaseCount);
decreaseBtn.addEventListener("click", decreaseCount);

cartIcon.addEventListener('click', () => {
  cartDropdown.classList.toggle('is-visible');
});