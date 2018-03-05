import '../css/style.css';

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
var defrows = 8,
    defcolumns = 5;

function init() {

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

function loadTable() {
    let tablearea = document.getElementById('table');
    let table = document.createElement('table');
    table.setAttribute("id", "tableId");
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i <= defrows; i++) {
        let tr = document.createElement('tr');
        tr.setAttribute("id", "tr_" + i);
        if (i > 0) {
            for (let j = 0; j <= defcolumns; j++) {
                let td = document.createElement('td');
                // td.setAttribute("onmousedown", "mouseDown(this, event)");
                // td.setAttribute("onmouseover", "mouseOver(this)");

                td.addEventListener('mousedown', function () {
                    if (event.isTrusted) {
                        isMouseDown = true;
                        td.classList.toggle("highlight");
                        isHighlighted = td.classList.contains("highlight");
                        return false;
                    }
                });

                td.addEventListener('mouseover', function () {
                    if (event.isTrusted) {
                        if (isMouseDown) {
                            td.classList.toggle("highlight", isHighlighted);
                        }
                    }
                });

                td.addEventListener('change', function () {
                    if (event.isTrusted) {
                        if (td.querySelector('input').value.toLowerCase().startsWith("=sum")) {
                            td.dataset.formula = td.querySelector('input').value;
                            td.classList.add("formula");
                            var regExp = /\(([^)]+)\)/;
                            var matches = regExp.exec(td.querySelector('input').value);
                            if (matches) {
                                var array = matches[1].toUpperCase().split(',');
                                if (array.length == 2) {
                                    findSum(td.id, array[0], array[1]);
                                }
                            }
                        }
                        if (td.querySelector('input').value.toLowerCase().startsWith("=diff")) {
                            td.dataset.formula = td.querySelector('input').value;
                            td.classList.add("formula");
                            var regExp = /\(([^)]+)\)/;
                            var matches = regExp.exec(td.querySelector('input').value);
                            if (matches) {
                                var array = matches[1].toUpperCase().split(',');
                                if (array.length == 2) {
                                    findDiff(td.id, array[0], array[1]);
                                }
                            }
                        }
                        if (td.querySelector('input').value.toLowerCase().startsWith("=mul")) {
                            td.dataset.formula = td.querySelector('input').value;
                            td.classList.add("formula");
                            var regExp = /\(([^)]+)\)/;
                            var matches = regExp.exec(td.querySelector('input').value);
                            if (matches) {
                                var array = matches[1].toUpperCase().split(',');
                                if (array.length == 2) {
                                    findMul(td.id, array[0], array[1]);
                                }
                            }
                        }
                        if (td.querySelector('input').value.toLowerCase().startsWith("=div")) {
                            td.dataset.formula = td.querySelector('input').value;
                            td.classList.add("formula");
                            var regExp = /\(([^)]+)\)/;
                            var matches = regExp.exec(td.querySelector('input').value);
                            if (matches) {
                                var array = matches[1].toUpperCase().split(',');
                                if (array.length == 2) {
                                    findDiv(td.id, array[0], array[1]);
                                }
                            }
                        }
                        if (td.querySelector('input').value.toLowerCase().startsWith("=mod")) {
                            td.dataset.formula = td.querySelector('input').value;
                            td.classList.add("formula");
                            var regExp = /\(([^)]+)\)/;
                            var matches = regExp.exec(td.querySelector('input').value);
                            if (matches) {
                                var array = matches[1].toUpperCase().split(',');
                                if (array.length == 2) {
                                    findMod(td.id, array[0], array[1]);
                                }
                            }
                        }
                        var formulacells = document.getElementsByClassName("formula");
                        for (let i = 0; i < formulacells.length; i++) {
                            var dataId = formulacells[i].id;
                            var dataFormula = formulacells[i].dataset.formula;
                            if (dataFormula.toLowerCase().startsWith("=sum")) {
                                var regExp = /\(([^)]+)\)/;
                                var matches = regExp.exec(dataFormula);
                                if (matches) {
                                    var array = matches[1].toUpperCase().split(',');
                                    if (array.length == 2) {
                                        findSum(dataId, array[0], array[1]);
                                    }
                                }
                            }
                            if (dataFormula.toLowerCase().startsWith("=diff")) {
                                var regExp = /\(([^)]+)\)/;
                                var matches = regExp.exec(dataFormula);
                                if (matches) {
                                    var array = matches[1].toUpperCase().split(',');
                                    if (array.length == 2) {
                                        findDiff(dataId, array[0], array[1]);
                                    }
                                }
                            }
                            if (dataFormula.toLowerCase().startsWith("=mul")) {
                                var regExp = /\(([^)]+)\)/;
                                var matches = regExp.exec(dataFormula);
                                if (matches) {
                                    var array = matches[1].toUpperCase().split(',');
                                    if (array.length == 2) {
                                        findMul(dataId, array[0], array[1]);
                                    }
                                }
                            }
                            if (dataFormula.toLowerCase().startsWith("=div")) {
                                var regExp = /\(([^)]+)\)/;
                                var matches = regExp.exec(dataFormula);
                                if (matches) {
                                    var array = matches[1].toUpperCase().split(',');
                                    if (array.length == 2) {
                                        findDiv(dataId, array[0], array[1]);
                                    }
                                }
                            }
                            if (dataFormula.toLowerCase().startsWith("=mod")) {
                                var regExp = /\(([^)]+)\)/;
                                var matches = regExp.exec(dataFormula);
                                if (matches) {
                                    var array = matches[1].toUpperCase().split(',');
                                    if (array.length == 2) {
                                        findMod(dataId, array[0], array[1]);
                                    }
                                }
                            }
                        }
                    }
                });

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

// function mouseDown(elem, event) {
//     isMouseDown = true;
//     elem.classList.toggle("highlight");
//     isHighlighted = elem.classList.contains("highlight");
//     return false;
// }

// function mouseOver(elem) {
//     if (isMouseDown) {
//         elem.classList.toggle("highlight", isHighlighted);
//     }
// }

document.onmouseup = myMouseUpHandler;

function myMouseUpHandler() {
    isMouseDown = false;
}

function findSum(id, x, y) {
    if (x && y) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var firstNumber;
        var lastNumber;
        var fnumber = document.getElementById(x).parentNode.id.split("_");
        var lnumber = document.getElementById(y).parentNode.id.split("_");
        var firstLetter = document.getElementById(x).id;
        var lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        var rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        rowNumber2 = match2[0];
       
        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (var i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }

            var sum = 0;
            for (var i = firstNumber; i <= lastNumber; i++) {
                let val1 = cellsarea[i].querySelector('input').value;
                if(val1 == ""){
                    val1 = 0;
                }
                sum += parseFloat(val1);
            }
            document.getElementById(id).querySelector('input').value = sum;
        } else if (firstLetter[0] == lastLetter[0]) {
            var colNumber;
            for (var i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }
            var sum = 0;
            for (var j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    let val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                    if(val2 == ""){
                        val2 = 0;
                    }
                    sum += parseFloat(val2);
                }
            }
            document.getElementById(id).querySelector('input').value = sum;
        }
    }
}

function findDiff(id, x, y) {
    if (x && y) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var firstNumber;
        var lastNumber;
        var fnumber = document.getElementById(x).parentNode.id.split("_");
        var lnumber = document.getElementById(y).parentNode.id.split("_");
        var firstLetter = document.getElementById(x).id;
        var lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        var rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        rowNumber2 = match2[0];
        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (var i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            var diff;
            var value_1 = 0;
            for (var i = firstNumber; i <= lastNumber; i++) {
                let cellsVal1 = cellsarea[firstNumber].querySelector('input').value;
                if(cellsVal1 == ""){
                    cellsVal1 = 0;
                }
                value_1 = parseFloat(cellsVal1);
                let val1 = cellsarea[i].querySelector('input').value;
                if (i > firstNumber) {
                    if(val1 == ""){
                        val1 = 0;
                    }
                    diff -= parseFloat(val1);
                    value_1 = diff;
                }
                diff = value_1;
            }
            document.getElementById(id).querySelector('input').value = diff;
        } else if (firstLetter[0] == lastLetter[0]) {
            var colNumber;
            for (var i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }

            var diff;
            var value_1 = 0;
            for (var j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    let cellsVal2 = tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value;
                    if(cellsVal2 == ""){
                        cellsVal2 = 0;
                    }
                    value_1 = parseFloat(cellsVal2);
                    let val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                    if (j > parseInt(rowNumber1)) {
                        if(val2 == ""){
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

function findMul(id, x, y) {
    if (x && y) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var firstNumber;
        var lastNumber;
        var fnumber = document.getElementById(x).parentNode.id.split("_");
        var lnumber = document.getElementById(y).parentNode.id.split("_");
        var firstLetter = document.getElementById(x).id;
        var lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        var rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        rowNumber2 = match2[0];
        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (var i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            var total;
            var value_1 = 0;
            for (var i = firstNumber; i <= lastNumber; i++) {
                let cellsVal1 = cellsarea[firstNumber].querySelector('input').value;
                if(cellsVal1 ==  ""){
                    cellsVal1 = 0;
                }
                value_1 = parseFloat(cellsVal1);
                if (i > firstNumber) {
                    let val1 = cellsarea[i].querySelector('input').value;
                    if(val1 == ""){
                        val1 = 0;
                    }
                    total *= parseFloat(val1);
                    value_1 = total;
                }
                total = value_1;
            }
            document.getElementById(id).querySelector('input').value = total;
        } else if (firstLetter[0] == lastLetter[0]) {
            var colNumber;
            for (var i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }

            var total;
            var value_1 = 0;
            for (var j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                let cellsVal2 = tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value;
                if(cellsVal2 == ""){
                    cellsVal2 = 0;
                }
                if (colNumber > 0) {
                    value_1 = parseFloat(cellsVal2);
                    let val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                    if(val2 == ""){
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

function findDiv(id, x, y) {
    if (x && y) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var firstNumber;
        var lastNumber;
        var fnumber = document.getElementById(x).parentNode.id.split("_");
        var lnumber = document.getElementById(y).parentNode.id.split("_");
        var firstLetter = document.getElementById(x).id;
        var lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        var rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        rowNumber2 = match2[0];
        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (var i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            var total;
            var value_1 = 0;
            for (var i = firstNumber; i <= lastNumber; i++) {
                value_1 = parseFloat(cellsarea[firstNumber].querySelector('input').value);
                if (i > firstNumber) {
                    total /= parseFloat(cellsarea[i].querySelector('input').value);
                    value_1 = total;
                }
                total = value_1;
            }
            document.getElementById(id).querySelector('input').value = total;
        } else if (firstLetter[0] == lastLetter[0]) {
            var colNumber;
            for (var i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }

            var total;
            var value_1 = 0;
            for (var j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    value_1 = parseFloat(tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value);
                    if (j > parseInt(rowNumber1)) {
                        total /= parseFloat(tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value);
                        value_1 = total;
                    }
                    total = value_1;
                }
            }
            document.getElementById(id).querySelector('input').value = total;
        }
    }
}

function findMod(id, x, y) {
    if (x && y) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var firstNumber;
        var lastNumber;
        var fnumber = document.getElementById(x).parentNode.id.split("_");
        var lnumber = document.getElementById(y).parentNode.id.split("_");
        var firstLetter = document.getElementById(x).id;
        var lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        var rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        rowNumber2 = match2[0];
        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (var i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            var total;
            var value_1 = 0;
            for (var i = firstNumber; i <= lastNumber; i++) {
                value_1 = parseFloat(cellsarea[firstNumber].querySelector('input').value);
                if (i > firstNumber) {
                    total %= parseFloat(cellsarea[i].querySelector('input').value);
                    value_1 = total;
                }
                total = value_1;
            }
            document.getElementById(id).querySelector('input').value = total;
        } else if (firstLetter[0] == lastLetter[0]) {
            var colNumber;
            for (var i = 0; i < str.length; i++) {
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }

            var total;
            var value_1 = 0;
            for (var j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    value_1 = parseFloat(tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value);
                    if (j > parseInt(rowNumber1)) {
                        total %= parseFloat(tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value);
                        value_1 = total;
                    }
                    total = value_1;
                }
            }
            document.getElementById(id).querySelector('input').value = total;
        }
    }
}

function insertColumn() {
    if (event.isTrusted) {
        let tablearea = document.getElementById('table');
        let tr = document.getElementsByTagName('tr');
        let length = tr.length;
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < length; i++) {
            if (i > 0) {
                let td = tr[i].insertCell();
                // td.setAttribute("onmousedown", "mouseDown(this, event)");
                // td.setAttribute("onmouseover", "mouseOver(this)");

                td.addEventListener('mousedown', function () {
                    if (event.isTrusted) {
                        isMouseDown = true;
                        td.classList.toggle("highlight");
                        isHighlighted = td.classList.contains("highlight");
                        return false;
                    }
                });

                td.addEventListener('mouseover', function () {
                    if (event.isTrusted) {
                        if (isMouseDown) {
                            td.classList.toggle("highlight", isHighlighted);
                        }
                    }
                });

                td.addEventListener('change', function () {
                    if (event.isTrusted) {
                        if (td.querySelector('input').value.toLowerCase().startsWith("=sum")) {
                            td.dataset.formula = td.querySelector('input').value;
                            td.classList.add("formula");
                            var regExp = /\(([^)]+)\)/;
                            var matches = regExp.exec(td.querySelector('input').value);
                            if (matches) {
                                var array = matches[1].toUpperCase().split(',');
                                if (array.length == 2) {
                                    findSum(td.id, array[0], array[1]);
                                }
                            }
                        }
                        if (td.querySelector('input').value.toLowerCase().startsWith("=diff")) {
                            td.dataset.formula = td.querySelector('input').value;
                            td.classList.add("formula");
                            var regExp = /\(([^)]+)\)/;
                            var matches = regExp.exec(td.querySelector('input').value);
                            if (matches) {
                                var array = matches[1].toUpperCase().split(',');
                                if (array.length == 2) {
                                    findDiff(td.id, array[0], array[1]);
                                }
                            }
                        }
                        if (td.querySelector('input').value.toLowerCase().startsWith("=mul")) {
                            td.dataset.formula = td.querySelector('input').value;
                            td.classList.add("formula");
                            var regExp = /\(([^)]+)\)/;
                            var matches = regExp.exec(td.querySelector('input').value);
                            if (matches) {
                                var array = matches[1].toUpperCase().split(',');
                                if (array.length == 2) {
                                    findMul(td.id, array[0], array[1]);
                                }
                            }
                        }
                        if (td.querySelector('input').value.toLowerCase().startsWith("=div")) {
                            td.dataset.formula = td.querySelector('input').value;
                            td.classList.add("formula");
                            var regExp = /\(([^)]+)\)/;
                            var matches = regExp.exec(td.querySelector('input').value);
                            if (matches) {
                                var array = matches[1].toUpperCase().split(',');
                                if (array.length == 2) {
                                    findDiv(td.id, array[0], array[1]);
                                }
                            }
                        }
                        if (td.querySelector('input').value.toLowerCase().startsWith("=mod")) {
                            td.dataset.formula = td.querySelector('input').value;
                            td.classList.add("formula");
                            var regExp = /\(([^)]+)\)/;
                            var matches = regExp.exec(td.querySelector('input').value);
                            if (matches) {
                                var array = matches[1].toUpperCase().split(',');
                                if (array.length == 2) {
                                    findMod(td.id, array[0], array[1]);
                                }
                            }
                        }
                        var formulacells = document.getElementsByClassName("formula");
                        for (let i = 0; i < formulacells.length; i++) {
                            var dataId = formulacells[i].id;
                            var dataFormula = formulacells[i].dataset.formula;
                            if (dataFormula.toLowerCase().startsWith("=sum")) {
                                var regExp = /\(([^)]+)\)/;
                                var matches = regExp.exec(dataFormula);
                                if (matches) {
                                    var array = matches[1].toUpperCase().split(',');
                                    if (array.length == 2) {
                                        findSum(dataId, array[0], array[1]);
                                    }
                                }
                            }
                            if (dataFormula.toLowerCase().startsWith("=diff")) {
                                var regExp = /\(([^)]+)\)/;
                                var matches = regExp.exec(dataFormula);
                                if (matches) {
                                    var array = matches[1].toUpperCase().split(',');
                                    if (array.length == 2) {
                                        findDiff(dataId, array[0], array[1]);
                                    }
                                }
                            }
                            if (dataFormula.toLowerCase().startsWith("=mul")) {
                                var regExp = /\(([^)]+)\)/;
                                var matches = regExp.exec(dataFormula);
                                if (matches) {
                                    var array = matches[1].toUpperCase().split(',');
                                    if (array.length == 2) {
                                        findMul(dataId, array[0], array[1]);
                                    }
                                }
                            }
                            if (dataFormula.toLowerCase().startsWith("=div")) {
                                var regExp = /\(([^)]+)\)/;
                                var matches = regExp.exec(dataFormula);
                                if (matches) {
                                    var array = matches[1].toUpperCase().split(',');
                                    if (array.length == 2) {
                                        findDiv(dataId, array[0], array[1]);
                                    }
                                }
                            }
                            if (dataFormula.toLowerCase().startsWith("=mod")) {
                                var regExp = /\(([^)]+)\)/;
                                var matches = regExp.exec(dataFormula);
                                if (matches) {
                                    var array = matches[1].toUpperCase().split(',');
                                    if (array.length == 2) {
                                        findMod(dataId, array[0], array[1]);
                                    }
                                }
                            }
                        }
                    }
                });

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

function insertRow() {
    if (event.isTrusted) {
        let table = document.getElementById('tableId');
        let rowCount = table.rows.length;
        let row = table.insertRow(rowCount);
        row.setAttribute("id", "tr_" + rowCount);
        for (var i = 0; i < table.rows[0].cells.length; i++) {
            createCell(row.insertCell(i), i, rowCount);
        }
    }
}

function createCell(cell, count, rowCount) {
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (count > 0) {
        let x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        cell.appendChild(x);
        cell.setAttribute("id", str.charAt(count - 1) + rowCount);
    } else {
        let x = document.createTextNode(rowCount);
        cell.appendChild(x);
    }
    // cell.setAttribute("onmousedown", "mouseDown(this, event)");
    // cell.setAttribute("onmouseover", "mouseOver(this)");

    cell.addEventListener('mousedown', function () {
        if (event.isTrusted) {
            isMouseDown = true;
            cell.classList.toggle("highlight");
            isHighlighted = cell.classList.contains("highlight");
            return false;
        }
    });

    cell.addEventListener('mouseover', function () {
        if (event.isTrusted) {
            if (isMouseDown) {
                cell.classList.toggle("highlight", isHighlighted);
            }
        }
    });

    cell.addEventListener('change', function () {
        if (event.isTrusted) {
            if (cell.querySelector('input').value.toLowerCase().startsWith("=sum")) {
                cell.dataset.formula = cell.querySelector('input').value;
                cell.classList.add("formula");
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(cell.querySelector('input').value);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findSum(cell.id, array[0], array[1]);
                    }
                }
            }
            if (cell.querySelector('input').value.toLowerCase().startsWith("=diff")) {
                cell.dataset.formula = cell.querySelector('input').value;
                cell.classList.add("formula");
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(cell.querySelector('input').value);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findDiff(cell.id, array[0], array[1]);
                    }
                }
            }
            if (cell.querySelector('input').value.toLowerCase().startsWith("=mul")) {
                cell.dataset.formula = cell.querySelector('input').value;
                cell.classList.add("formula");
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(cell.querySelector('input').value);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findMul(cell.id, array[0], array[1]);
                    }
                }
            }
            if (cell.querySelector('input').value.toLowerCase().startsWith("=div")) {
                cell.dataset.formula = cell.querySelector('input').value;
                cell.classList.add("formula");
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(cell.querySelector('input').value);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findDiv(cell.id, array[0], array[1]);
                    }
                }
            }
            if (cell.querySelector('input').value.toLowerCase().startsWith("=mod")) {
                cell.dataset.formula = cell.querySelector('input').value;
                cell.classList.add("formula");
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(cell.querySelector('input').value);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findMod(cell.id, array[0], array[1]);
                    }
                }
            }
            var formulacells = document.getElementsByClassName("formula");
            for (let i = 0; i < formulacells.length; i++) {
                var dataId = formulacells[i].id;
                var dataFormula = formulacells[i].dataset.formula;
                if (dataFormula.toLowerCase().startsWith("=sum")) {
                    var regExp = /\(([^)]+)\)/;
                    var matches = regExp.exec(dataFormula);
                    if (matches) {
                        var array = matches[1].toUpperCase().split(',');
                        if (array.length == 2) {
                            findSum(dataId, array[0], array[1]);
                        }
                    }
                }
                if (dataFormula.toLowerCase().startsWith("=diff")) {
                    var regExp = /\(([^)]+)\)/;
                    var matches = regExp.exec(dataFormula);
                    if (matches) {
                        var array = matches[1].toUpperCase().split(',');
                        if (array.length == 2) {
                            findDiff(dataId, array[0], array[1]);
                        }
                    }
                }
                if (dataFormula.toLowerCase().startsWith("=mul")) {
                    var regExp = /\(([^)]+)\)/;
                    var matches = regExp.exec(dataFormula);
                    if (matches) {
                        var array = matches[1].toUpperCase().split(',');
                        if (array.length == 2) {
                            findMul(dataId, array[0], array[1]);
                        }
                    }
                }
                if (dataFormula.toLowerCase().startsWith("=div")) {
                    var regExp = /\(([^)]+)\)/;
                    var matches = regExp.exec(dataFormula);
                    if (matches) {
                        var array = matches[1].toUpperCase().split(',');
                        if (array.length == 2) {
                            findDiv(dataId, array[0], array[1]);
                        }
                    }
                }
                if (dataFormula.toLowerCase().startsWith("=mod")) {
                    var regExp = /\(([^)]+)\)/;
                    var matches = regExp.exec(dataFormula);
                    if (matches) {
                        var array = matches[1].toUpperCase().split(',');
                        if (array.length == 2) {
                            findMod(dataId, array[0], array[1]);
                        }
                    }
                }
            }
        }
    });
}

function removeRow() {
    if (event.isTrusted) {
        let table = document.getElementById('tableId');
        let selectedCells = document.getElementsByClassName("highlight");
        var r = selectedCells[0].parentNode.id;
        var s = r.split("_");
        table.deleteRow(s[1]);

        var l = parseInt(s[1]);

        for (let i = l + 1; i <= table.rows.length; i++) {
            //console.log("Rows length"+ table.rows.length);
            var rw = document.getElementById("tr_" + i);
            rw.setAttribute("id", "tr_" + (i - 1));
            //for(let j = 0; j <= table.rows.length; j++){
            let cells = rw.getElementsByTagName("td");
            cells[0].innerText = i - 1;
            //defrows--;
            //console.log(cells[1].id);

            for (let j = 1; j < cells.length; j++) {
                let ind = cells[j].id;
                console.log(ind);
                let alpha = ind.split("");
                let regex = /[+-]?\d+(?:\.\d+)?/g;
                let match = regex.exec(ind);
                let new_id = alpha[0] + (match[0] - 1);


                cells[j].setAttribute("id", new_id);

            }
        }
        var formulacells = document.getElementsByClassName("formula");
        for (let i = 0; i < formulacells.length; i++) {
            var dataId = formulacells[i].id;
            var dataFormula = formulacells[i].dataset.formula;
            if (dataFormula.toLowerCase().startsWith("=sum")) {
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(dataFormula);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findSum(dataId, array[0], array[1]);
                    }
                }
            }
            if (dataFormula.toLowerCase().startsWith("=diff")) {
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(dataFormula);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findDiff(dataId, array[0], array[1]);
                    }
                }
            }
            if (dataFormula.toLowerCase().startsWith("=mul")) {
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(dataFormula);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findMul(dataId, array[0], array[1]);
                    }
                }
            }
            if (dataFormula.toLowerCase().startsWith("=div")) {
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(dataFormula);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findDiv(dataId, array[0], array[1]);
                    }
                }
            }
            if (dataFormula.toLowerCase().startsWith("=mod")) {
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(dataFormula);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findMod(dataId, array[0], array[1]);
                    }
                }
            }
        }
    }
}

function removeCol() {
    if (event.isTrusted) {
        let table = document.getElementById('tableId');
        let selectedCells = document.getElementsByClassName("highlight");
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let col = selectedCells[0].id;
        let colInd = col.split("");
        let ind = str.indexOf(colInd[0]);
        let rowsDom = document.getElementsByTagName("tr");
        for (var i = 0; i < table.rows.length; i++) {
            rowsDom[i].deleteCell(ind + 1);
            if (i > 0) {
                let colDom = rowsDom[i].getElementsByTagName("td");
                for (let m = ind + 1; m < colDom.length; m++) {
                    let indexCol = colDom[m].id;
                    let alpha = indexCol.split("");
                    let regex = /[+-]?\d+(?:\.\d+)?/g;
                    let match = regex.exec(alpha);
                    let new_id = str[m - 1] + (match[0]);
                    colDom[m].setAttribute("id", new_id);
                }
            }
        }
        let head = document.getElementsByTagName("th");
        for (let j = ind + 1; j < head.length; j++) {
            head[j].innerText = str[j - 1];
        }
        var formulacells = document.getElementsByClassName("formula");
        for (let i = 0; i < formulacells.length; i++) {
            var dataId = formulacells[i].id;
            var dataFormula = formulacells[i].dataset.formula;
            if (dataFormula.toLowerCase().startsWith("=sum")) {
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(dataFormula);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findSum(dataId, array[0], array[1]);
                    }
                }
            }
            if (dataFormula.toLowerCase().startsWith("=diff")) {
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(dataFormula);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findDiff(dataId, array[0], array[1]);
                    }
                }
            }
            if (dataFormula.toLowerCase().startsWith("=mul")) {
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(dataFormula);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findMul(dataId, array[0], array[1]);
                    }
                }
            }
            if (dataFormula.toLowerCase().startsWith("=div")) {
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(dataFormula);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findDiv(dataId, array[0], array[1]);
                    }
                }
            }
            if (dataFormula.toLowerCase().startsWith("=mod")) {
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(dataFormula);
                if (matches) {
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findMod(dataId, array[0], array[1]);
                    }
                }
            }
        }
    }
}

function calculateSum() {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("highlight");
        let length = selectedCells.length;
        let sum = 0;
        for (let i = 0; i < length; i++) {
            sum += parseFloat(selectedCells[i].querySelector('input').value);
        }
        document.getElementById("result").innerHTML = "The calculted sum is : " + sum;
    }
}

function calculateDifference() {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("highlight");
        let length = selectedCells.length;
        var diff;
        var value_1 = 0;
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

function calculateMultiplication() {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("highlight");
        let length = selectedCells.length;
        var total;
        var value_1 = 0;
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

function calculateDivision() {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("highlight");
        let length = selectedCells.length;
        var total;
        var value_1 = 0;
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

function calculateModulus() {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("highlight");
        let length = selectedCells.length;
        var total;
        var value_1 = 0;
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

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

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

function exportTableToCSV() {
    if (event.isTrusted) {
        var filename = 'spreadsheet.csv';
        var csv = [];
        var rows = document.querySelectorAll("table tr");

        for (let i = 0; i < rows.length; i++) {
            var row = [];
            if (i > 0) {
                var cols = rows[i].querySelectorAll("td");
                for (let j = 0; j <= cols.length; j++) {
                    if (j > 0) {
                        cols = rows[i].querySelectorAll("td input");
                        row.push(cols[j - 1].value);
                    } else {
                        row.push(cols[j].innerText);
                    }
                }
            } else {
                var cols = rows[i].querySelectorAll("th");
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