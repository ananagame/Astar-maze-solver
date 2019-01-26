const PNGImage = require('pngjs-image')
const AStar = require('./astar')

PNGImage.readImage('res/maze.png', (err, mazeImage) => {
  if (err) {
    throw err
  }

  let maze = []
  let starts = []

  // Read the image and create a matrix
  for (let line = 0; line < mazeImage.getHeight(); line++) {
    let lineArray = []

    for (let column = 0; column < mazeImage.getWidth(); column++) {
      const pixel = mazeImage.getPixel(column, line)
      let value = 1
      if (pixel === -1) {
        value = 0
      } else if (pixel === -16776961) {
        value = 0
        starts.push({ x: column, y: line })
      }

      lineArray.push(value)
    }
    maze.push(lineArray)
  }

  const path = AStar.solve(maze, starts[0], starts[1])
  let image = PNGImage.createImage(maze[0].length, maze.length)

  AStar.drawMaze(maze, image)
  AStar.drawPath(path, image)

  starts.forEach(coordinate => {
    image.setAt(coordinate.x, coordinate.y, { red: 244, green: 110, blue: 66, alpha: -1 })
  })

  image.writeImage('res/solved.png', function (err) {
    if (err) {
      throw err
    }
    console.log('Written to the file')
  })
})