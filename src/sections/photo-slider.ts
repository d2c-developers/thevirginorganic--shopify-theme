import Swiper from 'swiper';


// init Swiper:
const swiperImages = new Swiper('#photo-slider--images', {
  slidesPerView: 1.2,
  breakpoints: {
    1024: {
      slidesPerView: 1.6,
    },
  },
});

const swiperText = new Swiper('#photo-slider--text', {
  slidesPerView: 1,
});
