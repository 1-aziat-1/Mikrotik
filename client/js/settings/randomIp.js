function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const numbersGenerics = (oldOctet) => {
  let chislo = getRandomInRange(2, 254);
    if (oldOctet == chislo) {
      return numbersGenerics(oldOctet);
  }
  return chislo;
};