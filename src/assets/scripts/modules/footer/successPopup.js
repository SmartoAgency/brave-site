import { popupFactory } from './popupFactory';

export const successPopup = popupFactory(document.querySelector('.thank-you-popup'));

const closeAllBtnRef = document.querySelector('.thank-you-popup__button');

closeAllBtnRef.addEventListener('click', () => {
  successPopup.close();
});
