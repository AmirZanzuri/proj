

function createHints() {
    var elHints = document.querySelector('.hints-container')
    var strHTML = ''
    for (var i = 0; i < hints; i++) {
        strHTML += `<button class= "hint" "img" onclick="turnOnHint(this)">${HINTAVALBLE_IMG}</button>`
    }
    elHints.innerHTML = strHTML
}

function turnOnHint() {
    var elHints = document.querySelector('.hints-container')
    elHints.innerHTML = `<button class = "is-on" "img">${HINTON_IMG}</button>`
    isHint = true
    hints--
    var elSafe = document.querySelector('.safe-container')
    elSafe.innerHTML = ``
        var elMegaHint = document.querySelector('.mega-hint-container')
    elMegaHint.innerHTML = ``
}

function hint(rowIdx, colIdx) {
    var elBulb = document.querySelector('.is-on')
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue;
            var cell = gBoard[i][j];
            var elCell = document.querySelector(`.cell-${i}-${j}`);
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
        elBulb.innerHTML = `<button class = "is-on" "img">${HINTOFF_IMG}</button>`
        elBulb.disabled = true
        createHints()
        createSafeClicks()
        createMegaHint ()
    }, 2500);
}

function createSafeClicks() {
    var elSafe = document.querySelector('.safe-container')
    var strHTML = ''

    for (var i = 0; i < SafeClicks; i++) {
        strHTML += `<button class= "safe-Click" onclick="turnOnSafe()">Safe-Click</button>`
    }
    elSafe.innerHTML = strHTML
}

function turnOnSafe() {
    var elSafe = document.querySelector('.safe-container')
    elSafe.innerHTML = `<button class = "safe-is-on">Safe Click Appears</button>`
    var elHints = document.querySelector('.hints-container')
    elHints.innerHTML = ``
    var elMegaHint = document.querySelector('.mega-hint-container')
    elMegaHint.innerHTML = ``

    var count = 1
    while (count > 0) {
        var i = getRandomInt(0, gBoard.length - 1)
        var j = getRandomInt(0, gBoard.length - 1)
        if (gBoard[i][j].isCovered && !gBoard[i][j].isMine && !gBoard[i][j].isMarked) {
            var elCell = document.querySelector(`.cell-${i}-${j}`);
            elCell.innerHTML = gBoard[i][j].minesAroundCount;
            elCell.classList.add('safe-appears')
            count--
            setTimeout(() => {
                SafeClicks--
                createSafeClicks()
                createHints()
                createMegaHint()
                elCell.innerHTML = '';
                elCell.classList.remove('safe-appears')


            }, 1500);
        }
    }

}
function createMegaHint() {
    var elMega = document.querySelector('.mega-hint-container')
    var strHTML = ''
    for (var i = 0; i < megaHints; i++) {
        strHTML += `<button class= "mega-hint-click" onclick="turnOnMegaHint()">Mega-Hint</button>`
    }
    elMega.innerHTML = strHTML
}

function turnOnMegaHint() {
    var elMegaHint = document.querySelector('.mega-hint-container')
    elMegaHint.innerHTML = `Select Two Cells`
    isMegaHint = true
    var elSafe = document.querySelector('.safe-container')
    elSafe.innerHTML = ``
    var elHints = document.querySelector('.hints-container')
    elHints.innerHTML = ``

}

function megaHintReveal(firstClickRowIdx, firstClickColIdx, secClickRowIdx, secClickColIdx) {
    var elMegaHint = document.querySelector('.mega-hint-container')
    if (firstClickRowIdx > secClickRowIdx || firstClickColIdx > secClickColIdx) {
        elMegaHint.innerHTML = "select from top left to buttom right"
        setTimeout(() => {
            createHints()
            createSafeClicks()
            createMegaHint ()
        }, 1000);
    } else {
        elMegaHint.innerHTML = 'Mega Hint Appears'
        megaHints--
        for (var i = firstClickRowIdx; i <= secClickRowIdx; i++) {
            for (var j = firstClickColIdx; j <= secClickColIdx; j++) {
                var cell = gBoard[i][j];
                var elCell = document.querySelector(`.cell-${i}-${j}`);
                if (cell.isCovered) {
                    if (cell.isMine) {
                        elCell.innerHTML = MINE_IMG;
                    } else {
                        elCell.innerHTML = cell.minesAroundCount;

                    }
                }

            }
 setTimeout(() => {
                for (var i = firstClickRowIdx; i <= secClickRowIdx; i++) {
                    for (var j = firstClickColIdx; j <= secClickColIdx; j++) {
                        cell = gBoard[i][j];
                        elCell = document.querySelector(`.cell-${i}-${j}`);
                        if (cell.isCovered && !cell.isMarked) {
                            elCell.innerHTML = "";
                        } else if (cell.isCovered && cell.isMarked) {
                            elCell.innerHTML = FLAG_IMG;
                        }
                    }
                }
                elMegaHint.innerHTML = ''
                createHints()
                createSafeClicks()
            }, 3500);
        }
    }
}