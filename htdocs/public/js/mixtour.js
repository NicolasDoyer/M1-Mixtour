d3.selectAll("p").style("color", "blue");


var
        fieldSize = 100,
        boardDimension = 5,
        boardSize = boardDimension*fieldSize;

    var board =[];

    for(var i = 0; i < boardDimension*boardDimension; i++) {
        board.push({
            x: i % boardDimension,
            y: Math.floor(i / boardDimension),
            piece: 'RW'
        });
    };

    const game = {"board":[["","","","",""],["","","WRR","RW",""],["","WR","R","","WW"],["","WRR","","",""],["W","","","",""]],"winner":null,"finished":false,"turn":"R","player":"W"};

    board = [];
    for(let i = 0; i < 5; ++i) {
      for(let j = 0; j < 5; ++j) {
        board.push({
            x: i,
            y: j,
            piece: game.board[i][j]
        });
      }
    }

    function drawBoard(board) {
      svg.selectAll(".fields")
      .data(board)
     .enter()
      .append("g").each(function(d) {
        const g = d3.select(this)
        .attr("transform", function (d) {
            return `translate(${d.x*fieldSize},${d.y*fieldSize})`;
        });

        console.log(d);
        g.append("rect")
                  .style("class", "fields")
                  .style("class", "rects")
                  .attr("width", fieldSize + "px")
                  .attr("height", fieldSize + "px")
                  .style("fill", function (d) {
                      if ( ((d.x%2 == 0) && (d.y%2 == 0)) ||
                           ((d.x%2 == 1) && (d.y%2 == 1))    )
                          return "lightgrey";
                      else
                          return "white";
                  });

          const piece = g.append('g')
          .attr('class', 'piece');

          for(let i = 0; i < d.piece.length; ++i) {
            piece.append('rect')
            .attr('x', fieldSize / 2 - 25)
            .attr('y', fieldSize - 10 * (i+1))
            .attr('height', 10)
            .attr('width', 50)
            .attr('fill', d.piece[i] === 'R' ? 'red' : 'grey');
          }
      })



      }

    var div = d3.select("body")
        .append("div")
        .style("width", boardSize + "px")
        .style("height", boardSize + "px");

    var svg = div.append("svg")
         .attr("width", boardSize + "px")
         .attr("height", boardSize + "px")

    drawBoard(board);
