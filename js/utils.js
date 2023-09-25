export function getRandomNumbers(lenght = 1) {
  let result = [];

  while (result.length < lenght) {
    const num = Math.floor(Math.random() * lenght);
    if (!result.includes(num)) result.push(num);
  }

  return result;
}

export function getRandomItem(array = []) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * @param {{constraints: Array<'lowercase' | 'uppercase' | 'numbers' | 'symbols'>, lenght: number}} config
 * @returns {string}
 */
export function createPassword({ length = 8, constraints = [] }) {
  if (!constraints.length) return "";

  const meta = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "1234567890",
    symbols: "~@$%^&*+-/_():[]\\?¡¿{}|<>!",
  };

  let password = "";

  constraints.forEach(function (name) {
    password += getRandomItem(meta[name]);
  });

  while (password.length < length) {
    password += getRandomItem(meta[getRandomItem(constraints)]);
  }

  return getRandomNumbers(length)
    .map((pos) => password[pos])
    .join("");
}