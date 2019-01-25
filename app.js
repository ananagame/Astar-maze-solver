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
      console.error('this node is not in the maze')
    }

    this.maze = maze
    this.x = coordinates.x
    this.y = coordinates.y
    this.g = 0
    this.f = 0
    this.h = 0
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

  heuristic(node) {
    return Math.abs(node.x - this.x) + Math.abs(node.y - this.y)
  }

  distance(node) {
    return Math.sqrt(Math.pow(node.x - this.x, 2) + Math.pow(node.y - this.y, 2))
  }
}

function solve(maze, startCoordinates, goalCoordinates) {
  let start = new Node(maze, startCoordinates)
  let goal = new Node(maze, goalCoordinates)

  let openSet = new Heap(function(nodeA, nodeB) {
    return nodeA.f - nodeB.f;
  })

  openSet.push(start)
  start.opened = true

  console.log('starting...')

  while (!openSet.empty()) {
    let current = openSet.pop()
    current.closed = true

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

}

let path = solve(maze, {
  x: 1, y: 1
}, {
  x: 11, y: 12
})

let PNGImage = require('pngjs-image')
var image = PNGImage.createImage(13, 14);

for (let line = 0; line < maze.length; line++) {
  for (let column = 0; column < maze[line].length; column++) {
    if (maze[line][column] === 1) {
      image.setAt(column, line, { red:0, green:0, blue:0, alpha:-1 });
    }
  }
}

path.forEach(coordinates => {
  image.setAt(coordinates[0], coordinates[1], { red:66, green:134, blue:244, alpha:-1 });
})

image.setAt(1, 1, { red:232, green:102, blue:90, alpha:-1 })
image.setAt(11, 12, { red:232, green:102, blue:90, alpha:-1 })

image.writeImage('solved.png', function (err) {
  if (err) throw err;
  console.log('Written to the file');
});