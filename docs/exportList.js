export function exportList(rows) {

//data are the rows in the tables
console.log(rows[2])
console.log("Input Variable is of type:", typeof(rows))



//copied from codepen
var csv = [];

for (var i = 0; i < rows.length; i++) {
  var row = [], cols = rows[i].querySelectorAll('td');

  for (var j = 0; j < cols.length; j++)
  row.push(  '"' +cols[j].innerText + '"');


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
