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
      slidesPerGroup:1
      
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
      slidesPerGroup:2
    },
    1366: {
      
      slidesPerView: 4,
      slidesPerGroup:4,
    },
  },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
});

//Projects Starts


import { useState } from '../modules/helpers/helpers.js';
import requestData from '../modules/api.js';
import { projectCard } from '../modules/projects/projectCard.js';

const currentSlideShow = document.querySelector('[data-first-digit]');
const totalSlides = document.querySelector('[data-total]')



const [projects, setProjects, useProjectsEffect] = useState({
  pending: false,
  type: 'all',
  container: document.querySelector('.projects-list '),
  data: [],
  
});
function currentSlide (index) {

}
useProjectsEffect(({ data, container, type}) => {
 
  const dataFiltredByType = type==="all"? data : data.filter(el =>  el.card.type === type);
  totalSlides.textContent = dataFiltredByType.length < 10?"0"+ dataFiltredByType.length: dataFiltredByType.length;
  const firstDigit = window.innerWidth >1366? swiper.realIndex + 4:swiper.realIndex + 2
  currentSlideShow.textContent = firstDigit.length >2?firstDigit: "0"+ firstDigit;
  const newData = dataFiltredByType
    .map(el => {
      return projectCard(el);
    }).join('');
  container.innerHTML = newData; 

  swiper.update()
  swiper.slideTo(0)
});

useProjectsEffect(({ pending, container }) => {
  gsap.to(container, {
    autoAlpha: pending ? 0.5 : 1,
  });

  pending ? container.classList.add('loading') : container.classList.remove('loading');
});



requestData("projects", {type:"all"}).then(res => {
  setProjects({
    ...projects(),
    data: res.data.result,
  });
});



const filterBtnWraper = document.querySelector(".projects__filter")
filterBtnWraper.addEventListener('click', evt => {
  const target = evt.target.closest('[data-projects-type-button]');
  
  filterBtnWraper.querySelectorAll('[data-projects-type-button]').forEach(el => {
    if (el === target) { 
      const type = target.getAttribute('data-projects-type-button');
      el.classList.add('active');
      
        setProjects({
          ...projects(),
          type,
          pending: true,
          
        });
        setTimeout(()=> {
          setProjects({
            ...projects(),
            
            pending: false,
          });
        }, 500)
    }
    if (el !== target) el.classList.remove('active');
  });
});




swiper.on('activeIndexChange', self => {
  
  const firstDigit = window.innerWidth >1366? self.realIndex + 4:self.realIndex + 2
  const splitedIndex =  firstDigit.length >2?firstDigit: "0"+ firstDigit;
  gsap
    .timeline()
    .fromTo(currentSlideShow, { yPercent: 0 }, { yPercent: 100 })
    .add(() => {
      currentSlideShow.textContent = splitedIndex;
    })
    .fromTo(currentSlideShow, { yPercent: -100 }, { yPercent: 0 });
});