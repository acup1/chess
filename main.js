
var board = document.getElementById('board');
function createBoard(x, y, piece_size, cld) {
    cld.style.width = piece_size * x + 'px';
    cld.style.height = piece_size * y + 'px';
    for (var i = 0; i < y; i++) {
        for (var j = 0; j < x; j++) {
            var square = document.createElement('div');
            square.className = (i + j) % 2 === 0 ? 'square' : 'square black-square';
            square.dataset.row = i;
            square.dataset.col = j;
            square.style.width = piece_size + 'px';
            square.style.height = piece_size + 'px';
            cld.appendChild(square);
        }
    }
}
createBoard(8, 8, 100, board);

var pieces = [];

function arrangeFigures() {
    var blackPawn1 = createPiece('figures/black.png', 'black');
    var blackPawn2 = createPiece('figures/black.png', 'black');
    var blackPawn3 = createPiece('figures/black.png', 'black');
    var blackPawn4 = createPiece('figures/black.png', 'black');
    var blackPawn5 = createPiece('figures/black.png', 'black');
    var blackPawn6 = createPiece('figures/black.png', 'black');
    var blackPawn7 = createPiece('figures/black.png', 'black');
    var blackPawn8 = createPiece('figures/black.png', 'black');
    var blackElephant1 = createPiece('figures/elephant_black.png', 'black');
    var blackElephant2 = createPiece('figures/elephant_black.png', 'black');
    var blackHorse1 = createPiece('figures/horse_black.png', 'black');
    var blackHorse2 = createPiece('figures/horse_black.png', 'black');
    var blackRook1 = createPiece('figures/rook_black.png', 'black');
    var blackRook2 = createPiece('figures/rook_black.png', 'black');
    var blackQueen = createPiece('figures/queen_black.png', 'black');
    var blackKing = createPiece('figures/king_black.png', 'black');

    placePiece(blackPawn1, board, 1, 0);
    placePiece(blackPawn2, board, 1, 1);
    placePiece(blackPawn3, board, 1, 2);
    placePiece(blackPawn4, board, 1, 3);
    placePiece(blackPawn5, board, 1, 4);
    placePiece(blackPawn6, board, 1, 5);
    placePiece(blackPawn7, board, 1, 6);
    placePiece(blackPawn8, board, 1, 7);
    placePiece(blackElephant1, board, 0, 0);
    placePiece(blackHorse1, board, 0, 1);
    placePiece(blackRook1, board, 0, 2);
    placePiece(blackQueen, board, 0, 3);
    placePiece(blackKing, board, 0, 4);
    placePiece(blackRook2, board, 0, 5);
    placePiece(blackHorse2, board, 0, 6);
    placePiece(blackElephant2, board, 0, 7);

    var whitePawn1 = createPiece('figures/white.png', 'white');
    var whitePawn2 = createPiece('figures/white.png', 'white');
    var whitePawn3 = createPiece('figures/white.png', 'white');
    var whitePawn4 = createPiece('figures/white.png', 'white');
    var whitePawn5 = createPiece('figures/white.png', 'white');
    var whitePawn6 = createPiece('figures/white.png', 'white');
    var whitePawn7 = createPiece('figures/white.png', 'white');
    var whitePawn8 = createPiece('figures/white.png', 'white');
    var whiteElephant1 = createPiece('figures/elephant_white.png', 'white');
    var whiteElephant2 = createPiece('figures/elephant_white.png', 'white');
    var whiteHorse1 = createPiece('figures/horse_white.png', 'white');
    var whiteHorse2 = createPiece('figures/horse_white.png', 'white');
    var whiteRook1 = createPiece('figures/rook_white.png', 'white');
    var whiteRook2 = createPiece('figures/rook_white.png', 'white');
    var whiteQueen = createPiece('figures/queen_white.png', 'white');
    var whiteKing = createPiece('figures/king_white.png', 'white');

    placePiece(whitePawn1, board, 6, 0);
    placePiece(whitePawn2, board, 6, 1);
    placePiece(whitePawn3, board, 6, 2);
    placePiece(whitePawn4, board, 6, 3);
    placePiece(whitePawn5, board, 6, 4);
    placePiece(whitePawn6, board, 6, 5);
    placePiece(whitePawn7, board, 6, 6);
    placePiece(whitePawn8, board, 6, 7);
    placePiece(whiteElephant1, board, 7, 0);
    placePiece(whiteHorse1, board, 7, 1);
    placePiece(whiteRook1, board, 7, 2);
    placePiece(whiteQueen, board, 7, 3);
    placePiece(whiteKing, board, 7, 4);
    placePiece(whiteRook2, board, 7, 5);
    placePiece(whiteHorse2, board, 7, 6);
    placePiece(whiteElephant2, board, 7, 7);
}
arrangeFigures();

function createPiece(imageUrl, type) {
    var piece = document.createElement('img');
    piece.className = 'piece';
    piece.dataset.type = type;
    piece.src = imageUrl;
    return piece;
}

function placePiece(piece, brd, row, col) {
    var square = getSquare(brd, row, col);
    piece.style.width = parseInt(brd.firstChild.style.width) * 0.9 + 'px';
    piece.style.height = parseInt(brd.firstChild.style.width) * 0.9 + 'px';
    square.appendChild(piece);
    pieces.push({ piece: piece, square: square });
}

function getSquare(brd, row, col) {
    return brd.querySelector('[data-row="' + row + '"][data-col="' + col + '"]');
}

var selectedPiece = null;
var targetSquare = null;

function movingLogic(event) {
    targetSquare = event.target;
    if (targetSquare.classList.contains('square')) {
        if (selectedPiece) {
            var targetPiece = targetSquare.querySelector('.piece');
            if (targetPiece && targetPiece.dataset.type == selectedPiece.dataset.type) {
                if (selectedPiece.parentNode.classList.contains('selected-piece')){
                    selectedPiece.parentNode.classList.remove('selected-piece');
                }
                selectedPiece = null;
            }
            if (!targetPiece || (targetPiece && targetPiece.dataset.type !== selectedPiece.dataset.type)) {
                if (!targetPiece || targetPiece.dataset.type !== selectedPiece.dataset.type) {
                    if (targetPiece) {
                        targetPiece.parentNode.removeChild(targetPiece);
                    }
                    selectedPiece.parentNode.classList.remove('selected-piece');
                    targetSquare.appendChild(selectedPiece);
                    selectedPiece = null;
                }
            }
        } else {
            selectedPiece = targetSquare.querySelector('.piece');
            if (selectedPiece) {
                selectedPiece.parentNode.classList.add('selected-piece');
            } else {
                try { showSelectedSquare(); } catch { }
            }
        }
    }
}
board.addEventListener('click', movingLogic);
