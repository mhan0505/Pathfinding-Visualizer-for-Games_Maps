import { GridNode } from '../types';

// Heuristic distance helper
export function getHeuristicDistance(
  nodeA: { row: number; col: number },
  nodeB: { row: number; col: number },
  type: 'manhattan' | 'euclidean' | 'octile' | 'chebyshev'
): number {
  const dx = Math.abs(nodeA.col - nodeB.col);
  const dy = Math.abs(nodeA.row - nodeB.row);

  switch (type) {
    case 'manhattan':
      return dx + dy;
    case 'euclidean':
      return Math.sqrt(dx * dx + dy * dy);
    case 'octile': {
      const F = Math.SQRT2 - 1;
      return dx < dy ? F * dx + dy : F * dy + dx;
    }
    case 'chebyshev':
      return Math.max(dx, dy);
  }
}

// Highly adaptive helper to get neighbors with diagonal movement and corner-crossing controls
function getNeighbors(
  node: GridNode,
  grid: GridNode[][],
  allowDiagonal = false,
  dontCrossCorners = false
): GridNode[] {
  const neighbors: GridNode[] = [];
  const { row, col } = node;
  const numRows = grid.length;
  const numCols = grid[0].length;

  const up = row > 0;
  const down = row < numRows - 1;
  const left = col > 0;
  const right = col < numCols - 1;

  // Orthogonal Neighbors
  const upNode = up ? grid[row - 1][col] : null;
  const downNode = down ? grid[row + 1][col] : null;
  const leftNode = left ? grid[row][col - 1] : null;
  const rightNode = right ? grid[row][col + 1] : null;

  if (upNode) neighbors.push(upNode);
  if (downNode) neighbors.push(downNode);
  if (leftNode) neighbors.push(leftNode);
  if (rightNode) neighbors.push(rightNode);

  // Diagonal Neighbors
  if (allowDiagonal) {
    // Up-Left
    if (up && left) {
      const target = grid[row - 1][col - 1];
      const blocked = dontCrossCorners
        ? (upNode?.isWall || leftNode?.isWall)
        : (upNode?.isWall && leftNode?.isWall);
      if (!blocked) neighbors.push(target);
    }
    // Up-Right
    if (up && right) {
      const target = grid[row - 1][col + 1];
      const blocked = dontCrossCorners
        ? (upNode?.isWall || rightNode?.isWall)
        : (upNode?.isWall && rightNode?.isWall);
      if (!blocked) neighbors.push(target);
    }
    // Down-Left
    if (down && left) {
      const target = grid[row + 1][col - 1];
      const blocked = dontCrossCorners
        ? (downNode?.isWall || leftNode?.isWall)
        : (downNode?.isWall && leftNode?.isWall);
      if (!blocked) neighbors.push(target);
    }
    // Down-Right
    if (down && right) {
      const target = grid[row + 1][col + 1];
      const blocked = dontCrossCorners
        ? (downNode?.isWall || rightNode?.isWall)
        : (downNode?.isWall && rightNode?.isWall);
      if (!blocked) neighbors.push(target);
    }
  }

  return neighbors;
}

// 1. DIJKSTRA'S ALGORITHM
export function dijkstra(
  grid: GridNode[][],
  startNode: GridNode,
  endNode: GridNode,
  allowDiagonal = false,
  dontCrossCorners = false
) {
  const visitedNodesInOrder: GridNode[] = [];
  
  // Set distances
  for (const row of grid) {
    for (const node of row) {
      node.distance = node.row === startNode.row && node.col === startNode.col ? 0 : Infinity;
      node.isVisited = false;
      node.previousNode = null;
    }
  }

  // Flatten grid
  const unvisitedNodes: GridNode[] = [];
  for (const row of grid) {
    for (const node of row) {
      unvisitedNodes.push(node);
    }
  }

  while (unvisitedNodes.length > 0) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    const closestNode = unvisitedNodes.shift()!;

    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) break;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode.row === endNode.row && closestNode.col === endNode.col) {
      break;
    }

    const neighbors = getNeighbors(closestNode, grid, allowDiagonal, dontCrossCorners);
    for (const neighbor of neighbors) {
      if (neighbor.isVisited || neighbor.isWall) continue;
      
      const isDiagonal = neighbor.row !== closestNode.row && neighbor.col !== closestNode.col;
      const stepCost = isDiagonal ? Math.SQRT2 : 1;
      const tentativeDistance = closestNode.distance + stepCost * neighbor.weight;

      if (tentativeDistance < neighbor.distance) {
        neighbor.distance = tentativeDistance;
        neighbor.previousNode = closestNode;
      }
    }
  }

  return visitedNodesInOrder;
}

// 2. BREADTH-FIRST SEARCH (BFS)
export function bfs(
  grid: GridNode[][],
  startNode: GridNode,
  endNode: GridNode,
  allowDiagonal = false,
  dontCrossCorners = false
) {
  const visitedNodesInOrder: GridNode[] = [];
  
  for (const row of grid) {
    for (const node of row) {
      node.isVisited = false;
      node.previousNode = null;
    }
  }

  const queue: GridNode[] = [];
  const start = grid[startNode.row][startNode.col];
  start.isVisited = true;
  queue.push(start);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    visitedNodesInOrder.push(currentNode);

    if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
      break;
    }

    const neighbors = getNeighbors(currentNode, grid, allowDiagonal, dontCrossCorners);
    for (const neighbor of neighbors) {
      if (neighbor.isWall || neighbor.isVisited) continue;
      
      neighbor.isVisited = true;
      neighbor.previousNode = currentNode;
      queue.push(neighbor);
    }
  }

  return visitedNodesInOrder;
}

// 3. DEPTH-FIRST SEARCH (DFS)
export function dfs(
  grid: GridNode[][],
  startNode: GridNode,
  endNode: GridNode,
  allowDiagonal = false,
  dontCrossCorners = false
) {
  const visitedNodesInOrder: GridNode[] = [];
  
  for (const row of grid) {
    for (const node of row) {
      node.isVisited = false;
      node.previousNode = null;
    }
  }

  const stack: GridNode[] = [];
  const start = grid[startNode.row][startNode.col];
  stack.push(start);

  while (stack.length > 0) {
    const currentNode = stack.pop()!;

    if (currentNode.isVisited) continue;
    
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
      break;
    }

    const neighbors = getNeighbors(currentNode, grid, allowDiagonal, dontCrossCorners);
    // Reverse neighbors order to follow standard depth-first search visual flow
    for (const neighbor of neighbors.reverse()) {
      if (!neighbor.isWall && !neighbor.isVisited) {
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    }
  }

  return visitedNodesInOrder;
}

// 4. A* PATHFINDING ALGORITHM
export function astar(
  grid: GridNode[][],
  startNode: GridNode,
  endNode: GridNode,
  heuristicType: 'manhattan' | 'euclidean' | 'octile' | 'chebyshev' = 'manhattan',
  allowDiagonal = false,
  dontCrossCorners = false,
  weight = 1
): GridNode[] {
  const visitedNodesInOrder: GridNode[] = [];
  
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  
  const startKey = `${startNode.row}-${startNode.col}`;
  gScore.set(startKey, 0);
  fScore.set(startKey, weight * getHeuristicDistance(startNode, endNode, heuristicType));

  const openSet: GridNode[] = [grid[startNode.row][startNode.col]];
  const opened = new Set<string>([startKey]);
  const closed = new Set<string>();

  for (const row of grid) {
    for (const node of row) {
      node.isVisited = false;
      node.previousNode = null;
    }
  }

  while (openSet.length > 0) {
    // Sort openSet by f score
    openSet.sort((a, b) => {
      const fA = fScore.get(`${a.row}-${a.col}`) ?? Infinity;
      const fB = fScore.get(`${b.row}-${b.col}`) ?? Infinity;
      if (fA === fB) {
        const hA = getHeuristicDistance(a, endNode, heuristicType);
        const hB = getHeuristicDistance(b, endNode, heuristicType);
        return hA - hB;
      }
      return fA - fB;
    });

    const currentNode = openSet.shift()!;
    const currentKey = `${currentNode.row}-${currentNode.col}`;
    opened.delete(currentKey);
    closed.add(currentKey);

    if (currentNode.isWall) continue;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
      break;
    }

    const neighbors = getNeighbors(currentNode, grid, allowDiagonal, dontCrossCorners);
    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row}-${neighbor.col}`;
      if (closed.has(neighborKey) || neighbor.isWall) continue;

      const isDiagonal = neighbor.row !== currentNode.row && neighbor.col !== currentNode.col;
      const d = isDiagonal ? Math.SQRT2 : 1;
      const tentativeG = (gScore.get(currentKey) ?? Infinity) + d * neighbor.weight;

      if (!opened.has(neighborKey) || tentativeG < (gScore.get(neighborKey) ?? Infinity)) {
        neighbor.previousNode = currentNode;
        gScore.set(neighborKey, tentativeG);
        const h = getHeuristicDistance(neighbor, endNode, heuristicType);
        fScore.set(neighborKey, tentativeG + weight * h);

        if (!opened.has(neighborKey)) {
          openSet.push(neighbor);
          opened.add(neighborKey);
        }
      }
    }
  }

  return visitedNodesInOrder;
}

// 5. BEST-FIRST SEARCH ALGORITHM
export function bestFirstSearch(
  grid: GridNode[][],
  startNode: GridNode,
  endNode: GridNode,
  heuristicType: 'manhattan' | 'euclidean' | 'octile' | 'chebyshev' = 'manhattan',
  allowDiagonal = false,
  dontCrossCorners = false
): GridNode[] {
  const visitedNodesInOrder: GridNode[] = [];
  const startKey = `${startNode.row}-${startNode.col}`;
  
  const openSet: GridNode[] = [grid[startNode.row][startNode.col]];
  const opened = new Set<string>([startKey]);
  const closed = new Set<string>();

  for (const row of grid) {
    for (const node of row) {
      node.isVisited = false;
      node.previousNode = null;
    }
  }

  while (openSet.length > 0) {
    openSet.sort((a, b) => {
      const hA = getHeuristicDistance(a, endNode, heuristicType);
      const hB = getHeuristicDistance(b, endNode, heuristicType);
      return hA - hB;
    });

    const currentNode = openSet.shift()!;
    const currentKey = `${currentNode.row}-${currentNode.col}`;
    opened.delete(currentKey);
    closed.add(currentKey);

    if (currentNode.isWall) continue;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
      break;
    }

    const neighbors = getNeighbors(currentNode, grid, allowDiagonal, dontCrossCorners);
    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row}-${neighbor.col}`;
      if (closed.has(neighborKey) || neighbor.isWall) continue;

      if (!opened.has(neighborKey)) {
        neighbor.previousNode = currentNode;
        openSet.push(neighbor);
        opened.add(neighborKey);
      }
    }
  }

  return visitedNodesInOrder;
}

// Helper to trace back the path
export function getNodesInShortestPathOrder(endNode: GridNode): GridNode[] {
  const nodesInShortestPathOrder: GridNode[] = [];
  let currentNode: GridNode | null = endNode;
  
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  
  return nodesInShortestPathOrder;
}
