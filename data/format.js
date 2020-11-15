const fs = require('fs')

let data = JSON.parse(fs.readFileSync('./violations-unformatted.json'));
let outputArr = [];

function getRowsOnFirstSheet(xls) {
  for (const x in xls) {
    return xls[x];
  }
}

let rows = getRowsOnFirstSheet(data);
let fields = rows[0];

rows.forEach( (item, index) => {
  if(index > 0) {
    let obj = {};
    for(var key in fields) {
      obj[fields[key]] = item[key];
    }
    outputArr.push(obj)
  }
})

fs.writeFileSync('./violations.json',JSON.stringify(outputArr),'utf8');
