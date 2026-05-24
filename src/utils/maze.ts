import { GridNode } from '../types';

// Helper to check if node is start or end
function isSpecialNode(node: GridNode): boolean {
  return node.isStart || node.isEnd;
}

// 1. RANDOM WALL GENERATOR
export function generateRandomWalls(
  grid: GridNode[][],
  density: number = 0.3
): GridNode[][] {
  const newGrid = grid.map(row =>
    row.map(node => {
      if (isSpecialNode(node)) {
        return { ...node, isWall: false, weight: 1 };
      }
      const isWall = Math.random() < density;
      return {
        ...node,
        isWall,
        weight: isWall ? 1 : node.weight,
      };
    })
  );
  return newGrid;
}

// 2. WEIGHTED SWAMP-TERRAIN MAP GENERATOR
export function generateSwampTerrain(grid: GridNode[][]): GridNode[][] {
  const newGrid = grid.map(row =>
    row.map(node => {
      if (isSpecialNode(node)) {
        return { ...node, isWall: false, weight: 1 };
      }

      // We create organic rivers/swamp segments by using math patterns
      // Mud (weight = 5) or Water (weight = 10)
      const x = node.col;
      const y = node.row;
      
      // Let's create beautiful bands of high cost terrain (swamps and hills)
      const sineWave = Math.sin(x * 0.3) * 4 + 10;
      const distanceToWave = Math.abs(y - sineWave);
      
      let weight = 1;
      let isWall = false;

      if (distanceToWave < 2.2) {
        // High density swamp: weight = 10 (Deep water)
        weight = 10;
      } else if (distanceToWave < 4.5) {
        // Muddy forest: weight = 5 (Swamp)
        weight = 5;
      } else if ((x + y) % 11 === 0 && Math.random() < 0.6) {
        // Scattered stones/walls
        isWall = true;
      } else if ((x * y) % 7 === 0 && Math.random() < 0.4) {
        weight = 5;
      }

      return {
        ...node,
        isWall,
        weight: isWall ? 1 : weight,
      };
    })
  );
  return newGrid;
}

// 3. RECURSIVE DIVISION MAZE GENERATOR
// It divides the grid using horizontal or vertical lines with a single gate
export function generateRecursiveDivision(grid: GridNode[][]): GridNode[][] {
  // First, set grid to empty and add surrounding walls
  const rows = grid.length;
  const cols = grid[0].length;
  
  const newGrid = grid.map(row => 
    row.map(node => ({
      ...node,
      isWall: false,
      weight: 1
    }))
  );

  // We add outer walls
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 || r === rows - 1 || c === 0 || c === cols - 1) {
        const node = newGrid[r][c];
        if (!isSpecialNode(node)) {
          newGrid[r][c].isWall = true;
        }
      }
    }
  }

  // Define walls division recursively
  function divide(
    gridState: GridNode[][],
    rowStart: number,
    rowEnd: number,
    colStart: number,
    colEnd: number,
    orientation: 'h' | 'v'
  ) {
    if (rowEnd - rowStart < 2 || colEnd - colStart < 2) return;

    const isHorizontal = orientation === 'h';

    // Where will we build the wall?
    const wallRow = isHorizontal
      ? Math.floor(randomOddOrEven(rowStart + 1, rowEnd - 1, 'even'))
      : 0;
    const wallCol = !isHorizontal
      ? Math.floor(randomOddOrEven(colStart + 1, colEnd - 1, 'even'))
      : 0;

    // Open a gap/doorway in this wall
    const passageRow = isHorizontal
      ? 0
      : Math.floor(randomOddOrEven(rowStart, rowEnd, 'odd'));
    const passageCol = isHorizontal
      ? Math.floor(randomOddOrEven(colStart, colEnd, 'odd'))
      : 0;

    if (isHorizontal) {
      for (let c = colStart; c <= colEnd; c++) {
        if (c !== passageCol) {
          const node = gridState[wallRow][c];
          if (!isSpecialNode(node)) {
            gridState[wallRow][c].isWall = true;
          }
        }
      }
    } else {
      for (let r = rowStart; r <= rowEnd; r++) {
        if (r !== passageRow) {
          const node = gridState[r][wallCol];
          if (!isSpecialNode(node)) {
            gridState[r][wallCol].isWall = true;
          }
        }
      }
    }

    // Call sub-divisions
    // 1st half:
    let nextRowStart = rowStart;
    let nextRowEnd = isHorizontal ? wallRow - 1 : rowEnd;
    let nextColStart = colStart;
    let nextColEnd = !isHorizontal ? wallCol - 1 : colEnd;
    let nextOrientation = chooseOrientation(nextRowEnd - nextRowStart, nextColEnd - nextColStart);
    divide(gridState, nextRowStart, nextRowEnd, nextColStart, nextColEnd, nextOrientation);

    // 2nd half:
    nextRowStart = isHorizontal ? wallRow + 1 : rowStart;
    nextRowEnd = rowEnd;
    nextColStart = !isHorizontal ? wallCol + 1 : colStart;
    nextColEnd = colEnd;
    nextOrientation = chooseOrientation(nextRowEnd - nextRowStart, nextColEnd - nextColStart);
    divide(gridState, nextRowStart, nextRowEnd, nextColStart, nextColEnd, nextOrientation);
  }

  // Helper to choose orientation based on size ratio
  function chooseOrientation(width: number, height: number): 'h' | 'v' {
    if (width < height) return 'h';
    if (height < width) return 'v';
    return Math.random() < 0.5 ? 'h' : 'v';
  }

  // Helper to ensure walls align perfectly with coordinates
  function randomOddOrEven(min: number, max: number, type: 'odd' | 'even'): number {
    const range = [];
    for (let i = min; i <= max; i++) {
      if (type === 'even' && i % 2 === 0) range.push(i);
      else if (type === 'odd' && i % 2 !== 0) range.push(i);
    }
    if (range.length === 0) return Math.floor(Math.random() * (max - min + 1)) + min;
    return range[Math.floor(Math.random() * range.length)];
  }

  // Start recursion inside inner fields (excluding surrounding boundary walls)
  divide(
    newGrid,
    1,
    rows - 2,
    1,
    cols - 2,
    chooseOrientation(rows - 2, cols - 2)
  );

  return newGrid;
}
