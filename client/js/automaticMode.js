const titleForm = document.querySelectorAll('.title__form>label');
const interfaceFile = document.querySelector('.interface__file');
titleForm.forEach(item => {
  item.addEventListener('click', () => {
    if (item.className == 'two') {
    interfaceFile.style.display = 'block';
    } else {
      interfaceFile.style.display = 'none';
    }
  })
})