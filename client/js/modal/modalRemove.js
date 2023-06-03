import fetchRequest from "../fetchRequest.js";
import { modalError } from "./modalErorr.js";
import { modalSuccess } from "./modalSuccess.js";

export const modalRemove = () => {
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
  modalText.className = 'modal__text';
  modalText.textContent = 'Удалить узел';
  
  modalWrapper.append(modalText);

  const modalForm = document.createElement('div');
  modalForm.className = 'modal__form';

  const modalWrapperForm = document.createElement('div');
  modalWrapperForm.className = 'modal__wrapper__form';

  const modalLabelNum =  document.createElement('div');
  modalLabelNum.className = 'modal__label';

  const labelItemNum =  document.createElement('label');
  labelItemNum.textContent = 'Номер узла'

  const inputItemNum =  document.createElement('input');
  inputItemNum.type = 'text';

  modalLabelNum.append(labelItemNum, inputItemNum);

  modalWrapperForm.append(modalLabelNum);

  const modalBtn =  document.createElement('button');
  modalBtn.className = 'modal_button btn';
  modalBtn.textContent = 'Удалить';

  modalForm.append(modalWrapperForm, modalBtn);
  
  modalContainer.append(modalWrapper, modalForm, modalClose);
  modal.append(modalContainer);

  overlay.append(modal);

  modalBtn.addEventListener('click', async () => {
    if (inputItemNum.value === '') return;
    const data = {
      id: inputItemNum.value
    }
    const response = await fetchRequest(`/api/remove`, 'POST', data);
    if (await response === '') {
      overlay.remove();
      document.body.append(modalSuccess());
    }
    if (await response.status === 404) {
      overlay.remove();
      document.body.append(modalError());
    }
  });

  overlay.addEventListener('click', ({ target }) => {
    if (target.classList.contains('modal__close') ||
    !target.closest('.modal')) {
      overlay.remove();
    }
  });
  
  return overlay;
};