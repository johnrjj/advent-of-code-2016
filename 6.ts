import { input } from './6-input-data';

const signals: string[] = input.split('\n');

interface IDecoder {
  [index: string]: Map<string, number>;
};

const findMessageFromSignals = (signals: string[]) => {
  const frequencyMapPerCharacterIndex = signals.reduce((accum: IDecoder, signal: string) => {
    signal.split('').forEach((char, idx) => {
      if (!accum[idx]) {
        accum[idx] = new Map<string, number>();
      } 
      if (accum[idx].has(char)) {
        accum[idx].set(char, accum[idx].get(char) + 1);
      } else {
        accum[idx].set(char, 0);
      }
    });
    return accum;
  }, {});

  let mostCommonCharAnswer = '';
  let leastCommonCharAnswer = '';
  Object.keys(frequencyMapPerCharacterIndex).forEach(indexNumber => {
    const letterMappingAscending: Array<[string, number]> = Array.from(frequencyMapPerCharacterIndex[indexNumber]).sort((a, b) => a[1] - b[1]);
    leastCommonCharAnswer += letterMappingAscending[0][0];
    mostCommonCharAnswer += letterMappingAscending[letterMappingAscending.length - 1][0];
  });

  return {
    part1: mostCommonCharAnswer,
    part2: leastCommonCharAnswer,
  };
};

const { part1, part2 } = findMessageFromSignals(signals);
console.log(`Part 1: ${part1}\nPart 2: ${part2}`);
