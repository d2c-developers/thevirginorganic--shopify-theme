import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles


// init Swiper:
const swiper = new Swiper('#photo-slider--images', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],
  slidesPerView: 1.6,
  spaceBetween: 20,
});
