import md5 = require('md5');
const input = 'uqwqemis';

const calculateHash = (s: string, idx: number) => md5(s + idx);

const setCharAt = (str: string, index: number, chr: string): string =>
  (index > str.length-1) ? str : (str.substr(0,index) + chr + str.substr(index+1));

const getNextUsableChar = (input: string, counter: number) => {
  let hash = calculateHash(input, counter);
  while (!hash.startsWith('00000')) {
    hash = calculateHash(input, ++counter);
  }
  const position = parseInt(hash[5]);
  const value = hash[6];
  return {
    position,
    lastIndexUsed: counter,
    hash,
    value,
  };
};

const run = (input: string, passwordLength: number): string => {
  let password: string = '#'.repeat(passwordLength);
  let counter = 0;
  while (password.includes('#')) {
    const { position, value, lastIndexUsed, hash } = getNextUsableChar(input, counter);
    if (position >= 0 && password.charAt(position) === '#') {
      password = setCharAt(password, position, value);
      console.log(`FOUND! Value:${value}, Position:${position}, Hash:${hash}, Counter:${lastIndexUsed}`);
      console.log(`Current password: ${password}`);
    }
    counter = lastIndexUsed + 1;
  };
  return password;
};

console.log('Running...This may take a minute.');
const password = run(input, 8);
console.log(`Found password: ${password}`);
