import 'ion-rangeslider';
import 'ion-rangeslider/css/ion.rangeSlider.min.css';
import $ from 'jquery';
import requestData from '../api';
import { useState } from '../helpers/helpers';

import { propertyCard } from "./propertyCard.js";
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, CustomEase);



const loadMoreBtn = document.querySelector("[data-more-property]")
const [property, setProperty, usePropertyEffect] = useState({
  pending: true,
  container: document.querySelector('.property__container'),
  data: [],
  part:1,
  step:3,
});

usePropertyEffect(({ data, container, part, step }) => {
    
    if(!data){
      container.innerHTML=`<p class="no-result">Нічого не знайдено</p>`;
      loadMoreBtn.style.display="none"
      return
    }
    
  if(data.length <= (step * part)){
   
      loadMoreBtn.style.display="none"
    }else {
      loadMoreBtn.style.display = 'block';
    }

  const newData = data.map(el => {  
    return propertyCard(el)}).slice(0, step * part).join('')
    
    container.innerHTML=newData;

    
});

usePropertyEffect(({ pending, container }) => {
  gsap.to(container, {
    autoAlpha: pending ? 0.5 : 1,
  });

  pending ? container.classList.add('loading') : container.classList.remove('loading');
});


if (loadMoreBtn){loadMoreBtn.addEventListener("click", function () {
  setProperty({
    ...property(),
    part: property().part + 1,
    pending: true,
  })
  setTimeout(()=> {
    setProperty({
      ...property(),
      pending: false,
    })
  }, 500)
})}

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const selectData = document.querySelectorAll('.select');
const minArea = params.get('area_MIN') ? +params.get('area_MIN') : 10;
const maxArea = params.get('area_MAX') ? +params.get('area_MAX') : 90;

$('#doubleRange').ionRangeSlider({
  skin: 'big',
  min: 0,
  max: 100,
  from: minArea,
  to: maxArea,
  type: 'double',
});

const dataSlider = $('#doubleRange').data('ionRangeSlider');
const dataForFirstRequest = {}
function getValuesByGetParams() {
  if (params.size === 0) return;
  for (const select of selectData) {
    const currentParam = params.get(select.dataset.name);
    if (!currentParam || currentParam === 'all') continue;
    const option = select.querySelector(`[data-${select.dataset.name}="${currentParam}"]`);
    if (!option) continue;
    select.dataset.value = currentParam;
    const currentText = select.querySelector('.select__current');
    currentText.innerText = option.textContent;
    dataForFirstRequest[select.dataset.name]=currentParam
  }
 
}
getValuesByGetParams();

dataForFirstRequest['area_MIN'] = dataSlider.result.from;
dataForFirstRequest['area_MAX'] = dataSlider.result.to;

if(window.location.pathname.includes("property")){requestData("property", dataForFirstRequest).then(res => {
    
    
    setProperty({
      ...property(),
      data: res.data.result,
      pending: false,
    });
  });}




//Custom select START
let select = function() {
  let selectHeader = document.querySelectorAll('.select__header');
  let selectItem = document.querySelectorAll('.select__item');

  selectHeader.forEach(item => {
    item.addEventListener('click', selectToggle);
  });

  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose);
  });

  function selectToggle() {
    this.parentElement.classList.toggle('is-active');
  }

  function selectChoose() {
    let text = this.innerText,
      select = this.closest('.select'),
      currentText = select.querySelector('.select__current');
    let value = this.getAttribute(`data-${select.dataset.name}`);
   
    select.dataset.value = value;
    currentText.innerText = text;
    select.classList.remove('is-active');
  }
};
select();

const formMain = document.querySelector('.real-estate__form');

if (formMain) {
  formMain.addEventListener('submit', function(event) {
    event.preventDefault();
    const dataObject = Array.from(selectData)
      .map(select => `${select.dataset.name}=${select.dataset.value.replace(' ', '_').trim()}`)
      .join('&');

    
    window.location.assign(
      `/property?${dataObject}&area_MIN=${dataSlider.result.from}&area_MAX=${dataSlider.result.to}`,
    );
  });
}

const formProperty = document.querySelector('.property__form');
if (formProperty) {
  formProperty.addEventListener('submit', function(event) {
    event.preventDefault();
    const dataForm = {};
    Array.from(selectData).forEach(
      select => (dataForm[select.dataset.name] = select.dataset.value),
    );
    dataForm['area_MIN'] = dataSlider.result.from;
    dataForm['area_MAX'] = dataSlider.result.to;
    Object.keys(dataForm).forEach(key => params.set(key, dataForm[key]));
    window.history.replaceState({}, '', `${url.pathname}?${params.toString()}`);
    setProperty({
        ...property(),
        pending:true,
      });
    requestData("property", dataForm).then(res => {
        
        setProperty({
          ...property(),
          data: res.data.result,
          pending:false
        });
      });
  });
}

// //Custom select END




