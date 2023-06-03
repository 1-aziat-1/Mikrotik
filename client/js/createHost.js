export const createHost = ({'.id':id, 'address':ip}) => {
  const modalFromItem = document.createElement('div');
  modalFromItem.className = 'modal__form-knot';

  const modalItemWrapperID = document.createElement('div');

  const modalNum = document.createElement('p');
  modalNum.className = 'modal__num';
  modalNum.textContent = `${id}`.slice(1);

  modalItemWrapperID.append(modalNum);

  const modalItemWrapperIP = document.createElement('div');

  const modalIp = document.createElement('p');
  modalIp.className = 'modal__ip';
  modalIp.textContent = `${ip}`;

  modalItemWrapperIP.append(modalIp);

  modalFromItem.append(modalItemWrapperID,modalItemWrapperIP);
  
  return modalFromItem;
};