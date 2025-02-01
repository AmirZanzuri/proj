'use strict'
function selectLevel() {
    selectedLevel = prompt('Select - Beginner, Medium or expert')
    selectedLevel = selectedLevel.toLowerCase();
    if (selectedLevel === 'beginner' || selectedLevel === '') {
        gLevel.size = 4
        gLevel.mines = 2
    } else if (selectedLevel === 'medium') {
        gLevel.size = 8
        gLevel.mines = 14
    } else if (selectedLevel === 'expert') {
        gLevel.size = 12
        gLevel.mines = 32
    } else if (selectedLevel === 'ran') {
        gLevel.size = 36
        gLevel.mines = 110
    }

}

function renderBoard(mat, selector) {
    var strHTML = '<table><tbody>';

    for (let i = 0; i < mat.length; i++) {
        strHTML += '<tr>';

        for (var j = 0; j < mat[i].length; j++) {
            const cell = mat[i][j];
            const className = `cell cell-${i}-${j}`;
            var cellContent = '';

            if (cell.isCovered) {
                cellContent = '';
            } else if (cell.isMine) {
                cellContent = MINE_IMG;
            } else if (cell.isMarked) {
                cellContent = FLAG_IMG;
            } else {
                cellContent = cell.minesAroundCount || '';
            }
            strHTML += `<td class="${className}" onclick="onCellClick(this, ${i}, ${j})"  oncontextmenu="onCellRightClick(this, ${i}, ${j}, event)">${cellContent}</td>`;
        }
        strHTML += '</tr>';
    }

    strHTML += '</tbody></table>';

    const elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var timerCount = 0;  
var timerInterval;  
var isTimerRunning = false; 

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(function () {
        timerCount++;
        document.getElementById("timer").textContent = `Time: ${timerCount}`;
    }, 1000); // Update every second (1000ms)
    timerCount = 0

}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}


function loadBestScores() {
    let begginerBestScore = localStorage.getItem('begginerBestScore') || 0;
    let mediumBestScore = localStorage.getItem('mediumBestScore') || 0;
    let expertBestScore = localStorage.getItem('expertBestScore') || 0;

    document.querySelector('.begginer-best').innerHTML = begginerBestScore;
    document.querySelector('.medium-best').innerHTML = mediumBestScore;
    document.querySelector('.expert-best').innerHTML = expertBestScore;
}