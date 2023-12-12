import Swiper, { Autoplay, EffectFade } from 'swiper';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import { initSmoothScrolling } from '../modules/scroll/leniscroll';
import '../modules/helpers/imgParallax';

initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);

// const swiper = new Swiper('.swiper', {
//   modules: [Navigation],
//   speed: 1000,

//   autoplay: 1000,
//   spaceBetween: 50,
//   slidesPerView: 1.9,
//   breakpoints: {
//     // when window width is >= 320px
//     360: {
//       slidesPerView: 1.1,
//       spaceBetween: 8,
//     },
//     // when window width is >= 480px
//     768: {
//       slidesPerView: 1.3,
//       spaceBetween: 20,
//     },
//     1366: {
//       spaceBetween: 50,
//       slidesPerView: 1.9,
//     },
//   },
//   navigation: {
//     prevEl: '.swiper-button-prev',
//     nextEl: '.swiper-button-next',
//   },
// });

// const swiperProgress = new Swiper('.swiper-progress', {
//   modules: [Navigation],
//   speed: 1000,
//   breakpoints: {
//     // when window width is >= 320px
//     360: {
//       slidesPerView: 1.1,
//       spaceBetween: 8,
//     },
//     // when window width is >= 480px
//     768: {
//       slidesPerView: 1.6,
//       spaceBetween: 16,
//     },
//     1366: {
//       spaceBetween: 50,
//       slidesPerView: 2.2,
//     },
//   },
//   spaceBetween: 50,
//   slidesPerView: 2.2,
//   navigation: {
//     prevEl: '.swiper-button-prev',
//     nextEl: '.swiper-button-next',
//   },
// });
// const swiperLuxary = new Swiper('.swiper-luxary', {
//   modules: [Navigation, EffectFade, Autoplay],
//   speed: 1000,
//   effect: 'fade',
//   autoplay: {
//     delay: 2500,
//   },
//   spaceBetween: 50,
//   on: {
//     activeIndexChange: function() {
//       gsap
//         .timeline()
//         .from('.bg-img__title', {
//           delay: 0.7,
//           yPercent: -100,
//           opacity: 0,
//           duration: 0.5,
//         })
//         .from(
//           '.bg-img__text',
//           {
//             yPercent: 100,
//             opacity: 0,
//             duration: 0.5,
//           },
//           '<',
//         );
//     },
//   },
//   // navigation: {
//   //   prevEl: '.swiper-button-prev',
//   //   nextEl: '.swiper-button-next',
//   // },
// });
