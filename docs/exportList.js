export function exportList(rows) {

console.log()
console.log("First row / headers" + rows[0].querySelectorAll('th')[0].innerText)
var rowlen = document.getElementsByClassName("head").length/document.querySelectorAll('table').length; //Get length of row
//copied from codepen
console.log(rowlen)
var csv = [];


var frow = []
for (var i = 0; i < rowlen; i++){
//Get content of each header, pushing into row
//console.log(rows[0].querySelectorAll('th')[i].innerText);
//Push item into first row
frow.push(  '"' +rows[0].querySelectorAll('th')[i].innerText + '"');

}
csv.push(frow.join(","));

 


for (var i = 0; i < rows.length; i++) {
  var row = [], cols = rows[i].querySelectorAll('td');
  for (var j = 0; j < cols.length; j++)
  row.push(  '"' +cols[j].innerText + '"'); // push subsequent rows


  csv.push(row.join(","));
}



//var csvContent="application/vnd.ms-excel;charset=us-ascii," + rows;
//var csvContent = rows;

// Iterate through the string and where there is a comma replace with ","



download("mydata.csv", csv.join("\n"));

// var encodedUri = encodeURI(csvContent);
// var link = document.createElement("a");
// link.setAttribute("href", encodedUri);
// link.setAttribute("download", "my_data.csv");
// document.body.appendChild(link); // Required for FF
//

}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
