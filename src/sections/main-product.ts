import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

(() => {
  // init Swiper:
  const productSlider = new Swiper('#product-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    modules: [Pagination],
    pagination: {
      el: '.swiper-pagination--product',
      clickable: true,
    },
    breakpoints: {
      1024: {
        enabled: false,
        slidesPerView: 1,
      },
    },
  });

  // Handle resize events to enable/disable swiper
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      productSlider.activeIndex = 0;
      productSlider.disable();
    } else {
      productSlider.enable();
    }
  };

  // Add resize listener
  window.addEventListener('resize', handleResize);

  // Initial check
  handleResize();
})();
