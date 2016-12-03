import { data } from './3-input-data';

const isValidTriangle = (a: number,  b: number,  c: number): boolean => {
  let longestSide = a;
  if (b > longestSide) {
    longestSide = b;
  }
  if (c > longestSide) {
    longestSide = c;
  }
  return (longestSide < a + b + c - longestSide);
};

const countValidTriangles = (triangles: string[][]) => {
  let validTriangles = 0;
  triangles.forEach(triangle => {
    const a = parseInt(triangle[0]);
    const b = parseInt(triangle[1]);
    const c = parseInt(triangle[2]);
    if (isValidTriangle(a, b, c)) {
      validTriangles++;
    }
  });
  return validTriangles;
};

const getTrianglesByColumn = (data: string[][], column: number) => {
  const triangles = [];
  let tempAccum = [];
  for (let i = 0; i < data.length; i++) {
    tempAccum.push(data[i][column]);
    if ((i + 1) % 3 === 0) {
      triangles.push([...tempAccum]);
      tempAccum = []; // reset accum. 
    }
  }
  return triangles;
};

// triangles: [ [sideA1, sideB1, sideC1], [sideA2, sideB2, sideC2] ...];
const triangles: string[][] = data.split('\n').map(raw => raw.trim().split(/\s+/));

const trianglesColumn0 = getTrianglesByColumn(triangles, 0); 
const trianglesColumn1 = getTrianglesByColumn(triangles, 1);
const trianglesColumn2 = getTrianglesByColumn(triangles, 2);
const trianglesVertically = [...trianglesColumn0, ...trianglesColumn1, ...trianglesColumn2];
const validTrianglesVertically = countValidTriangles(trianglesVertically);
console.log(`# of valid vertical triangles: ${validTrianglesVertically}`);

const validTrianglesHorizontally = countValidTriangles(triangles);
console.log(`# of valid horizontal triangles: ${validTrianglesHorizontally}`);
