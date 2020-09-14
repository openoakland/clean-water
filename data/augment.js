// read all the files in docs/data
const { readDirDeep, readDirDeepSync } = require('read-dir-deep');
const fs = require('fs');
const fetch = require('node-fetch');
let count = 0;

let legislators = new Map();
let fails = 0;

async function readFiles(dir) {
  const files = await readDirDeep(dir);
  for(let i = 0;i<files.length;i++) {
    let file = files[i];
    if(file.indexOf('.json') > -1) {
      count++;
      console.log(file)
      let data = JSON.parse(fs.readFileSync('./data-by-district/'+file,'utf8'))
      let outputData = [];
      data.forEach( (item) => {
        if(item) {
          let outputItem = {
            "type": "Feature"
          }
          let waterSystemNumber = item.WATER_SYSTEM_NUMBER;
          if(!waterSystemNumber && item.properties) {
            waterSystemNumber = item.properties.WATER_SYSTEM_NUMBER;
          }
          if(waterSystemNumber && fs.existsSync('../docs/data/loc-'+waterSystemNumber+'.json')) {
            let locData = JSON.parse(fs.readFileSync('../docs/data/loc-'+waterSystemNumber+'.json'))
            outputItem.properties = item;
            outputItem.geometry = locData.geometry;
            outputData.push(outputItem)  
          } else {
            fails++;
            console.log('COULD NOT FIND')
            console.log(item)
            console.log('../docs/data/loc-'+waterSystemNumber+'.json')
          }
        }
      })
      fs.writeFileSync('./data-by-district/augmented-'+file,JSON.stringify(outputData),'utf8')
    }
  }
  console.log('total files; '+count)
  console.log('fails: '+fails)
}
readFiles('./data-by-district');