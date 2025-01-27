import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';


// init Swiper:
const swiperImages = new Swiper('#photo-slider--images', {
  slidesPerView: 1.2,
  // loop: true,
  on: {
    slideChange: (swiper) => {
      swiperText?.slideTo(swiper.activeIndex);
    },
  },
  breakpoints: {
    1024: {
      slidesPerView: 1.6,
      allowTouchMove: false,
      preventClicks: true,
    },
  },
});

const swiperText = new Swiper('#photo-slider--text', {
  slidesPerView: 1,
  // loop: true,
  modules: [Pagination, Navigation],
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
      swiperImages.slideTo(swiper.activeIndex);
    },
  },
});
