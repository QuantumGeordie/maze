var DISPLAY_STEPS = false;

function solve() {
  var x = 0
    , y = 0;

  $('#solve_status').text('unsolved');
  findNextBranch(x, y);

  $('#0_0').addClass('end_point').removeClass('alive');
  $('#' + (numCols - 1) + '_' + (numRows - 1)).addClass('end_point').removeClass('alive');
}

function findNextBranch(x, y) {
  var wallValue = cellValue(x, y);
  var paths = 0;

  var possible = [];

  if(!((x == numCols - 1) && (y == numRows -1))){
    if((wallValue & E) > 0 && !alreadyVisited(x + 1, y) && !deadEnd(x + 1, y)){
      possible.push({x: x + 1, y: y});
      paths++;
    }
    if((wallValue & S) > 0 && !alreadyVisited(x, y + 1) && !deadEnd(x, y + 1)){
      possible.push({x: x, y: y + 1});
      paths++;
    }
    if((wallValue & W) > 0 && !alreadyVisited(x - 1, y) && !deadEnd(x - 1, y)){
      possible.push({x: x - 1, y: y});
      paths++;
    }
    if((wallValue & N) > 0 && !alreadyVisited(x, y - 1) && !deadEnd(x, y - 1)){
      possible.push({x: x, y: y - 1});
      paths++;
    }

    $('#' + x + '_' + y).addClass('alive');

    if(paths == 0){
      printStep('(' + x + ', ' + y + ') starting to backtrack');
      backtrack(x, y);
    }

    if(paths > 0){
      printStep('(' + x + ', ' + y + ') paths: ' + paths + ' - wall value: ' + wallValue);
      findNextBranch(possible[0].x, possible[0].y);
    }
  } else {
    printStep('Solved!');
    $('#solve_status').text('Solved');
    markAlive(x, y);
  }
}

function backtrack(x, y) {
  var wallValue = cellValue(x, y);
  var paths = 0;

  var possible = [];

  if((wallValue & E) > 0 && !deadEnd(x + 1, y)){
    paths++;
    possible.push({x: x + 1, y: y});
  }
  if((wallValue & S) > 0 && !deadEnd(x, y + 1)){
    paths++;
    possible.push({x: x, y: y + 1});
  }
  if((wallValue & W) > 0 && !deadEnd(x - 1, y)){
    paths++;
    possible.push({x: x - 1, y: y});
  }
  if((wallValue & N) > 0 && !deadEnd(x, y - 1)){
    paths++;
    possible.push({x: x, y: y - 1});
  }

  if(paths == 1){
    markDeadEnd(x, y);
    printStep('backtracing: ' + possible[0].x + ', ' + possible[0].y);
    backtrack(possible[0].x, possible[0].y);
  }
  if(paths > 1){
    if(!alreadyVisited(possible[0].x, possible[0].y)){
      printStep('restarting search: ' + possible[0].x + ', ' + possible[0].y);
      findNextBranch(possible[0].x, possible[0].y);
    } else {
      printStep('restarting search: ' + possible[1].x + ', ' + possible[1].y);
      findNextBranch(possible[1].x, possible[1].y);
    }

  }
}

function markDeadEnd(x, y) {
  $('#' + x + '_' + y).addClass('was_dead');
}
function markAlive(x, y) {
  $('#' + x + '_' + y).addClass('alive');
}
