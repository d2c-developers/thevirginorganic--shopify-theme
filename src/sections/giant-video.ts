import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
document.addEventListener('DOMContentLoaded', () => {
  // Initialize video functionality
  // const videoElement = document.querySelector('video')
  // if (videoElement) {
  //   videoElement.playsInline = true
  //   videoElement.muted = true
  //   videoElement.loop = true
  //   videoElement.play()
  // }

  // Initialize mobile swiper if content blocks exist
  const swiperContainer = document.querySelector('#giant-video-swiper')
  if (swiperContainer) {
    new Swiper('#giant-video-swiper', {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      pagination: {
        el: '.swiper-pagination--giant-video',
        clickable: true
      }
    })
  }
})
