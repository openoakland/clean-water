// read all the files in docs/data
const { readDirDeep, readDirDeepSync } = require('read-dir-deep');
const fs = require('fs');
const fetch = require('node-fetch');
let count = 0;

let legislators = new Map();

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
          let locData = JSON.parse(fs.readFileSync('../data/loc-'+item.WATER_SYSTEM_NUMBER+'.json'))
          outputItem.properties = item;
          outputItem.geometry = locData.geometry;
          outputData.push(outputItem)
        }
      })
      fs.writeFileSync('./data-by-district/augmented-'+file,JSON.stringify(outputData),'utf8')
    }
  }
  console.log('total files; '+count)

}
readFiles('./data-by-district');