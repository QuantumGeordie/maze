var N = 1
  , S = 2
  , E = 4
  , W = 8;

var DX = { 4: 1, 8: -1, 1:  0, 2: 0 }
  , DY = { 4: 0, 8:  0, 1: -1, 2: 1 };

var OPPOSITE = { 4: 8, 8: 4, 1: 2, 2: 1 };

function startMazeMapping() {
  iterationNumber = 0;
  carvePassagesFrom(0, 0);
  drawBorders();
  clearSteps();
}

function drawBorders() {
  for(x = 0; x < numCols; x++){
    for(y = 0; y < numRows; y++) {
      var value = cellValue(x, y);
      var value_1 = cellValue(x + 1, y)
      if ((value & 2) == 0)
        if (y != numRows - 1)
          drawSouth(x, y);
      if ((value & 4) != 0){
        if ((value | value_1) & 2 == 0)
          drawSouth(x, y)
      } else {
        if (x != numCols - 1)
          drawEast(x, y);
      }
    }
  }
}

function drawSouth(x, y) {
  $('#' + x + '_' + y).addClass('bottom_wall');
}
function drawEast(x, y) {
  $('#' + x + '_' + y).addClass('right_wall');
}

function shuffle(array) {    $('#solved_status').text('Solved');
  var currentIndex = array.length, temporaryValue, randomIndex ;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function between(value, low, high) {
  return (value >= low) && (value <= high);
}

function carvePassagesFrom(cx, cy) {
  var directions = shuffle([N,S,E,W]);
  iterationNumber++;

  for(var i = 0; i < directions.length; i++){
    var nx = cx + DX[directions[i]]
      , ny = cy + DY[directions[i]];

    if(between(ny, 0, numRows - 1) && between(nx, 0, numCols - 1) && (cellValue(nx, ny) == 0)) {
      var c = cellValue(cx, cy) | directions[i];
      var n = cellValue(nx, ny) | OPPOSITE[directions[i]];
      setCellValue(cx, cy, c);
      setCellValue(nx, ny, n);
      carvePassagesFrom(nx, ny);
    }
  }
}

