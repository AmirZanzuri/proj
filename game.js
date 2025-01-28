'use strict'
const MINE = 'MINE'
// const FLAG = 'FLAGE'
// const GAMER = 'GAMER'
// const GLUE = 'GLUE'
// const SECRET_LEFT = 'SECRET_LEFT'
// const SECRET_RIGHT = 'SECRET_RIGHT'
// const SECRET_UP = 'SECRET_UP'
// const SECRET_DOWN = 'SECRET_DOWN'
// const BEF_SECRET = 'BEF_SECRET'
const MINE_IMG = '<img src="img/mine.png">'
// const BALL_IMG = '<img src="img/ball.png">'
// const COLECT_SND = new Audio('audio/right.mp3')
// const WALL_SND = new Audio('audio/POP.wav')
// const FINISH_SND = new Audio('audio/WIN.mp3')
// const GLUE_SND = new Audio('audio/wrong.mp3')

const gGame = {
    score: 0,
    isOn: false
}
var gBoard
const elgameOver = document.querySelector('.game-over')
const elFinishGame = document.querySelector('.finish-game')
function init() {
    console.log('hello')

    gBoard = buildBoard()

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gGame.score = 0
    elgameOver.style.display = 'none'
    elFinishGame.style.display = 'none'


}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isCoveres: false,
                isMine: false,
                isMarked: false,
            }
            renderCell ({ i: i, j: j }, MINE_IMG)
        }
    }
    return board
}

// function updateScore(diff) {
//     // Model
//     gGame.score += diff


//     // DOM
//     document.querySelector('h2 span').innerText = gGame.score
//     if (foodCount === 1) {
//         finishGame()
//     }
// }

// function gameOver() {
//     elgameOver.style.display = 'block'
//     console.log('Game Over')

//     gGame.isOn = false
// }

// function finishGame() {
//     console.log('victorious')
//     elFinishGame.style.display = 'block'
//     gGame.isOn = false


// }