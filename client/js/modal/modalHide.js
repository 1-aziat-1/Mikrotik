import preload from "../preloader.js";

export const modalHide = () => {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  const modal = document.createElement('div');
  modal.className = 'modal';
  
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal__container';
  
  const modalClose = document.createElement('span');
  modalClose.className = 'modal__close';

  const modalWrapper = document.createElement('div');
  modalWrapper.className = 'modal__modalWrapper';

  const modalText = document.createElement('p');
  modalText.className = 'modal__text modal__text--succees';
  modalText.textContent = '';
  modalWrapper.append(modalText);
  
  modalContainer.append(modalWrapper, modalClose);

  modal.append(modalContainer);
  
  overlay.append(modal);

  overlay.addEventListener('click', ({ target }) => {
    if (target.classList.contains('modal__close') ||
    !target.closest('.modal')) {
      overlay.remove();
    }
  });

  return {
    overlay,
    modalText,
  };
};