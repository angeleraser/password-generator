function getRandomIndexes(length = 1) {
  let result = [];

  while (result.length < length) {
    const num = Math.floor(Math.random() * length);
    if (!result.includes(num)) result.push(num);
  }

  return result;
}

function getRandomItem(array = []) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * @param {{length: number,constraints: Array<'lowercase' | 'uppercase' | 'numbers' | 'symbols'>}} config
 */
export function createPassword(config) {
  const { constraints, length } = config;

  if (!constraints.length || length <= 0) return "";

  const meta = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "1234567890",
    symbols: "~@$%^&*+-/_():[]\\?¡¿{}|<>!",
  };

  let result = "";
  
  constraints.forEach((name) => (result += getRandomItem(meta[name])));

  while (result.length < length)
    result += getRandomItem(meta[getRandomItem(constraints)]);

  return getRandomIndexes(length)
    .map((position) => result[position])
    .join("");
}
