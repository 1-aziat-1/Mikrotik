function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numbersGeneretics = (markArr, max) => {
  for (let i = 0; numberArr.length < 6;) {
    let maxElement = 0;
    if (markArr[i] !== 'dataFive') {
      maxElement = max * 20;
    } else {
      maxElement = max * 10;
    }
    let chislo = getRandomInRange(0, maxElement - 1);
    if (!numberArr.includes(chislo)) {
      i++;
      numberArr.push(chislo)
    }
  }
  return numberArr;
};