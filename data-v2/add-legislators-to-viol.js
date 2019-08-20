const fs = require('fs')

let violations = JSON.parse(fs.readFileSync('./violations-current.json', 'utf8'));

console.log(violations.length)

let augmentedViolations = [];

violations.forEach( (item, index) => {
  let systemId = item.WATER_SYSTEM_NUMBER;
  let fileLoc = './output/leg-'+systemId+'.json';
  if(fs.existsSync(fileLoc)) {
    let legislatorInfo = JSON.parse(fs.readFileSync(fileLoc, 'utf8'));
    legislatorInfo.legislators.forEach( (legi) => {
      if(legi.chamber == 'upper') {
        item['CA_STATE_SENATE_DISTRICT'] = legi.district;
      }
      if(legi.chamber == 'lower') {
        item['CA_STATE_ASSEMBLY_DISTRICT'] = legi.district;
      }
    })
    augmentedViolations.push(item);  
  } else {
    console.log('not found: '+fileLoc)
  }
})

console.log(augmentedViolations.length)
fs.writeFileSync('./violations-current-plus-legislators.json', JSON.stringify(augmentedViolations),'utf8');