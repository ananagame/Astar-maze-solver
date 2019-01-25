let PNGImage = require('pngjs-image')

PNGImage.readImage('maze.png', (err, image) => {
  if (err) {
    throw err
  }

  let maze = []
  let starts = []

  for (let line = 0; line < image.getHeight(); line++) {
    let lineArray = []

    for (let column = 0; column < image.getWidth(); column++) {
      const pixel = image.getPixel(column, line)
      let value = 1
      if (pixel === -1) {
        value = 0
      } else if (pixel === -16776961) {
        value = 2
      }

      lineArray.push(value)
    }
    maze.push(lineArray)
  }

  console.log(maze)
  console.log(starts)
})