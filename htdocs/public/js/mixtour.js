const fieldSize = 100;
const boardDimension = 5;
const boardSize = boardDimension * fieldSize;

let board = [];
const svg = d3.select('#canvas');

const socket = io('http://localhost:3000/');
socket.on('fuck', (error) => {
    d3.select('#match-info')
        .text(error.msg);
})

fetch('/api/createtoken').then(response => {
    console.log(response);
    if(response.status === 200) {
        response.json().then(json => {
            socket.emit('goToQueue', json.token);
        })
    } else {
        response.json().then(json => {
            d3.select('#match-info').text(json.message);
        });
    }
});

socket.on('queueValidation', () => {
    socket.on('board', (game) => {
        d3.select('#match-info')
            .text((game.turn === game.player) ? 'A votre tour de jouer !' : 'Au joueur adversaire de jouer !');

        console.log(game);
        board = [];
        for (let i = 0; i < 5; ++i) {
            for (let j = 0; j < 5; ++j) {
                board.push({
                    x: i,
                    y: j,
                    piece: game.board[i][j]
                });
            }
        }
        drawBoard(board);

        if(game.turn === game.player) {
            d3.selectAll('g.fields').on('click', function(d) {
                socket.emit('move', {type: 'put', coords: [d.x, d.y]})
            })
        }
    })
});

function initialisation() {
    for(let i = 0; i < boardDimension; i++) {
        for(let j = 0; j < boardDimension; j++) {
            board.push({
                x: i,
                y: j,
                piece: ''
            });
        }
    }

    svg.attr('width', boardSize + 'px')
        .attr('height', boardSize + 'px');

    drawBoard(board);
}
initialisation();

function updateBoard(game) {
    board = [];
    for(let i = 0; i < boardDimension; ++i) {
        for(let j = 0; j < boardDimension; ++j) {
            board.push({
                x: i,
                y: j,
                piece: game.board[i][j]
            });
        }
    }    
}

function drawPiece(g, i) {
    g.append('ellipse')
        .attr('cx', fieldSize / 2)
        .attr('cy', fieldSize - 9 * (i+3))
        .attr('rx', '40')
        .attr('ry', '24');

    g.append('ellipse')
        .attr('cx', fieldSize / 2)
        .attr('cy', fieldSize - 9 * (i+3) - 6)
        .attr('rx', '40')
        .attr('ry', '24' - 3);
}

function drawBoard() {
    svg.selectAll('.cell')
        .remove();

    svg.selectAll('.cell')
        .data(board)
        .enter()
        .append('g')
        .attr('class', 'cell')
        .each(function(d) {
            const g = d3.select(this);

            g.attr('transform', d => `translate(${d.x*fieldSize},${d.y*fieldSize})`);

            g.append('rect')
                .attr('width', fieldSize + 'px')
                .attr('height', fieldSize + 'px')
                .on('click', (d) => {
                    socket.emit('move', {
                        type: 'put',
                        coords: [d.x, d.y]
                    });
                })

            for(let i = 0; i < d.piece.length; ++i) {
                const piece = g.append('g')
                    .attr('class', `piece ${d.piece[i] === 'R' ? 'red' : 'white'}`);

                drawPiece(piece, i);

                piece.on('mouseover', function(d) {
                    d3.select(this).classed('hover', true)
                });

                piece.on('mouseout', function(d) {
                    d3.select(this).classed('hover', false)
                });

                piece.call(d3.drag()
                    .on('start', function() {
                        dragNbPiece = d.piece.length - i;
                        dragFrom = [d.x, d.y]

                        for(let j = i; j < d.piece.length; ++j) {
                            const piece = dragGroup.append('g')
                                .attr('class', `piece ${d.piece[j] === 'R' ? 'red' : 'white'}`);
                            drawPiece(piece, j);
                        }

                        d.piece = d.piece.slice(0, i);
                        drawBoard();

                        dragCoord.x = d.x*fieldSize;
                        dragCoord.y = d.y*fieldSize;
                        firstDrag = true;
                        dragGroup.raise()
                            .attr('transform', `translate(${dragCoord.x},${dragCoord.y})`)
                    })
                    .on('drag', function() {
                        if(firstDrag) { // le premier drag a un mauvais dx (pas compris)
                            firstDrag = false;
                            return;
                        }

                        dragCoord.x += d3.event.dx;
                        dragCoord.y += d3.event.dy;
                        dragGroup.attr('transform', `translate(${dragCoord.x},${dragCoord.y})`)

                    })
                    .on('end', function() {
                        const dragTo = [Math.round(dragCoord.x / fieldSize), Math.round(dragCoord.y / fieldSize)];
                        socket.emit('move', {
                            type: 'move',
                            from: dragFrom,
                            to: dragTo,
                            nbPieces: dragNbPiece
                        });
                    })
                );
            }
        });
}

let firstDrag = false;
let dragGroup = svg.append('g');
let dragCoord = { }
let dragNbPiece = null;
let dragFrom = null;