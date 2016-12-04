import { input } from './4-input-data';

const parsePossibleRoomInput = (possibleRoomInput: string) => {
  const roomParts = possibleRoomInput.split('-');
  const sectorAndHash = roomParts[roomParts.length - 1];
  const hash = sectorAndHash.substr(sectorAndHash.length - 6, 5);
  const sector = sectorAndHash.split('[')[0];
  const roomLetters = roomParts.slice(0, roomParts.length - 1).join('').replace('-', '');
  return {
    hash,
    sector,
    roomLetters
  }
};

const possibleRooms: string[] = input.split('\n');
let sum: number = 0;
possibleRooms.forEach(possibleRoom => {
  const { roomLetters, sector, hash } = parsePossibleRoomInput(possibleRoom);

  const letterFrequencyMap: Map<string, number> = roomLetters.split('').reduce((map, letter) => 
     map.has(letter) ? map.set(letter, map.get(letter) + 1) : map.set(letter, 1), new Map<string, number>());

  const topFiveFrequentLetters: string = Array.from(letterFrequencyMap)
    .sort((a, b) => (a[1] - b[1] === 0) ? a[0].charCodeAt(0) - b[0].charCodeAt(0) : b[1] - a[1]).slice(0, 5)
    .map(letterCount => letterCount[0])
    .join('');

  if (topFiveFrequentLetters === hash) {
    sum += parseInt(sector);

    const roomName: string = roomLetters.split('').map(letter => {
      const diff = parseInt(sector) % 26;
      const curCharCode = letter.charCodeAt(0);
      const newCharCode = curCharCode + diff > 122 ? 96 + ((curCharCode + diff) - 122) : curCharCode + diff;
      return String.fromCharCode(newCharCode);
    }).join('');

    if (roomName.includes('north')) {
      console.log(roomName, sector);
    }
  }
});

console.log(`SectorID Sum: ${sum}`);
