var board = {
  build: function(x, y) {
    this.clear();
    var board = $('.board');
    for (var j = 0; j < y; j++) {
      var row = $("<div class='row'></div>");
      for (var i = 0; i < x; i++) {
        var cell = $('<div>0</div>')
          .addClass('cell')
          .attr('id', i + '_' + j);

          this.add_click_point(cell, i, j);
          cell.appendTo(row);
      };
      board.append(row);
    };

    numRows = y;
    numCols = x;
    iterationNumber = 0;
  }
  ,
  add_click_point: function(cell, x, y) {
    cell.click(function() {
      board.set_endpoint(cell, x, y);
    });
  }
  ,
  set_endpoint: function(cell, x, y) {
    var starts = $('.start').length
      , ends   = $('.end').length;
    console.log('there are ' + starts + ' starts and ' + ends + ' ends.');

    if(starts === 0) {
      cell.addClass('start');
    }

    if(ends === 1) {
      $('.start').removeClass('start');
      $('.end').removeClass('end');
      cell.addClass('start');
    }

    if(starts == 1 && ends === 0) {
      cell.addClass('end');
    }
  }
  ,
  clear: function() {
    $('.board').empty();
  }
  ,
  reset: function(initialListOfCells) {
    var x_dimension = $('#x_dimension').val();
    var y_dimension = $('#y_dimension').val();

    this.build(x_dimension, y_dimension);

    this.setInitalStateFromList(initialListOfCells);
  }
  ,
  setInitalStateFromList: function(list) {
    for (index = 0; index < list.length; ++index) {
        $('#' + list[index]).addClass('alive');
    }
  }
}
