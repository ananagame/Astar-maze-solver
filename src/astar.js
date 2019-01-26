const Heap = require('heap')

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

class Node {
  constructor(maze, coordinates) {
    if (!isInMaze(maze, coordinates.x, coordinates.y)) {
      console.error('This node is not in the maze')
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
      let x = this.x + coordinates.x
      let y = this.y + coordinates.y

      if (isInMaze(maze, x, y) && this.maze[y][x] === 0) {
        neighborhood.push(new Node(this.maze, { x, y }))
      }
    })

    return neighborhood
  }

  // Returns the manhattan distance
  heuristic(node) {
    return Math.abs(node.x - this.x) + Math.abs(node.y - this.y)
  }

  distance(node) {
    return Math.sqrt(Math.pow(node.x - this.x, 2) + Math.pow(node.y - this.y, 2))
  }
}

module.exports = {
  solve(maze, startCoordinates, goalCoordinates) {
    let start = new Node(maze, startCoordinates)
    let goal = new Node(maze, goalCoordinates)

    // Create the open set which pop the minimum f(x) node
    let openSet = new Heap(function(nodeA, nodeB) {
      return nodeA.f - nodeB.f;
    })

    openSet.push(start)
    start.opened = true

    console.log('Starting...')

    while (!openSet.empty()) {
      let current = openSet.pop()
      current.closed = true

      // If the current node is at the goal
      if (current.x === goal.x && current.y === goal.y) {
        let path = [[current.x, current.y]]

        while (current.parent) {
          current = current.parent
          path.push([current.x, current.y])
        }

        return path.reverse()
      }

      const neighborhood = current.neighborhood()
      for (let index in neighborhood) {
        let neighbor = neighborhood[index]

        if (neighbor.closed) {
          continue
        }

        let tentative = current.distance(neighbor)

        if (!neighbor.opened || tentative < neighbor.g) {
          neighbor.g = tentative
          neighbor.h = current.heuristic(neighbor)
          neighbor.f = neighbor.h + neighbor.g
          neighbor.parent = current

          if (!neighbor.opened) {
            openSet.push(neighbor)
            neighbor.opened = true
          } else {
            openSet.updateItem(neighbor)
          }
        }
      }
    }

  },

  drawMaze(maze, image) {
    for (let line = 0; line < maze.length; line++) {
      for (let column = 0; column < maze[line].length; column++) {
        if (maze[line][column] === 1) {
          image.setAt(column, line, { red: 0, green: 0, blue: 0, alpha: -1 })
        }
      }
    }
  },

  drawPath(path, image) {
    path.forEach(coordinates => {
      image.setAt(coordinates[0], coordinates[1], { red: 66, green: 134, blue: 244, alpha: -1 })
    })
  }
}