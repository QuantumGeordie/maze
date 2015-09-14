var INITIAL_STEP_TIMEOUT = 10;
var stepTimeout = INITIAL_STEP_TIMEOUT;

function slowStep() {
  var rows = $('.row').size()
    , cols = $('.row')[0].childElementCount
    , start_cell = $('.start').attr('id').split('_')
    , end_cell   = $('.end').attr('id').split('_')
    , x = parseInt(start_cell[0])
    , y = parseInt(start_cell[1]);

  end_point = { x : end_cell[0], y : end_cell[1] };

  printStep('starting point: (' + x + ', ' + y + ')');
  printStep('starting point: (' + end_point['x'] + ', ' + end_point['y'] + ')');

  stepTimeout = INITIAL_STEP_TIMEOUT;
  setTimeout(function() { oneStep(x, y) }, INITIAL_STEP_TIMEOUT);
}

function oneStep(x, y) {
  var wallValue = cellValue(x, y);
  var keepGoing = true;
  var goBack = false;
  var paths = 0;
  var possible = [];

  stepTimeout = stepTimeout - 10;

  if (stepTimeout < 0) {
    stepTimeout = INITIAL_STEP_TIMEOUT;
  }

  if(!((x == parseInt(end_point['x'])) && (y == parseInt(end_point['y'])))){
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
      keepGoing = false;
      goBack = true;
    }

    if(paths > 0){
      printStep('(' + x + ', ' + y + ') paths: ' + paths + ' - wall value: ' + wallValue);
      x = possible[0].x;
      y = possible[0].y;
    }
  } else {
    keepGoing = false;
    $('#solve_status').text('Solved!');
  }

  if (keepGoing) {
    setTimeout(function() { oneStep(x, y) }, stepTimeout);
  }

  if (goBack) {
    stepTimeout = INITIAL_STEP_TIMEOUT;
    setTimeout( function() { backStep(x, y) }, 100);
  }
}

function backStep(x, y) {
  var wallValue = cellValue(x, y);
  var paths = 0;
  var goBack = true;
  var goForward = false;

  var possible = [];

  stepTimeout = stepTimeout - 10;
  if (stepTimeout < 0) { stepTimeout = INITIAL_STEP_TIMEOUT; }

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

  if(paths == 1) {
    markDeadEnd(x, y);
    goBack = true;
    goForward = false;
    x = possible[0].x;
    y = possible[0].y;
  }
  if(paths > 1){
    if(!alreadyVisited(possible[0].x, possible[0].y)){
      goForward = true;
      goBack = false;
      x = possible[0].x;
      y = possible[0].y;
    } else {
      goForward = true;
      goBack = false;
      x = possible[1].x;
      y = possible[1].y;
    }
  }
  if (goForward) {
    setTimeout( function() { oneStep(x, y) }, stepTimeout );
  }
  if (goBack) {
    stepTimeout = INITIAL_STEP_TIMEOUT;
    setTimeout( function() { backStep(x, y) }, stepTimeout );
  }
}