export const modalCheck = () => {
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
  modalText.textContent = 'Узлы в сети';

  const modalFormCheck = document.createElement('div');
  modalFormCheck.className = 'modal__form-check';
  
  const modalFromItem = document.createElement('div');
  modalFromItem.className = 'modal__form-knot';

  const modalItemWrapperID = document.createElement('div');

  const modalNum = document.createElement('p');
  modalNum.className = 'modal__num';
  modalNum.textContent = 'ID';

  modalItemWrapperID.append(modalNum);

  const modalItemWrapperIP = document.createElement('div');

  const modalIp = document.createElement('p');
  modalIp.className = 'modal__ip';
  modalIp.textContent = 'IP';

  modalItemWrapperIP.append(modalIp);

  modalFromItem.append(modalItemWrapperID,modalItemWrapperIP);

  modalFormCheck.append(modalFromItem);
  
  modalWrapper.append(modalText,modalFormCheck);
  
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
    modalFormCheck,
    overlay,
  };
};