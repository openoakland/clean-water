const fs = require('fs')

let data = JSON.parse(fs.readFileSync('./violations-unformatted.json'));
let outputArr = [];

let fields = data.qryHR2W_WEB_DATA_ACTIVE_OOC[0];

data.qryHR2W_WEB_DATA_ACTIVE_OOC.forEach( (item, index) => {
  if(index > 0) {
    let obj = {};
    for(var key in fields) {
      obj[fields[key]] = item[key];
    }
    outputArr.push(obj)
  }
})

fs.writeFileSync('./violations.json',JSON.stringify(outputArr),'utf8');
