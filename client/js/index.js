import './automaticMode.js';
import { createHost } from './createHost.js';
import fetchRequest from './fetchRequest.js';
import { modalAdd } from './modal/modalAdd.js';
import { modalCheck } from './modal/modalChek.js';
import { modalError } from './modal/modalErorr.js';
import { modalHide } from './modal/modalHide.js';
import { modalRemove } from './modal/modalRemove.js';
import { modalSuccess } from './modal/modalSuccess.js';
import preload from './preloader.js';

const btnSubmit = document.querySelector('.form__submit');
const btnAdd = document.querySelector('.btn__add');
const btnRemove = document.querySelector('.btn__remove');
const btnCheck = document.querySelector('.btn__check');
const btnHide = document.querySelector('.btn__hide');
const inputForm = document.querySelectorAll('.label__wrapper>input');
const overlayNew = document.querySelector('.overlayNew');


btnCheck.addEventListener('click', async () => {
  const {
    modalFormCheck,
    overlay,
  } = modalCheck();
  const data = await fetchRequest(`/api/print`);
  const hosts = data.map(item => {
    const host = createHost(item);
    return host;
  });
  console.log(hosts);
  modalFormCheck.append(...hosts);
  document.body.append(overlay);
});

btnRemove.addEventListener('click', () => {
  document.body.append(modalRemove());
});


// btnSubmit.addEventListener('click', () => {
//   // if ((inputForm[0].value == '10.0.0.11')|| (inputForm[0].value == '111')) {
//   //   document.body.append(modalError());
//   // } else {
//   //   document.body.append(modalSuccess());
//   // }
//   // inputForm.forEach(item => {
//   //   item.value = ''
//   // });
//   await fetchRequest(`/api/print`,'POST', data);
//   console.log(data);
// });

btnAdd.addEventListener('click', () => {
  document.body.append(modalAdd());
});





// overlayNew.addEventListener('click', ({ target }) => {
//   if (target.classList.contains('modal__close') ||
//   !target.closest('.modal')) {
//     overlayNew.classList.add('no-active');
//     overlayNew.classList.remove('is-active');
//   }
// });

// const {
//   overlay,
//   modalText,
// } = modalHide();

// btnHide.addEventListener('click', () => {
//   modalText.textContent = '';
//   document.body.append(overlay);
//   preload.show(overlay);
//   setTimeout(() => {
//     preload.remove();
//     modalText.textContent = 'Маскирование завершено';
//   }, 1500);
// });
