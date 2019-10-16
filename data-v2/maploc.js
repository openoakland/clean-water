// for every file in map-files
// get the system lat lon by matching system id in locations.json
// add the lat,lon to each item
const fs = require('fs')
const { readDirDeep, readDirDeepSync } = require('read-dir-deep');

let fileDir = './map-files';
async function readFiles(dir) {
  const files = await readDirDeep(dir);
  for(let i = 0;i<files.length;i++) {
    let file = files[i];
    if(file.indexOf('json') > -1) {
      fixFile(file);
    }
  }
}
readFiles(fileDir);



let locations = JSON.parse(fs.readFileSync('./locations.json','utf8'))


function fixFile(file) {
  let systems = JSON.parse(fs.readFileSync(fileDir+'/'+file,'utf8'));
  let augmentedSystems = {
    "type": "FeatureCollection",
    "features": []
  }
  systems.forEach( (sys, index) => {
    let sysId = sys.WATER_SYSTEM_NUMBER;
    let newSys = {
      "type": "Feature"
    }
    newSys.properties = sys;
    locations.features.forEach( (feat) => {
      if(feat.properties.WATER_SYST == sysId) {
        newSys.geometry = feat.geometry;
      }
    })
    augmentedSystems.features.push(newSys);
  })

  fs.writeFileSync(fileDir+'/'+file,JSON.stringify(augmentedSystems),'utf8')
}