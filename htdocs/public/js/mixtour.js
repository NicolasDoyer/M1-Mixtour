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

    const game = {"board":[["","WR","","RWW",""],["RRWWR","","WRR","RW",""],["","WR","R","","WW"],["","WRRWR","","",""],["W","","","",""]],"winner":null,"finished":false,"turn":"R","player":"R"};

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
            piece.append('ellipse')
            .attr('cx', fieldSize / 2)
            .attr('cy', fieldSize - 9 * (i+3))
            .attr('rx', '49')
            .attr('ry', '24')
            .attr('stroke', '#000')
            .attr('stroke-width', '2px')
            .attr('fill', d.piece[i] === 'R' ? 'red' : 'grey');
            (i === (d.piece.length - 1) ) ?
            piece.append('ellipse')
            .attr('cx', fieldSize / 2)
            .attr('cy', fieldSize - 9 * (i+4))
            .attr('rx', '49')
            .attr('ry', '24')
            .attr('stroke', '#000')
            .attr('stroke-width', '2px')
            .attr('fill', d.piece[i] === 'R' ? 'red' : 'grey') : ''
          }
      })



      }

      d3.select('body').style('background-color','#333');
      d3.select('body')
      .append('div')
      .style('margin','auto')
      .style('left','0')
      .style('right','0')
      .style('top','0')
      .style('bottom','0')
      .style("width","500px")
      .style("text-align", "center")
      .html(((game.turn === game.player) && (game.player === 'R') && (!game.finished)) ? "<div class=\"alert alert-dark mt-3\" role=\"alert\">Au joueur <strong>Rouge</strong> de jouer.</div>" : "<div class=\"alert alert-dark mt-3\" role=\"alert\">Au joueur <strong>Gris</strong> de jouer.</div>")

    var div = d3.select("body")
        .append("div")
        .style('margin','auto')
        .style('left','0')
        .style('right','0')
        .style('top','0')
        .style('bottom','0')
        .style("width", boardSize + "px")
        .style("height", boardSize + "px");

    var svg = div.append("svg")
         .attr("width", boardSize + "px")
         .attr("height", boardSize + "px")


    drawBoard(board);
