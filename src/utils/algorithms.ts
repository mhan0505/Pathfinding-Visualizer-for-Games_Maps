import { GridNode } from '../types';

// Helper to get unvisited neighbors (up, down, left, right)
function getNeighbors(node: GridNode, grid: GridNode[][]): GridNode[] {
  const neighbors: GridNode[] = [];
  const { row, col } = node;

  // Up
  if (row > 0) neighbors.push(grid[row - 1][col]);
  // Down
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  // Left
  if (col > 0) neighbors.push(grid[row][col - 1]);
  // Right
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
}

// 1. DIJKSTRA'S ALGORITHM
export function dijkstra(grid: GridNode[][], startNode: GridNode, endNode: GridNode) {
  // Clone nodes to avoid side-effects during calculation
  const visitedNodesInOrder: GridNode[] = [];
  
  // Set distances
  for (const row of grid) {
    for (const node of row) {
      node.distance = node.row === startNode.row && node.col === startNode.col ? 0 : Infinity;
      node.isVisited = false;
      node.previousNode = null;
    }
  }

  // Flatten the grid to get all nodes
  const unvisitedNodes: GridNode[] = [];
  for (const row of grid) {
    for (const node of row) {
      unvisitedNodes.push(node);
    }
  }

  while (unvisitedNodes.length > 0) {
    // Sort unvisited nodes by distance
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    const closestNode = unvisitedNodes.shift()!;

    // If it's a wall, skip it
    if (closestNode.isWall) continue;

    // If distance is reached to infinity, means trapped
    if (closestNode.distance === Infinity) break;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    // If we reached the target node, we are done
    if (closestNode.row === endNode.row && closestNode.col === endNode.col) {
      break;
    }

    // Update distances of neighbors
    const neighbors = getNeighbors(closestNode, grid);
    for (const neighbor of neighbors) {
      if (neighbor.isVisited || neighbor.isWall) continue;
      
      const tentativeDistance = closestNode.distance + neighbor.weight;
      if (tentativeDistance < neighbor.distance) {
        neighbor.distance = tentativeDistance;
        neighbor.previousNode = closestNode;
      }
    }
  }

  return visitedNodesInOrder;
}

// 2. BREADTH-FIRST SEARCH (BFS)
export function bfs(grid: GridNode[][], startNode: GridNode, endNode: GridNode) {
  const visitedNodesInOrder: GridNode[] = [];
  
  // Setup search environment
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

    const neighbors = getNeighbors(currentNode, grid);
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
export function dfs(grid: GridNode[][], startNode: GridNode, endNode: GridNode) {
  const visitedNodesInOrder: GridNode[] = [];
  
  // Setup search environment
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

    // In DFS, we check viscosity upon popping to model recursion stack properly
    if (currentNode.isVisited) continue;
    
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
      break;
    }

    const neighbors = getNeighbors(currentNode, grid);
    // Reverse neighbors order to follow standard depth-first search visual flow (up-right-down-left)
    for (const neighbor of neighbors.reverse()) {
      if (!neighbor.isWall && !neighbor.isVisited) {
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
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
