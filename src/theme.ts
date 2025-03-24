// @reduce swiper bundle css size
import posthog from 'posthog-js';
import 'swiper/css/bundle';
import './theme.css';
import './sections/site-cart-drawer';

// @TODO: move these to section entries in webpack config and load in own section files
import './sections/photo-slider';
import './sections/giant-video';
import './sections/featured-blog-posts';

if (!window.location.host.includes('127.0.0.1') && !window.location.host.includes('localhost')) {
  posthog.init('phc_d6xF80cONY0CQ5CuqmdESKaYH2uVdziatZfllxxNJ7n', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  });
}
