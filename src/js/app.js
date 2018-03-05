// Importing css
import '../css/style.css';
// Importing from different js file
import {
    addRow,
    addCol,
    delRow,
    delCol,
    calSum,
    calDiff,
    calMul,
    calDiv,
    calMod,
    exportToCSV
} from './dom-loader.js';
var isMouseDown, isHighlighted;
// Declaring number of rows and cols to be displayed on page load
var defrows = 8,
    defcolumns = 5;
// Function to be called on page load 
var init = () => {

    loadTable();
    // Calculate height
    let windowHeight = window.innerHeight;
    let headerHeight = document.getElementById('header').clientHeight;
    let footerHeight = document.getElementById('footer').clientHeight;
    // Append total height to the window screen
    let totalHeight = windowHeight - headerHeight - footerHeight;
    document.getElementById("mainContent").setAttribute('style', 'min-height: ' + totalHeight + 'px');
}

window.onload = function () {
    init();
};
// Loads the Default Table on Page Load
var loadTable = () => {
    let tablearea = document.getElementById('table');
    let table = document.createElement('table');
    table.setAttribute("id", "tableId");
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Load for rows
    for (let i = 0; i <= defrows; i++) {
        let tr = document.createElement('tr');
        tr.setAttribute("id", "tr_" + i);
        if (i > 0) {
            // Load for columns
            for (let j = 0; j <= defcolumns; j++) {
                let td = document.createElement('td');

                // td.addEventListener('mousedown', function () {
                //     if (event.isTrusted) {
                //         isMouseDown = true;
                //         td.classList.toggle("selected");
                //         isHighlighted = td.classList.contains("selected");
                //         if(td.classList.contains("formula") || td.classList.contains("highlight")) {
                //             td.classList.remove("selected");
                //         }
                //         return false;
                //     }
                // });

                // td.addEventListener('mouseover', function () {
                //     if (event.isTrusted) {
                //         if (isMouseDown) {
                //             td.classList.toggle("selected", isHighlighted);
                //         }
                //     }
                // });
                
                eventHandlersTd(td);
                if (j > 0) {
                    let x = document.createElement("INPUT");
                    x.setAttribute("type", "text");
                    td.appendChild(x);
                    td.setAttribute("id", str.charAt(j - 1) + i);
                } else {
                    let x = document.createTextNode(i);
                    td.appendChild(x);
                }
                tr.appendChild(td);
            }
        } else {
            for (let j = 0; j <= defcolumns; j++) {
                let th = document.createElement('th');
                if (j > 0) {
                    let x = document.createTextNode(str.charAt(j - 1));
                    th.appendChild(x);
                } else {
                    let x = document.createTextNode("");
                    th.appendChild(x);
                }
                tr.appendChild(th);
            }
        }
        table.appendChild(tr);
    }
    tablearea.appendChild(table);
}

// Buttons used on the index page
addRow.addEventListener('click', insertRow);
addCol.addEventListener('click', insertColumn);
delRow.addEventListener('click', removeRow);
delCol.addEventListener('click', removeCol);

calSum.addEventListener('click', calculateSum);
calDiff.addEventListener('click', calculateDifference);
calMul.addEventListener('click', calculateMultiplication);
calDiv.addEventListener('click', calculateDivision);
calMod.addEventListener('click', calculateModulus);

exportToCSV.addEventListener('click', exportTableToCSV);

document.onmouseup = myMouseUpHandler;

function myMouseUpHandler() {
    isMouseDown = false;
}

var eventHandlersTd = (td) => {
    //Double Click to select Cells to Delete
    td.addEventListener('dblclick', function () {
        if (event.isTrusted) {
            // td.classList.remove("selected");
            td.classList.toggle("highlight");
            // if(td.classList.contains("formula")) {
            //     td.classList.remove("highlight");
            // };
        }
    });
    //On Change of Event To Check for Arithmatic Operations
    td.addEventListener('change', function () {
        if (event.isTrusted) {
            if (td.querySelector('input').value.toLowerCase().startsWith("=sum")) {
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                let regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(td.querySelector('input').value);
                if (matches) {
                    let array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findSum(td.id, array[0], array[1]);
                    }
                }
            }
            if (td.querySelector('input').value.toLowerCase().startsWith("=diff")) {
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                let regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(td.querySelector('input').value);
                if (matches) {
                    let array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findDiff(td.id, array[0], array[1]);
                    }
                }
            }
            if (td.querySelector('input').value.toLowerCase().startsWith("=mul")) {
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                let regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(td.querySelector('input').value);
                if (matches) {
                    let array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findMul(td.id, array[0], array[1]);
                    }
                }
            }
            if (td.querySelector('input').value.toLowerCase().startsWith("=div")) {
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                let regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(td.querySelector('input').value);
                if (matches) {
                    let array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findDiv(td.id, array[0], array[1]);
                    }
                }
            }
            if (td.querySelector('input').value.toLowerCase().startsWith("=mod")) {
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                let regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(td.querySelector('input').value);
                if (matches) {
                    let array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findMod(td.id, array[0], array[1]);
                    }
                }
            }
            
            updateOperation();
        }
    });
}

var updateOperation = () => {
    //To check if Any Update is made to any other cells
    let formulacells = document.getElementsByClassName("formula");
    for (let i = 0; i < formulacells.length; i++) {
        let dataId = formulacells[i].id;
        let dataFormula = formulacells[i].dataset.formula;
        if (dataFormula.toLowerCase().startsWith("=sum")) {
            let regExp = /\(([^)]+)\)/;
            let matches = regExp.exec(dataFormula);
            if (matches) {
                let array = matches[1].toUpperCase().split(',');
                if (array.length == 2) {
                    findSum(dataId, array[0], array[1]);
                }
            }
        }
        if (dataFormula.toLowerCase().startsWith("=diff")) {
            let regExp = /\(([^)]+)\)/;
            let matches = regExp.exec(dataFormula);
            if (matches) {
                let array = matches[1].toUpperCase().split(',');
                if (array.length == 2) {
                    findDiff(dataId, array[0], array[1]);
                }
            }
        }
        if (dataFormula.toLowerCase().startsWith("=mul")) {
            let regExp = /\(([^)]+)\)/;
            let matches = regExp.exec(dataFormula);
            if (matches) {
                let array = matches[1].toUpperCase().split(',');
                if (array.length == 2) {
                    findMul(dataId, array[0], array[1]);
                }
            }
        }
        if (dataFormula.toLowerCase().startsWith("=div")) {
            let regExp = /\(([^)]+)\)/;
            let matches = regExp.exec(dataFormula);
            if (matches) {
                let array = matches[1].toUpperCase().split(',');
                if (array.length == 2) {
                    findDiv(dataId, array[0], array[1]);
                }
            }
        }
        if (dataFormula.toLowerCase().startsWith("=mod")) {
            let regExp = /\(([^)]+)\)/;
            let matches = regExp.exec(dataFormula);
            if (matches) {
                let array = matches[1].toUpperCase().split(',');
                if (array.length == 2) {
                    findMod(dataId, array[0], array[1]);
                }
            }
        }
    }
}
//Calculates the Sum 
var findSum = (id, x, y) => {
    if (x && y) {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let firstNumber;
        let lastNumber;
        let fnumber = document.getElementById(x).parentNode.id.split("_");
        let lnumber = document.getElementById(y).parentNode.id.split("_");
        let firstLetter = document.getElementById(x).id;
        let lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        let rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        rowNumber2 = match2[0];

        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (let i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }

            let sum = 0;
            for (let i = firstNumber; i <= lastNumber; i++) {
                let val1 = cellsarea[i].querySelector('input').value;
                if (val1 == "" || !val1.match(/^[0-9]+$/)) {
                    val1 = 0;
                }
                sum += parseFloat(val1);
            }
            document.getElementById(id).querySelector('input').value = sum;
        } else if (firstLetter[0] == lastLetter[0]) {
            let colNumber;
            for (let i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }
            let sum = 0;
            for (let j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    let val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                    if (val2 == "" || !val2.match(/^[0-9]+$/)) {
                        val2 = 0;
                    }
                    sum += parseFloat(val2);
                }
            }
            document.getElementById(id).querySelector('input').value = sum;
        }
    }
}
//Calculates the Difference
var findDiff = (id, x, y) => {
    if (x && y) {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let firstNumber;
        let lastNumber;
        let fnumber = document.getElementById(x).parentNode.id.split("_");
        let lnumber = document.getElementById(y).parentNode.id.split("_");
        let firstLetter = document.getElementById(x).id;
        let lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        let rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        rowNumber2 = match2[0];
        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (let i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            let diff;
            let value_1 = 0;
            for (let i = firstNumber; i <= lastNumber; i++) {
                let cellsVal1 = cellsarea[firstNumber].querySelector('input').value;
                if (cellsVal1 == "" || !cellsVal1.match(/^[0-9]+$/)) {
                    cellsVal1 = 0;
                }
                value_1 = parseFloat(cellsVal1);
                let val1 = cellsarea[i].querySelector('input').value;
                if (i > firstNumber) {
                    if (val1 == "" || !val1.match(/^[0-9]+$/)) {
                        val1 = 0;
                    }
                    diff -= parseFloat(val1);
                    value_1 = diff;
                }
                diff = value_1;
            }
            document.getElementById(id).querySelector('input').value = diff;
        } else if (firstLetter[0] == lastLetter[0]) {
            let colNumber;
            for (let i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }

            let diff;
            let value_1 = 0;
            for (let j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    let cellsVal2 = tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value;
                    if (cellsVal2 == "" || !cellsVal2.match(/^[0-9]+$/)) {
                        cellsVal2 = 0;
                    }
                    value_1 = parseFloat(cellsVal2);
                    let val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                    if (j > parseInt(rowNumber1)) {
                        if (val2 == "" || !val2.match(/^[0-9]+$/)) {
                            val2 = 0;

                        }
                        diff -= parseFloat(val2);
                        value_1 = diff;
                    }
                    diff = value_1;
                }
            }
            document.getElementById(id).querySelector('input').value = diff;
        }
    }
}
//Calculates the Multiplication
var findMul = (id, x, y) => {
    if (x && y) {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let firstNumber;
        let lastNumber;
        let fnumber = document.getElementById(x).parentNode.id.split("_");
        let lnumber = document.getElementById(y).parentNode.id.split("_");
        let firstLetter = document.getElementById(x).id;
        let lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        let rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        rowNumber2 = match2[0];
        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (let i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            let total;
            let value_1 = 0;
            for (let i = firstNumber; i <= lastNumber; i++) {
                let cellsVal1 = cellsarea[firstNumber].querySelector('input').value;
                if (cellsVal1 == "" || !cellsVal1.match(/^[0-9]+$/)) {
                    cellsVal1 = 0;
                }
                value_1 = parseFloat(cellsVal1);
                if (i > firstNumber) {
                    let val1 = cellsarea[i].querySelector('input').value;
                    if (val1 == "" || !val1.match(/^[0-9]+$/)) {
                        val1 = 0;
                    }
                    total *= parseFloat(val1);
                    value_1 = total;
                }
                total = value_1;
            }
            document.getElementById(id).querySelector('input').value = total;
        } else if (firstLetter[0] == lastLetter[0]) {
            let colNumber;
            for (let i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }

            let total;
            let value_1 = 0;
            for (let j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                let cellsVal2 = tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value;
                if (cellsVal2 == "" || !cellsVal2.match(/^[0-9]+$/)) {
                    cellsVal2 = 0;
                }
                if (colNumber > 0) {
                    value_1 = parseFloat(cellsVal2);
                    let val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                    if (val2 == "" || !val2.match(/^[0-9]+$/)) {
                        val2 = 0;
                    }
                    if (j > parseInt(rowNumber1)) {

                        total *= parseFloat(val2);
                        value_1 = total;
                    }
                    total = value_1;
                }
            }
            document.getElementById(id).querySelector('input').value = total;
        }
    }
}
//Calculates the Division
var findDiv = (id, x, y) => {
    if (x && y) {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let firstNumber;
        let lastNumber;
        let fnumber = document.getElementById(x).parentNode.id.split("_");
        let lnumber = document.getElementById(y).parentNode.id.split("_");
        let firstLetter = document.getElementById(x).id;
        let lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        let rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        rowNumber2 = match2[0];
        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (let i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            let total = 0;
            let value_1 = 0;

            for (let i = firstNumber; i <= lastNumber; i++) {
                let cellsVal1 = cellsarea[firstNumber].querySelector('input').value;
                if (cellsVal1 == "" || !cellsVal1.match(/^[0-9]+$/)) {
                    cellsVal1 = 0;
                }
                value_1 = parseFloat(cellsVal1);
                if (i > firstNumber) {
                    let val1 = cellsarea[i].querySelector('input').value;
                    if (val1 == "" || !val1.match(/^[0-9]+$/)) {
                        val1 = 0;
                    }
                    total /= parseFloat(val1);
                    value_1 = total;
                }
                total = value_1;
                if(isNaN(total)) {
                    total = 0;
                }
            }
            document.getElementById(id).querySelector('input').value = total;
        } else if (firstLetter[0] == lastLetter[0]) {
            let colNumber;
            for (let i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }

            let total = 0;
            let value_1 = 0;
            for (let j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    let cellsVal2 = tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value;
                    if (cellsVal2 == "" || !cellsVal2.match(/^[0-9]+$/)) {
                        cellsVal2 = 0;
                    }
                    value_1 = parseFloat(cellsVal2);
                    if (j > parseInt(rowNumber1)) {
                        let val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                        if (val2 == "" || !val2.match(/^[0-9]+$/)) {
                            val2 = 0;
                        }
                        total /= parseFloat(val2);
                        value_1 = total;
                    }
                    total = value_1;
                }
                if(isNaN(total)) {
                    total = 0;
                }
            }
            document.getElementById(id).querySelector('input').value = total;
        }
    }
}
//Calculates the Modulus
var findMod = (id, x, y) => {
    if (x && y) {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let firstNumber;
        let lastNumber;
        let fnumber = document.getElementById(x).parentNode.id.split("_");
        let lnumber = document.getElementById(y).parentNode.id.split("_");
        let firstLetter = document.getElementById(x).id;
        let lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        let rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        rowNumber2 = match2[0];
        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (let i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            let total = 0;
            let value_1 = 0;
            for (let i = firstNumber; i <= lastNumber; i++) {
                let cellsVal1 = cellsarea[firstNumber].querySelector('input').value;
                if (cellsVal1 == "" || !cellsVal1.match(/^[0-9]+$/)) {
                    cellsVal1 = 0;
                }
                value_1 = parseFloat(cellsVal1);
                if (i > firstNumber) {
                    let val1 = cellsarea[i].querySelector('input').value;
                    if (val1 == "" || !val1.match(/^[0-9]+$/)) {
                        val1 = 0;
                    }
                    total %= parseFloat(val1);
                    value_1 = total;
                }
                total = value_1;
                if(isNaN(total)) {
                    total = 0;
                }
            }
            document.getElementById(id).querySelector('input').value = total;
        } else if (firstLetter[0] == lastLetter[0]) {
            let colNumber;
            for (let i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }

            let total = 0;
            let value_1 = 0;
            for (let j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    let cellsVal2 = tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value;
                    if (cellsVal2 == "" || !cellsVal2.match(/^[0-9]+$/)) {
                        cellsVal2 = 0;
                    }
                    value_1 = parseFloat(cellsVal2);
                    if (j > parseInt(rowNumber1)) {
                        let val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                        if (val2 == "" || !val2.match(/^[0-9]+$/)) {
                            val2 = 0;
                        }
                        total %= parseFloat(val2);
                        value_1 = total;
                    }
                    total = value_1;
                }
                if(isNaN(total)) {
                    total = 0;
                }
            }
            document.getElementById(id).querySelector('input').value = total;
        }
    }
}
//Function to Insert a Column
function insertColumn() {
    if (event.isTrusted) {
        let tablearea = document.getElementById('table');
        let tr = document.getElementsByTagName('tr');
        let length = tr.length;
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < length; i++) {
            if (i > 0) {
                let td = tr[i].insertCell();

                // td.addEventListener('mousedown', function () {
                //     if (event.isTrusted) {
                //         isMouseDown = true;
                //         td.classList.toggle("selected");
                //         isHighlighted = td.classList.contains("selected");
                //         if(td.classList.contains("formula") || td.classList.contains("highlight")) {
                //             td.classList.remove("selected");
                //         }
                //         return false;
                //     }
                // });

                // td.addEventListener('mouseover', function () {
                //     if (event.isTrusted) {
                //         if (isMouseDown) {
                //             td.classList.toggle("selected", isHighlighted);
                //         }
                //     }
                // });
        
                eventHandlersTd(td);
                let x = document.createElement("INPUT");
                x.setAttribute("type", "text");
                td.appendChild(x);
                td.setAttribute("id", str.charAt(tr[0].cells.length - 2) + i);
            } else {
                let th = document.createElement("th");
                let x = document.createTextNode(str.charAt(tr[0].cells.length - 1));
                th.appendChild(x);
                tr[i].appendChild(th);
            }
        }
    }
}
//Function to Insert Row
function insertRow() {
    if (event.isTrusted) {
        let table = document.getElementById('tableId');
        let rowCount = table.rows.length;
        let row = table.insertRow(rowCount);
        row.setAttribute("id", "tr_" + rowCount);
        for (let i = 0; i < table.rows[0].cells.length; i++) {
            createCell(row.insertCell(i), i, rowCount);
        }
    }
}
//Insert the cells
function createCell(cell, count, rowCount) {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (count > 0) {
        let x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        cell.appendChild(x);
        cell.setAttribute("id", str.charAt(count - 1) + rowCount);
    } else {
        let x = document.createTextNode(rowCount);
        cell.appendChild(x);
    }

    // cell.addEventListener('mousedown', function () {
    //     if (event.isTrusted) {
    //         isMouseDown = true;
    //         cell.classList.toggle("selected");
    //         isHighlighted = cell.classList.contains("selected");
    //         if(td.classList.contains("formula") || td.classList.contains("highlight")) {
    //             td.classList.remove("selected");
    //         }
    //         return false;
    //     }
    // });

    // cell.addEventListener('mouseover', function () {
    //     if (event.isTrusted) {
    //         if (isMouseDown) {
    //             cell.classList.toggle("selected", isHighlighted);
    //         }
    //     }
    // });

    eventHandlersTd(cell);
}
//Deletes the Row and Updates the Table with Headers and Cells Ids
function removeRow() {
    if (event.isTrusted) {
        let table = document.getElementById('tableId');
        let selectedCells = document.getElementsByClassName("highlight");
        if (selectedCells.length > 0) {
            let r = selectedCells[0].parentNode.id;
            let s = r.split("_");
            table.deleteRow(s[1]);

            let l = parseInt(s[1]);

            for (let i = l + 1; i <= table.rows.length; i++) {
                //console.log("Rows length"+ table.rows.length);
                let rw = document.getElementById("tr_" + i);
                rw.setAttribute("id", "tr_" + (i - 1));
                //for(let j = 0; j <= table.rows.length; j++){
                let cells = rw.getElementsByTagName("td");
                cells[0].innerText = i - 1;
                //defrows--;
                //console.log(cells[1].id);

                for (let j = 1; j < cells.length; j++) {
                    let ind = cells[j].id;
                    // console.log(ind);
                    let alpha = ind.split("");
                    let regex = /[+-]?\d+(?:\.\d+)?/g;
                    
                    let match = regex.exec(ind);
                   
                    let new_id = alpha[0] + (match[0] - 1);


                    cells[j].setAttribute("id", new_id);

                }
            }

            updateOperation();
        } else {
            document.getElementById("result").style.display = "block";
            document.getElementById("result").style.color = "red";
            document.getElementById("result").innerHTML = "Please select the cell first";
            setTimeout(function () {
                document.getElementById("result").style.display = "none";
            }, 3500);
        }
    }
}
//Deletes the Columns and Updates the Headers and Cell Ids
function removeCol() {
    if (event.isTrusted) {
        let table = document.getElementById('tableId');
        let selectedCells = document.getElementsByClassName("highlight");
        if (selectedCells.length > 0) {
            let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let col = selectedCells[0].id;
            let colInd = col.split("");
            let ind = str.indexOf(colInd[0]);
            let rowsDom = document.getElementsByTagName("tr");
            for (let i = 0; i < table.rows.length; i++) {
                rowsDom[i].deleteCell(ind + 1);
                if (i > 0) {
                    let colDom = rowsDom[i].getElementsByTagName("td");
                    for (let m = ind + 1; m < colDom.length; m++) {
                        let indexCol = colDom[m].id;
                        let alpha = indexCol.split("");
                        let regex = /[+-]?\d+(?:\.\d+)?/g;
                        let match = regex.exec(indexCol);
                        regex.leftIndex = 0;
                        let new_id = str[m - 1] + (match[0]);
                        colDom[m].setAttribute("id", new_id);
                    }
                }
            }
            let head = document.getElementsByTagName("th");
            for (let j = ind + 1; j < head.length; j++) {
                head[j].innerText = str[j - 1];
            }            
            updateOperation();

        } else {
            document.getElementById("result").style.display = "block";
            document.getElementById("result").style.color = "red";
            document.getElementById("result").innerHTML = "Please select the cell first";
            setTimeout(function () {
                document.getElementById("result").style.display = "none";
            }, 3500);
        }
    }
}
//Additional Sum Function Implemented
function calculateSum() {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("selected");
        let length = selectedCells.length;
        let sum = 0;
        for (let i = 0; i < length; i++) {
            sum += parseFloat(selectedCells[i].querySelector('input').value);
        }
        document.getElementById("result").innerHTML = "The calculted sum is : " + sum;
    }
}
//Additional Difference Function Implemented
function calculateDifference() {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("selected");
        let length = selectedCells.length;
        let diff;
        let value_1 = 0;
        for (let i = 0; i < length; i++) {
            value_1 = parseFloat(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                diff -= parseFloat(selectedCells[i].querySelector('input').value);
                value_1 = diff;
            }
            diff = value_1;
        }
        document.getElementById("result").innerHTML = "The calculted difference is : " + diff;
    }
}
//Additional Multiplication Function Implemented
function calculateMultiplication() {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("selected");
        let length = selectedCells.length;
        let total;
        let value_1 = 0;
        for (let i = 0; i < length; i++) {
            value_1 = parseFloat(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                total *= parseFloat(selectedCells[i].querySelector('input').value);
                value_1 = total;
            }
            total = value_1;
        }
        document.getElementById("result").innerHTML = "The calculted multiplcation is : " + total;
    }
}
//Additional Division Function Implemented
function calculateDivision() {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("selected");
        let length = selectedCells.length;
        let total;
        let value_1 = 0;
        for (let i = 0; i < length; i++) {
            value_1 = parseFloat(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                total /= parseFloat(selectedCells[i].querySelector('input').value);
                value_1 = total;
            }
            total = value_1;
        }
        document.getElementById("result").innerHTML = "The calculted division is : " + total;
    }
}
//Additional Modulus Function Implemented
function calculateModulus() {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("selected");
        let length = selectedCells.length;
        let total;
        let value_1 = 0;
        for (let i = 0; i < length; i++) {
            value_1 = parseFloat(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                total %= parseFloat(selectedCells[i].querySelector('input').value);
                value_1 = total;
            }
            total = value_1;
        }
        document.getElementById("result").innerHTML = "The calculted modulus is : " + total;
    }
}
//Export to CSV Functions
function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], {
        type: "text/csv"
    });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}
//Export CSV Main Function
function exportTableToCSV() {
    if (event.isTrusted) {
        let filename = 'spreadsheet.csv';
        let csv = [];
        let rows = document.querySelectorAll("table tr");

        for (let i = 0; i < rows.length; i++) {
            let row = [];
            if (i > 0) {
                let cols = rows[i].querySelectorAll("td");
                for (let j = 0; j <= cols.length; j++) {
                    if (j > 0) {
                        cols = rows[i].querySelectorAll("td input");
                        row.push(cols[j - 1].value);
                    } else {
                        row.push(cols[j].innerText);
                    }
                }
            } else {
                let cols = rows[i].querySelectorAll("th");
                for (let j = 0; j < cols.length; j++) {
                    row.push(cols[j].innerText);
                }
            }
            csv.push(row.join(","));
        }

        // Download CSV file
        downloadCSV(csv.join("\n"), filename);
    }
}