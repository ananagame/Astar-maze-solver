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

function isInRange(maze, x, y) {
  return x >= 0 && y >= 0 && x < maze[0].length && y < maze.length
}

class Node {
  constructor(maze, x, y) {
    if (!isInRange(maze, x, y)) {
      console.error('this node is not in the maze')
    }

    this.maze = maze
    this.x = x
    this.y = y
  }

  get neighborhood() {
    const neighborhoodCoordinates = [
      { x: 0, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 },
      { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -1 },
    ]

    let neighborhood = []

    neighborhoodCoordinates.forEach(coordinates => {
      let x = this.x - coordinates.x
      let y = this.y - coordinates.y

      if (isInRange(maze, x, y)) {
        neighborhood.push({ x, y })
      }
    })

    return neighborhood
  }
}

console.log(new Node(maze, 12, 13).neighborhood)