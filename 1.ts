const computeBlockDistance = (steps: string[]): number => {
  let xPos: number = 0;
  let yPos: number = 0;
  let xyMagnitude = { x: 0, y: 1 }; // up in the y direction to begin...
  const visited = new Set<string>();

  visited.add(`${xPos}#${yPos}`);
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const direction = step.charAt(0);
    const distance = parseInt(step.substr(1));
    xyMagnitude = (direction === 'L')
      ? { x: -xyMagnitude.y, y: xyMagnitude.x }
      : { x: xyMagnitude.y, y: -xyMagnitude.x };
    for (let j = 0; j < distance; j++) {
      xPos += xyMagnitude.x;
      yPos += xyMagnitude.y;
      const hash = `${xPos}#${yPos}`;
      if (visited.has(hash)) {
        return Math.abs(xPos) + Math.abs(yPos);
      } else {
        visited.add(hash);
      }
    }
  }
  return Math.abs(xPos) + Math.abs(yPos);
}

const testData: string = 'L3, R1, L4, L1, L2, R4, L3, L3, R2, R3, L5, R1, R3, L4, L1, L2, R2, R1, L4, L4, R2, L5, R3, R2, R1, L1, L2, R2, R2, L1, L1, R2, R1, L3, L5, R4, L3, R3, R3, L5, L190, L4, R4, R51, L4, R5, R5, R2, L1, L3, R1, R4, L3, R1, R3, L5, L4, R2, R5, R2, L1, L5, L1, L1, R78, L3, R2, L3, R5, L2, R2, R4, L1, L4, R1, R185, R3, L4, L1, L1, L3, R4, L4, L1, R5, L5, L1, R5, L1, R2, L5, L2, R4, R3, L2, R3, R1, L3, L5, L4, R3, L2, L4, L5, L4, R1, L1, R5, L2, R4, R2, R3, L1, L1, L4, L3, R4, L3, L5, R2, L5, L1, L1, R2, R3, L5, L3, L2, L1, L4, R4, R4, L2, R3, R1, L2, R1, L2, L2, R3, R3, L1, R4, L5, L3, R4, R4, R1, L2, L5, L3, R1, R4, L2, R5, R4, R2, L5, L3, R4, R1, L1, R5, L3, R1, R5, L2, R1, L5, L2, R2, L2, L3, R3, R3, R1';
const instructions: string[] = data.split(',').map(s => s.trim());
const totalBlocksAway: number = computeBlockDistance(instructions);
console.log(totalBlocksAway);
