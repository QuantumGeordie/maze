var numRows
  , numCols
  , iterationNumber = 0;

function cellValue(x, y) {
  return parseInt($('#' + x + '_' + y).text());
}

function setCellValue(x, y, value) {
  var v = $('#' + x + '_' + y).text(value);
  if (v == NaN)
    v = 0;
  return v;
}

function printStep(s) {
  if(DISPLAY_STEPS){
    var li = $("<li>" + s + "</li>");
    $('#steps').append(li);
  }
}

function clearSteps() {
  $('#steps').empty();
  $('#solved_status').text('unsolved');
}

function alreadyVisited(x, y) {
  var v = $('#' + x + '_' + y).hasClass('alive');
  return v;
}

function deadEnd(x, y) {
  var v = $('#' + x + '_' + y).hasClass('was_dead');
  return v;
}