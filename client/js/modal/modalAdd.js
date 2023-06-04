import fetchRequest from "../settings/fetchRequest.js";
import { modalError } from "./modalErorr.js";
import { modalSuccess } from "./modalSuccess.js";

export const modalAdd = () => {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  const modal = document.createElement('div');
  modal.className = 'modal';
  
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal__container';
  
  const modalClose = document.createElement('span');
  modalClose.className = 'modal__close';

  const modalText = document.createElement('p');
  modalText.className = 'modal__text';
  modalText.textContent = 'Добавить узел';

  const modalForm = document.createElement('form');
  modalForm.className = 'modal__form form';
  modalForm.id = 'form';
  modalForm.method = 'POST';

  const formContainer = document.createElement('div');
  formContainer.className = 'form__container';

  const fieldsetIP = document.createElement('fieldset');
  fieldsetIP.className = 'form__item';
  fieldsetIP.innerHTML = `
    <label for="ip" class="form__item-title">IP</label>
    <input class="form__item-input" id="ip" name="ip" type="text" required>
  `;

  const fieldsetMAC = document.createElement('fieldset');
  fieldsetMAC.className = 'form__item';
  fieldsetMAC.innerHTML = `
    <label for="mac" class="form__item-title">MAC</label>
    <input class="form__item-input" id="mac" name="mac" type="text" required>
  `;

  const fieldsetETH = document.createElement('fieldset');
  fieldsetETH.className = 'form__item name';
  fieldsetETH.innerHTML = `
    <label for="ETH" class="form__item-title">Interface</label>
    <input class="form__item-input" id="eth" name="eth" type="text" required>
  `;

  formContainer.append(fieldsetIP, fieldsetMAC, fieldsetETH);

  modalForm.append(formContainer);

  const modalBtn = document.createElement('button');
  modalBtn.className = 'modal_button btn';
  modalBtn.setAttribute('form', 'form');
  modalBtn.type = 'submit';
  modalBtn.textContent = 'Добавить';

  modalContainer.append(modalText, modalForm, modalBtn, modalClose);

  modal.append(modalContainer);
  
  overlay.append(modal);

  modalBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const formData = new FormData(modalForm);
    const data = Object.fromEntries(formData);
    data.eth = `ether${data.eth}`;
    const response = await fetchRequest(`/api/add`, 'POST', data);
    if (await response.status === 400) {
      overlay.remove();
      document.body.append(modalError());
    }
    if (await response.complete) {
      overlay.remove();
      document.body.append(modalSuccess());
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