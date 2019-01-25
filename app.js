const maze = [
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1 ],
  [ 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1 ],
  [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1 ],
  [ 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1 ],
  [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1 ],
  [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
  [ 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1 ],
  [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1 ],
  [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
  [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
  [ 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1 ],
  [ 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
]

function isInMaze(maze, x, y) {
  return x >= 0 && y >= 0 && x < maze[0].length && y < maze.length
}

function lowestFScoreNode(scores) {
  const lowestScore = Math.min(...Object.values(scores))
  return Object.keys(scores).find(node => scores[node] === lowestScore)
}

class Node {
  constructor(maze, coordinates) {
    if (!isInMaze(maze, coordinates.x, coordinates.y)) {
      console.error('this node is not in the maze')
    }

    this.maze = maze
    this.x = coordinates.x
    this.y = coordinates.y
  }

  neighborhood() {
    const neighborhoodCoordinates = [
      { x: 0, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 },
      { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -1 },
    ]

    let neighborhood = []

    neighborhoodCoordinates.forEach(coordinates => {
      let x = this.x - coordinates.x
      let y = this.y - coordinates.y

      if (isInMaze(maze, x, y)) {
        neighborhood.push({ x, y })
      }
    })

    return neighborhood
  }

  heuristicCost(coordinates) {
    return Math.abs(coordinates.x - this.x) + Math.abs(coordinates.y - this.y)
  }
}

function solve(maze, startCoordinates, goalCoordinates) {
  let start = new Node(maze, startCoordinates)

  let closedSet = []
  let openSet = [ start ]
  let cameFrom = {}

  let gScore = { start: 0 }
  let fScore = { start: start.heuristicCost(goalCoordinates) }

  while (openSet.length > 0) {
    const current = lowestFScoreNode(fScore)
  }
}