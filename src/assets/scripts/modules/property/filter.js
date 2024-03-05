import 'ion-rangeslider';
import "ion-rangeslider/css/ion.rangeSlider.min.css";
import $ from 'jquery';

$("#doubleRange").ionRangeSlider({
  skin: "big",
  min: 0,
  max: 100,
  from: 10,
  to: 90,
  type: 'double',

});
//Custom select START 
let select = function () {
  let selectHeader = document.querySelectorAll('.select__header');
  let selectItem = document.querySelectorAll('.select__item');

  selectHeader.forEach(item => {
      item.addEventListener('click', selectToggle)
  });

  selectItem.forEach(item => {
      item.addEventListener('click', selectChoose)
  });

  function selectToggle() {
      this.parentElement.classList.toggle('is-active');
  }

  function selectChoose() {
      let text = this.innerText,
          select = this.closest('.select'),
          currentText = select.querySelector('.select__current');
      currentText.innerText = text;
      select.classList.remove('is-active');

  }

};

select();
//Custom select END 