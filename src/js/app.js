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
var defrows = 8, defcolumns = 5;
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
        if(i > 0) {
            for (let j = 0; j <= defcolumns; j++) {
                let td = document.createElement('td');
                // td.setAttribute("onmousedown", "mouseDown(this, event)");
                // td.setAttribute("onmouseover", "mouseOver(this)");
                
                td.addEventListener('mousedown', function() {
                    if(event.isTrusted) {
                        isMouseDown = true;
                        td.classList.toggle("highlight");
                        isHighlighted = td.classList.contains("highlight");
                        return false;
                    }
                });

                td.addEventListener('mouseover', function() {
                    if(event.isTrusted) {
                        if (isMouseDown) {
                            td.classList.toggle("highlight", isHighlighted);
                        }
                    }
                });

                td.addEventListener('change', function() {
                    if(event.isTrusted) {
                        // console.log(td.id);
                        // console.log(td.querySelector('input').value);
                        if(td.querySelector('input').value.startsWith("=sum")) {
                            var regExp = /\(([^)]+)\)/;
                            var matches = regExp.exec(td.querySelector('input').value);
                            var array = matches[1].split(',');
                            if(array.length == 2) {
                                findSum(td.id, array[0], array[1]);
                            }
                        }
                    }
                });

                if(j > 0) {
                    let x = document.createElement("INPUT");
                    x.setAttribute("type", "text");
                    td.appendChild(x);
                    td.setAttribute("id", str.charAt(j-1) + i);
                } else {
                    let x = document.createTextNode(i);
                    td.appendChild(x);
                }
                tr.appendChild(td);
            }
        } else {            
            for (let j = 0; j <= defcolumns; j++) {
                let th = document.createElement('th');
                if(j > 0) {
                    let x = document.createTextNode(str.charAt(j-1));
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
// delCol.addEventListener('click', removeCol);

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
    if(x && y) {      
        document.getElementById(id).querySelector('input').value = parseInt(document.getElementById(x).querySelector('input').value) + parseInt(document.getElementById(y).querySelector('input').value);
    }
}

function insertColumn() {
    if(event.isTrusted) {
        let tablearea = document.getElementById('table');
        let tr = document.getElementsByTagName('tr');
        let length = tr.length;        
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < length; i++) {
            if(i > 0) {
                let td = tr[i].insertCell();
                // td.setAttribute("onmousedown", "mouseDown(this, event)");
                // td.setAttribute("onmouseover", "mouseOver(this)");

                td.addEventListener('mousedown', function() {
                    if(event.isTrusted) {
                        isMouseDown = true;
                        td.classList.toggle("highlight");
                        isHighlighted = td.classList.contains("highlight");
                        return false;
                    }
                });

                td.addEventListener('mouseover', function() {
                    if(event.isTrusted) {
                        if (isMouseDown) {
                            td.classList.toggle("highlight", isHighlighted);
                        }
                    }
                });
                let x = document.createElement("INPUT");
                x.setAttribute("type", "text");
                td.appendChild(x);
                td.setAttribute("id", str.charAt(tr[0].cells.length-2) + i);
            } else {
                let th = document.createElement("th");
                let x = document.createTextNode(str.charAt(tr[0].cells.length-1));
                th.appendChild(x);
                tr[i].appendChild(th);
            }
        }
    }
}

function insertRow() {
    if(event.isTrusted) {
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
    if(count > 0) {
        let x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        cell.appendChild(x);
        cell.setAttribute("id", str.charAt(count-1) + rowCount);
    } else {
        let x = document.createTextNode(rowCount);
        cell.appendChild(x);
    }
    // cell.setAttribute("onmousedown", "mouseDown(this, event)");
    // cell.setAttribute("onmouseover", "mouseOver(this)");

    cell.addEventListener('mousedown', function() {
        if(event.isTrusted) {
            isMouseDown = true;
            cell.classList.toggle("highlight");
            isHighlighted = cell.classList.contains("highlight");
            return false;
        }
    });

    cell.addEventListener('mouseover', function() {
        if(event.isTrusted) {
            if (isMouseDown) {
                cell.classList.toggle("highlight", isHighlighted);
            }
        }
    });
}

function removeRow() {
    if(event.isTrusted) {
        let table = document.getElementById('tableId');
        let selectedCells = document.getElementsByClassName("highlight");
        var r = selectedCells[0].parentNode.id;
        var s = r.split("_");
        table.deleteRow(s[1]);
        
    }
}

function calculateSum() {
    if(event.isTrusted) {
        let selectedCells = document.getElementsByClassName("highlight");
        let length = selectedCells.length;
        let sum = 0;
        for (let i = 0; i < length; i++) {
            sum += parseInt(selectedCells[i].querySelector('input').value);
        }
        document.getElementById("result").innerHTML = "The calculted sum is : " + sum;
    }
}

function calculateDifference() {
    if(event.isTrusted) {
        let selectedCells = document.getElementsByClassName("highlight");
        let length = selectedCells.length;
        var diff;
        var value_1 = 0;
        for (let i = 0; i < length; i++) {
            value_1 = parseInt(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                diff -= parseInt(selectedCells[i].querySelector('input').value);
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
            value_1 = parseInt(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                total *= parseInt(selectedCells[i].querySelector('input').value);
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
            value_1 = parseInt(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                total /= parseInt(selectedCells[i].querySelector('input').value);
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
            value_1 = parseInt(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                total %= parseInt(selectedCells[i].querySelector('input').value);
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
            if(i > 0) {
                var cols = rows[i].querySelectorAll("td");
                for (let j = 0; j <= cols.length; j++) {
                    if(j > 0) {
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