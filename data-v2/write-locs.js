const fs = require('fs');

let locs = JSON.parse(fs.readFileSync('./locations.json','utf8'));

locs.features.forEach( (item) => {
  fs.writeFileSync('./output/loc-'+item.properties.WATER_SYST+'.json',JSON.stringify(item),'utf8');
})
