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

          cell.appendTo(row);
      };
      board.append(row);
    };

    numRows = y;
    numCols = x;
    iterationNumber = 0;
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
