function showSelectedSquare() {
    if (targetSquare) {
        targetSquare.classList.add('selected-piece-show');
        setTimeout(() => {
            targetSquare.classList.remove('selected-piece-show');
        }, 200)
    } else {
        alert('select a square by click!')
    }
}

function createPieceByURL() {
    url = document.getElementById('piece_url').value
    type = document.getElementById('piece_type').value
    if (targetSquare) {
        targetSquare.classList.add('selected-piece')
        setTimeout(() => {
            if (confirm()) {
                placePiece(createPiece(url, type), board, targetSquare.dataset.row, targetSquare.dataset.col)
            }
            targetSquare.classList.remove('selected-piece')
        }, 100)
    } else {
        alert('select a square!')
    }
}

function addPieceToFiguresBoard() {
    url = document.getElementById('piece_url').value
    type = document.getElementById('piece_type').value
    if (confirm()) {
        for (i in figuresBoard.childNodes) {
            if (figuresBoard.childNodes[i].childNodes.length == 0) {
                placePiece(createPiece(url, type), figuresBoard, figuresBoard.childNodes[i].dataset.row, figuresBoard.childNodes[i].dataset.col);
                break
            }
        }
    }qwe
}

function clearBoard() {
    for (var i = 0; i < 64; i++) {
        try {
            document.getElementById('board').childNodes[i].firstElementChild.remove();
        } catch { }
    }
}

function removeSelected() {
    targetSquare.firstChild.remove();
    targetSquare.classList.remove('selected-piece');
    targetSquare = null;
    selectedPiece = null;
}


function removeBoard() {
    for (var i = 0; i < 64; i++) {
        try {
            document.getElementById('board').firstChild.remove();
        } catch { }
    }
}

function recreateBoard() {
    removeBoard();
    createBoard(8, 8, 100, board);
    arrangeFigures();
}

figuresBoard = document.getElementById('figuresboard');
createBoard(2, 12, 50, figuresBoard);
fg = ['king_', 'queen_', 'rook_', 'horse_', 'elephant_', '']
color = ['white', 'black']
for (i in fg) {
    for (j in color) {
        placePiece(createPiece('figures/' + fg[i] + color[j] + '.png', color[j]), figuresBoard, i, j);
    }
}
function placementLogic(event) {
    if (targetSquare) {
        var targetElem = event.target;
        if (targetElem.classList.contains('square')) {
            placePiece(createPiece(targetElem.firstChild.src, targetElem.firstChild.dataset.type), board, targetSquare.dataset.row, targetSquare.dataset.col);
        }
    } else {
        alert('select a square by click!');
    }
}
figuresBoard.addEventListener('click', placementLogic);
