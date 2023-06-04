import './automaticMode.js';
import { createHost } from './createHost.js';
import fetchRequest from './settings/fetchRequest.js';
import { modalAdd } from './modal/modalAdd.js';
import { modalCheck } from './modal/modalChek.js';
import { modalRemove } from './modal/modalRemove.js';
import { numbersGenerics } from './settings/randomIp.js';
import { modalError } from './modal/modalErorr.js';

const btnSubmit = document.querySelector('.form__submit');
const btnAdd = document.querySelector('.btn__add');
const btnRemove = document.querySelector('.btn__remove');
const btnCheck = document.querySelector('.btn__check');
const btnHide = document.querySelector('.btn__hide');
const fromConnect = document.querySelector('.form__connect');
const overlayNew = document.querySelector('.overlayNew');
const fileBtn = document.querySelector('.file__btn');
const modeOne = document.querySelector('.title__form>label');
let ipFiles = '';

modeOne.addEventListener('click', () => {
  ipFiles = '';
  console.log(ipFiles);
});

fileBtn.addEventListener('click', () => {
  let inputFile = document.getElementById('file').files[0];
  let reader = new FileReader();
  reader.readAsText(inputFile);
  reader.onload = function() {
    ipFiles = reader.result.trim().split('\r\n');
  };
  reader.onerror = function() {
    console.log(reader.error);
  };
});

btnCheck.addEventListener('click', async () => {
  const {
    modalFormCheck,
    overlay,
  } = modalCheck();
  const hosts = [];
  const data = await fetchRequest(`/api/print`);
  for (let i = 1; i<data.length; i++){
    hosts.push(createHost(data[i]));
  }
  modalFormCheck.append(...hosts);
  document.body.append(overlay);
});

btnRemove.addEventListener('click', () => {
  document.body.append(modalRemove());
});


btnAdd.addEventListener('click', () => {
  document.body.append(modalAdd());
});


btnHide.addEventListener('click', async () => {
  const data = await fetchRequest(`/api/print`);
  const hostId = data.map(item => {
    return item[`.id`];
  });
  const newIp = data.map(({address}) => {
    let arrIp = '';
    do {
      arrIp = address.split('.');
      arrIp[3] = numbersGenerics(arrIp[3]);
      arrIp = arrIp.join('.');
    } while (data.includes(arrIp));
    return arrIp;
  });
  for (let i = 1; i<hostId.length;){
    if (ipFiles) {
      await fetchRequest(`/api/set`, 'POST', {id: hostId[i], ip: ipFiles[i-1],}).then((response) => {
        console.log(response);
        i++;
      });
    } else {
      await fetchRequest(`/api/set`, 'POST', {id: hostId[i], ip: newIp[i],}).then((response) => {
        console.log(response);
        i++;
      });
    }
  }
});

btnSubmit.addEventListener('click', async (e) => {
  e.preventDefault();
  if ((fromConnect.ip.value == '') || (fromConnect.login.value == '')) {
    fromConnect.reset();
    document.body.append(modalError());
    return;
  }
  const formData = new FormData(fromConnect);
  const data = Object.fromEntries(formData);
  await fetchRequest(`/api/connect`, 'POST', data);
});

