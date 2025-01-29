'use strict'

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


// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location)
    const elCell = document.querySelector(cellSelector)
    // console.log(elCell);
    
    elCell.innerHTML = value
    }

    // Returns the class name for a specific cell
function getClassName(location) {
    const cellClass = `cell-${location.i}-${location.j}`
    // console.log(cellClass);
    
    return cellClass

    }


    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  