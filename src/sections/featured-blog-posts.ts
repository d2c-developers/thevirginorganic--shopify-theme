import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

// init Swiper:
const blogPostsSlider = new Swiper('#blog-posts-slider', {
  slidesPerView: 1.2,
  spaceBetween: 20,
  modules: [Pagination],
  pagination: {
    el: '.swiper-pagination--blog',
    clickable: true,
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});
