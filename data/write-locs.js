const fs = require('fs');

let locs = JSON.parse(fs.readFileSync('./locations.json','utf8'));

locs.features.forEach( (item) => {
  // console.log(item.properties.WATER_SYST);
  fs.writeFileSync('../docs/data/loc-'+item.properties.WATER_SYST+'.json',JSON.stringify(item),'utf8');
})
