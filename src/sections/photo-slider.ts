import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';

const swiperImages = new Swiper('#photo-slider--images', {
  slidesPerView: 1.2,
  slidesPerGroup: 1,
  loop: true,
  breakpoints: {
    1024: {
      slidesPerView: 1.6,
      allowTouchMove: false,
      preventClicks: true,
    },
  },
});

const swiperText = new Swiper('#photo-slider--text', {
  modules: [Pagination, Navigation],
  slidesPerView: 1,
  loop: true,
  pagination: {
    el: '.swiper-pagination--text',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next--text',
    prevEl: '.swiper-button-prev--text',
  },
  on: {
    slideChange: (swiper) => {
      if (swiper.swipeDirection === 'next') {
        swiperImages.slideNext();
      } else if (swiper.swipeDirection === 'prev') {
        swiperImages.slidePrev();
      }
    },
  },
});

// Desktop Navigation Controls
const nextButton = document.querySelector('.swiper-button-next--text');
const prevButton = document.querySelector('.swiper-button-prev--text');
if (nextButton) {
  nextButton.addEventListener('click', () => {
    swiperImages.slideNext();
  });
}

if (prevButton) {
  prevButton.addEventListener('click', () => {
    swiperImages.slidePrev();
  });
}

// Mobile Pagination Controls
const paginationContainer = document.querySelector('.swiper-pagination--text');
if (paginationContainer) {
  // Swiper generates pagination bullets with the class "swiper-pagination-bullet"
  const paginationButtons = paginationContainer.querySelectorAll('.swiper-pagination-bullet');
  paginationButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      swiperImages.slideTo(index);
    });
  });
}
