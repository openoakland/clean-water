const fs = require('fs')

let data = JSON.parse(fs.readFileSync('./map_details.json'));
let outputArr = [];

let fields = data.tblInventory_Map_Details[0];

data.tblInventory_Map_Details.forEach( (item, index) => {
  if(index > 0) {
    let obj = {};
    for(var key in fields) {
      obj[fields[key]] = item[key];
    }
    outputArr.push(obj)
  }
})

fs.writeFileSync('./violations.json',JSON.stringify(outputArr),'utf8');
