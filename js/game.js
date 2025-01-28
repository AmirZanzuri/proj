'use strict'

const MINE_IMG = '<img src="img/mine.jpeg" alt="Mine">';
const FLAG_IMG = '<img src="img/flag.png" alt="Flag">';
var gBoard
const gGame = {
    isOn: false,
    coveredCount: 0,
    markedCount: 0,
    secsPassed: 0
}


const gLevel = {
    size: 4,
    mines: 2
}

function onInit() {
    console.log('hello')

    gBoard = buildBoard()

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}


function buildBoard() {
    const size = gLevel.size
    const board = []
    var totalMines = gLevel.mines


    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isCovered: false,
                isMine: false,
                isMarked: false,
            }
        }
    }
    board[1][1].isMine = true
    board[2][2].isMine = true

    // while (totalMines > 0) {

    //     var rendI = getRandomInt(0, size - 1)
    //     var rendJ = getRandomInt(0, size - 1)
    //     if (board[rendI][rendJ].isMine === false) {
    //         board[rendI][rendJ].isMine = true
    //         totalMines --
    //     }
    // }

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j]
            currCell.minesAroundCount = setMinesNegsCount(i, j, board)
        }

    }
    return board

}


function setMinesNegsCount(rowIdx, colIdx, board) {
    const size = board.length;
    var neighborCount = 0;

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= size) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= size) continue;
            if (i === rowIdx && j === colIdx) continue;

            var currCell = board[i][j];
            if (currCell.isMine) neighborCount++;
        }
    }
    return neighborCount;

}


function onCellClick(elCell, i, j) {
    console.log(gBoard[i][j])
    console.log(elCell);
    if (gBoard[i][j].isCovered) {
        gBoard[i][j].isCovered = false
    renderBoard(gBoard, '.board-container')

    } else { gBoard[i][j].isCovered = true }
    console.log(gBoard[i][j])
    console.log(elCell);
    elCell.innerText = ""

}
