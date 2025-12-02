import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

// Declare PostHog global type
declare global {
  interface Window {
    posthog?: any;
  }
}

(() => {
  // init Swiper:
  // const productSlider = new Swiper('#product-slider', {
  //   slidesPerView: 1,
  //   spaceBetween: 20,
  //   modules: [Pagination],
  //   pagination: {
  //     el: '.swiper-pagination--product',
  //     clickable: true,
  //   },
  //   breakpoints: {
  //     1024: {
  //       enabled: false,
  //       slidesPerView: 1,
  //     },
  //   },
  // });

  // // Handle resize events to enable/disable swiper
  // const handleResize = () => {
  //   if (window.innerWidth >= 1024) {
  //     productSlider.activeIndex = 0;
  //     productSlider.disable();
  //   } else {
  //     productSlider.enable();
  //   }
  // };

  // // Add resize listener
  // window.addEventListener('resize', handleResize);

  // // Initial check
  // handleResize();

  // Initialize thumbnail swiper first
  const swiperThumbs = new Swiper('.swiper-thumbnails', {
    direction: 'vertical',
    slidesPerView: 'auto',
    spaceBetween: 9,
    watchSlidesProgress: true,
    freeMode: false,
    breakpoints: {
      768: {
        slidesPerView: 5,
      },
    },
  });

  // Initialize main swiper
  const swiperMain = new Swiper('#product-slider', {
    spaceBetween: 10,
    thumbs: {
      swiper: swiperThumbs,
    },
  });

  // Add click functionality to thumbnails with auto-scroll behavior
  swiperThumbs.slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      swiperMain.slideTo(index);

      // Auto-scroll thumbnail slider when clicking first or last visible thumbnail
      const visibleStart = swiperThumbs.activeIndex;
      const visibleEnd = visibleStart + 4; // 5 thumbnails visible (0-4)

      if (index === visibleStart && index > 0) {
        // Clicked on first visible thumbnail and it's not the very first one
        swiperThumbs.slidePrev();
      } else if (index === visibleEnd && index < swiperThumbs.slides.length - 1) {
        // Clicked on last visible thumbnail and it's not the very last one
        swiperThumbs.slideNext();
      }
    });
  });

  // Update active thumbnail styling
  swiperMain.on('slideChange', function () {
    const activeIndex = this.activeIndex;

    // Remove active class from all thumbnails
    swiperThumbs.slides.forEach((slide) => {
      slide.querySelector('img').classList.remove('border-blue-500');
      slide.querySelector('img').classList.add('border-transparent');
    });

    // Add active class to current thumbnail
    if (swiperThumbs.slides[activeIndex]) {
      swiperThumbs.slides[activeIndex].querySelector('img').classList.add('border-blue-500');
      swiperThumbs.slides[activeIndex].querySelector('img').classList.remove('border-transparent');
    }

    // Auto-scroll thumbnails to keep active thumbnail visible
    const slideSize = swiperThumbs.slidesSizesGrid[0] || 0;
    const spaceBetween = Number(swiperThumbs.params.spaceBetween) || 0;
    const visibleStart = Math.floor(Math.abs(Number(swiperThumbs.translate)) / (slideSize + spaceBetween));
    const visibleEnd = visibleStart + 4;

    if (activeIndex < visibleStart) {
      swiperThumbs.slideTo(activeIndex);
    } else if (activeIndex > visibleEnd) {
      swiperThumbs.slideTo(activeIndex - 4);
    }
  });

  // Set initial active thumbnail
  if (swiperThumbs.slides[0]) {
    swiperThumbs.slides[0].querySelector('img').classList.add('border-blue-500');
    swiperThumbs.slides[0].querySelector('img').classList.remove('border-transparent');
  }
})();
