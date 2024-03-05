import Swiper,{Navigation} from "swiper"
import 'swiper/css';
const swiper = new Swiper ('.swiper-partners', {
  
  modules: [Navigation],
  speed: 700,
 
//  centeredSlidesBounds: true,

loop: true,
spaceBetween: 20,
slidesPerView: "auto",
  breakpoints: {
    
    768: {
      spaceBetween: 24,
    },
    1366: {
      spaceBetween: 40,
      
    },
    1920: {
      spaceBetween: 90,
      
    },
  },

  navigation: {
    prevEl: '.swiper-partners-button-prev',
    nextEl: '.swiper-partners-button-next',
  },

})