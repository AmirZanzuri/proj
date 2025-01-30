'use strict'

const MINE_IMG = '<img src="img/mine.webp" alt="Mine" class="img">';
const FLAG_IMG = '<img src="img/flag.webp" alt="Flag" class="img">';
const WINRESET = '<img src="img/win.jpeg" alt="win" class="img">'
const LOOSERESET = '<img src="img/sad.png" alt="sad" class="img">'
const REGULARRESET = '<img src="img/regular.webp" alt="restart" class="img">'
const HINTON = '<img src="img/hint.png" alt="hint" class="img">'
const HINTOFF = '<img src="img/turned-off.png" alt="off" class="img">'
const HITAVALBLE = '<img src="img/bulb.webp" alt="bulb" class="img">'


var gNumOfClicks = 0
var isHint = false
const elResetButton = document.querySelector('.reset-button')
var gBoard
const gGame = {
    isOn: false,
    coveredCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gLives
const gLevel = {
    size: 4,
    mines: 2,
    hints: 3
}

function onInit() {
    gLives = 3
    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')
    // gGame.isOn = true
    elResetButton.innerHTML = `Reset ${REGULARRESET} `
    gNumOfClicks = 0
    gGame.isOn = true
    gLevel.hints = 3
}

function buildBoard() {
    const size = gLevel.size
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isCovered: true,
                isMine: false,
                isMarked: false,
            }
        }
    }
    // board[1][1].isMine = true
    // board[2][2].isMine = true

    return board

}

function createMines() {
    const size = gLevel.size
    var totalMines = gLevel.mines
    while (totalMines > 0) {
        var i = getRandomInt(0, size - 1)
        var j = getRandomInt(0, size - 1)
        if (gBoard[i][j].isMine === false) {
            gBoard[i][j].isMine = true
            totalMines--
        }
    }
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j]
            currCell.minesAroundCount = setMinesNegsCount(i, j, gBoard)
        }

    }
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
    if (isHint) {
        hint(i, j)
        isHint = false
    }
    else if (gNumOfClicks === 0) {
        console.log(gNumOfClicks);
        createMines()
        gBoard[i][j].isCovered = false
        elCell.innerHTML = gBoard[i][j].minesAroundCount
        console.log();
        gNumOfClicks = 1

    }
    else if (gBoard[i][j].isMine) {
        gLives--
        elCell.innerHTML = MINE_IMG
        setTimeout(() => {
            elCell.innerHTML = ""
        }, 500);
        checkIfGameOver()
    } else {
        gBoard[i][j].isCovered = false
        elCell.innerHTML = gBoard[i][j].minesAroundCount

        checkFinish(gBoard[i][j])
    }
}

function onCellRightClick(elCell, i, j, event) {
    event.preventDefault()
    gBoard[i][j].isMarked = true
    elCell.innerHTML = FLAG_IMG
    checkFinish()
}

function turnOnHint(elButton) {
    elButton.innerHTML = HINTON
    isHint = true

}

function hint(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue;
            var cell = gBoard[i][j];
            var elCell = document.querySelector(`.cell-${i}-${j}`);
            console.log(elCell);
            if (cell.isCovered) {
                if (cell.isMine) {
                    elCell.innerHTML = MINE_IMG;
                } else {
                    elCell.innerHTML = cell.minesAroundCount;

                }
            }

        }
    }
    setTimeout(() => {
        for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
            if (i < 0 || i >= gBoard.length) continue;
            for (var j = colIdx - 1; j <= colIdx + 1; j++) {
                if (j < 0 || j >= gBoard.length) continue;
                cell = gBoard[i][j];
                elCell = document.querySelector(`.cell-${i}-${j}`);
                console.log(elCell);
                if (cell.isCovered && !cell.isMarked) {
                    elCell.innerHTML = "";
                } else if (cell.isCovered && cell.isMarked) {
                    elCell.innerHTML = FLAG_IMG;

                }
            }

        }
    }, 2000);
}


function checkIfGameOver() {
    var livesContainer = document.querySelector('span')
    livesContainer.innerText = gLives
    if (gLives === 0) {
        gameOver()
    }
}
function gameOver() {
    gGame.isOn = false
    const size = gBoard.length
    console.log(size);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (gBoard[i][j].isMine) {
                gBoard[i][j].isCovered = false

            }
        }
    }
    elResetButton.innerHTML = `Reset ${LOOSERESET} `
    renderBoard(gBoard, '.board-container')
    alert('gameOver')
}

function checkFinish() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j]

            if (currCell.isCovered && !currCell.isMarked) {
                return
            }
            else if (currCell.isMine && !currCell.isMarked) {
                return
            }
        }
    }
    elResetButton.innerHTML = `Reset ${WINRESET} `
    console.log("vvvvvv");
    alert("victory")

}