const fs = require('fs')

let data = JSON.parse(fs.readFileSync('./map_details.json'));
let details = JSON.parse(fs.readFileSync('./map_summary.json'));
let outputArr = [];

let fields = data.tblInventory_Map_Details[0];

data.tblInventory_Map_Details.forEach( (item, index) => {
  if(index > 0) {
    let obj = {};
    for(var key in fields) {
      obj[fields[key]] = item[key];
    }
    details.tblInventory_Map_Summary.forEach( (detail, index) => {
      if(detail.A == item.A) {
        obj.WATER_SYSTEM_NAME = detail.B;
        obj.REGULATING_AGENCY = detail.C;
        obj.COUNTY = detail.D;
        obj.POPULATION = detail.E;
        obj.CITY = detail.H;
        obj.ZIPCODE = detail.I;
      }
    });
    outputArr.push(obj)
  }
})

fs.writeFileSync('./violations.json',JSON.stringify(outputArr),'utf8');
