function getRandomNumbers(lenght = 1) {
  let result = [];

  while (result.length < lenght) {
    const num = Math.floor(Math.random() * lenght);
    if (!result.includes(num)) result.push(num);
  }

  return result;
}

function getRandomItem(array = []) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * @param {{constraints: Array<'lowercase' | 'uppercase' | 'numbers' | 'symbols'>, lenght: number}} config
 */
export function createPassword({ length = 8, constraints = [] }) {
  if (!constraints.length) return "";

  const meta = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "1234567890",
    symbols: "~@$%^&*+-/_():[]\\?¡¿{}|<>!",
  };

  let result = "";

  constraints.forEach((name) => (result += getRandomItem(meta[name])));

  while (result.length < length) {
    result += getRandomItem(meta[getRandomItem(constraints)]);
  }

  return getRandomNumbers(length)
    .map((pos) => result[pos])
    .join("");
}
