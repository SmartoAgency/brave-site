import Swiper, { Autoplay, EffectFade } from 'swiper';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

import { initSmoothScrolling } from '../modules/scroll/leniscroll';
import '../modules/helpers/imgParallax';
import "../modules/property/filter"


initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);

const swiper = new Swiper('.swiper-projects', {
  modules: [Navigation],
  speed: 1000,
  spaceBetween: 20,
  slidesPerView: 4,
  breakpoints: {
    // when window width is >= 320px
    360: {
      slidesPerView: 1,
      
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
      
    },
    1366: {
      
      slidesPerView: 4,
    },
  },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
});




//Custom select END 