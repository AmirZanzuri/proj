'use strict'

const MINE_IMG = '<img src="img/mine.webp" alt="Mine" class="img">';
const FLAG_IMG = '<img src="img/flag.webp" alt="Flag" class="img">';
const WINRESET_IMG = '<img src="img/win.jpeg" alt="win" class="img">'
const LOOSERESET_IMG = '<img src="img/sad.png" alt="sad" class="img">'
const REGULARRESET_IMG = '<img src="img/regular.webp" alt="restart" class="img">'
const HINTON_IMG = '<img src="img/hint.png" alt="hint" class="img">'
const HINTOFF_IMG = '<img src="img/turned-off.png" alt="off" class="img">'
const HINTAVALBLE_IMG = '<img src="img/bulb.png" alt="bulb" class="img">'


var gNumOfClicks = 0
var isHint = false
var isMegaHint = false
var isFirsClickOn = false
var firstClickRowIdx
var firstClickColIdx
var secClickRowIdx
var secClickColIdx
const elResetButton = document.querySelector('.reset-button')
var gBoard
const gGame = {
    isOn: false,
    coveredCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var hints
var megaHints
var SafeClicks
var gLives
const gLevel = {
    size: 5,
    mines: 3,
}
var selectedLevel
var currScore
var begginerBestScore = Infinity
var mediumBestScore = Infinity
var begginerBestScore = Infinity

function onInit() {
    selectLevel()
    gLives = 3
    gBoard = buildBoard()
    loadBestScores()
    renderBoard(gBoard, '.board-container')
    // gGame.isOn = true
    elResetButton.innerHTML = `Reset ${REGULARRESET_IMG} `
    gNumOfClicks = 0
    gGame.isOn = true
    hints = 3
    SafeClicks = 3
    isMegaHint = false
    megaHints = 1
    timerCount = 0
    isFirsClickOn = false
    var elHints = document.querySelector('.hints-container')
    elHints.innerHTML = `Press first cell to start`
    document.getElementById("timer").textContent = `Time: ${timerCount}`;

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
        if (!gBoard[i][j].isMine && gBoard[i][j].isCovered) {
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
        console.log(elCell);

    } else if (isMegaHint && !isFirsClickOn) {
        firstClickRowIdx = i
        firstClickColIdx = j
        isFirsClickOn = true
        var elMegaHint = document.querySelector('.mega-hint-container')
        elMegaHint.innerHTML = `Select Second Cell`

    } else if (isMegaHint && isFirsClickOn) {
        secClickRowIdx = i
        secClickColIdx = j
        megaHintReveal(firstClickRowIdx, firstClickColIdx, secClickRowIdx, secClickColIdx)
        isMegaHint = false
        isFirsClickOn = false

    } else if (gNumOfClicks === 0) {
        createMines()
        createHints()
        createSafeClicks()
        createMegaHint()
        startTimer()
        console.log(gNumOfClicks);
        gBoard[i][j].isCovered = false
        elCell.innerHTML = gBoard[i][j].minesAroundCount
        console.log();
        gNumOfClicks = 1
        if (gBoard[i][j].minesAroundCount === 0) {
            uncoverNeigbours(i, j)
        }

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
        checkFinish()
        if (gBoard[i][j].minesAroundCount === 0) {
            uncoverNeigbours(i, j)
            checkFinish()

        }
    }
}

function onCellRightClick(elCell, i, j, event) {
    event.preventDefault()
    gBoard[i][j].isMarked = true
    elCell.innerHTML = FLAG_IMG
    checkFinish()
}

function uncoverNeigbours(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (!gBoard[i][j].isCovered) continue
            var cell = gBoard[i][j];
            var elCell = document.querySelector(`.cell-${i}-${j}`);
            if (!cell.isMarked) {
                cell.isCovered = false
                elCell.innerHTML = cell.minesAroundCount;
                if (cell.minesAroundCount === 0) {
                    uncoverNeigbours(i, j)
                }
            }
        }
    }
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
    elResetButton.innerHTML = `Reset ${LOOSERESET_IMG} `
    renderBoard(gBoard, '.board-container')
    stopTimer()
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
    currScore = +timerCount
    elResetButton.innerHTML = `Reset ${WINRESET_IMG} `
    stopTimer()
    checkIfBest()
    console.log("vvvvvv");

}

function checkIfBest() {
    let begginerBestScore = localStorage.getItem('begginerBestScore') || Infinity;
    let mediumBestScore = localStorage.getItem('mediumBestScore') || Infinity;
    let expertBestScore = localStorage.getItem('expertBestScore') || Infinity;

    var elExpertBestCobtainer = document.querySelector('.expert-best');
    var elMediumBestCobtainer = document.querySelector('.medium-best');
    var elBegginerBestCobtainer = document.querySelector('.begginer-best');

    if (selectedLevel === 'Begginer' && currScore < begginerBestScore) {
        begginerBestScore = currScore;
        elBegginerBestCobtainer.innerHTML = currScore;
        localStorage.setItem('begginerBestScore', currScore);
        alert("victory New Best Score")
    } else if (selectedLevel === 'Begginer' && !currScore < begginerBestScore) {
        alert('Victory')
    }

    if (selectedLevel === 'Medium' && currScore < mediumBestScore) {
        mediumBestScore = currScore;
        elMediumBestCobtainer.innerHTML = currScore;
        localStorage.setItem('mediumBestScore', currScore);
        alert("victory New Best Score")
    } else if (selectedLevel === 'Medium' && !currScore < mediumBestScore) {
    alert('Victory')
}

if (selectedLevel === 'Expert' && currScore < expertBestScore) {
    expertBestScore = currScore;
    elExpertBestCobtainer.innerHTML = currScore;
    localStorage.setItem('expertBestScore', currScore);
    alert("victory New Best Score")
} else if (selectedLevel === 'Expert' && !currScore < expertBestScore) {
    alert('Victory')
}
}
