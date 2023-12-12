import { gsap } from 'gsap/all';
import { EasePack } from 'gsap/EasePack';

gsap.registerPlugin(EasePack);

const header = document.querySelector('.header-bg');

window.addEventListener('scroll', function headerSquosh() {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 20) {
    header.classList.add('scroll-down');
  } else {
    header.classList.remove('scroll-down');
  }
});
//pop up call us
document.body.addEventListener('click', function(evt) {
  const target = evt.target.closest('[data-call-us-modal-close]');
  const form = evt.target.closest('[data-call-us-modal]');
  const btn = evt.target.closest('[data-call-us-btn]');
  const container = evt.target.closest('.call-us__container');
  const countryList = evt.target.closest('.iti__country-list');

  if (btn) {
    if (document.querySelector('[data-call-us-modal]').classList.contains('hidden')) {
      window.dispatchEvent(new Event('stop-scroll'));
      return document.querySelector('[data-call-us-modal]').classList.remove('hidden');
    }
    return;
  }
  if (target) {
    window.dispatchEvent(new Event('start-scroll'));
    return document.querySelector('[data-call-us-modal]').classList.add('hidden');
  }
  if (!container && !target && !btn && !countryList) {
    window.dispatchEvent(new Event('start-scroll'));
    return document.querySelector('[data-call-us-modal]').classList.add('hidden');
  }
});

//menu
const openMenuBtn = document.querySelector('.menu-btn__burger');
const menuRef = document.querySelector('.menu__container');
const headerBg = document.querySelector('.header-bg');
const tl = gsap.timeline();
tl.add(() => {
  window.dispatchEvent(new Event('start-scroll'));
})
  .add(() => {
    window.dispatchEvent(new Event('stop-scroll'));
  })
  .add(() => {
    headerBg.classList.add('scroll-down');
  })
  .add(() => {
    headerBg.classList.remove('scroll-down');
  })

  .to(headerBg, { backgroundColor: 'transparent', duration: 0.1 }, '<')
  .to('.language__item', { color: '#fff' }, '<')
  .to(' .header .call-us__btn', { borderColor: '#fff', color: '#fff' }, '<')
  .to('.call-us__btn .mode--mobile path', { stroke: '#fff' }, '<')
  .to('.header .general-btn', { backgroundColor: '#fff', color: '#2A4635' }, '<')
  .to('.general-btn .mode--mobile path', { stroke: '#2a4635' }, '<')
  .to('.header__logo svg path', { fill: '#fff' }, '<')
  .to('.menu-btn__burger', { borderColor: '#fff' }, '<')
  .to(
    '.menu-btn__burger .line-under',
    { rotate: -45, yPercent: -190, duration: 0.5, backgroundColor: '#fff' },
    '<',
  )
  .to(
    '.menu-btn__burger .line-over',
    { rotate: 45, yPercent: 190, duration: 0.5, backgroundColor: '#fff' },
    '<',
  )
  .to(
    menuRef,
    {
      maxHeight: '100vh',
      duration: 0.5,
      opacity: 1,
      ease: 'expo.inOut',
      pointerEvents: 'all',
    },
    '<',
  )
  .from('.menu__title-wrap', { opacity: 0, width: 0, duration: 0.7 }, '<')
  // .from('.nav__link', { yPercent: 100, duration: 0.5 }, '<0.2')
  .from('.header__contacts-container ', { xPercent: 100, opacity: 0, duration: 0.5 }, '<');

tl.reverse();

openMenuBtn.addEventListener('click', () => {
  tl.reversed(!tl.reversed());
});
//SubMenu
const subNavBtn = document.querySelector('.sub-nav');
subNavBtn.addEventListener('click', () => {
  subNavBtn.classList.toggle('show-sub');
});

//Footer

const titleWrapSubNav = document.querySelectorAll('.sub-nav__title-wrap');
const subNavList = document.querySelector('.sub-nav__list');

titleWrapSubNav.forEach(el =>
  el.addEventListener('click', () => {
    console.log('click');
    el.closest('.sub-nav').classList.toggle('is-visible');
  }),
);
