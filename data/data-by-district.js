let fs = require('fs');
const path = require('path');

let directory = './data-by-district';

fs.readdir(directory, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }
});

function updateList(map,key,newItem) {
  let existingItems = map.get(key);
  existingItems.push(newItem);
  map.set(key,existingItems);
}

// clear all files from leaderboard/data-by-district
// read all the assembly districts from all-assembly.json
// read all the data from data/violations.json

let data = JSON.parse(fs.readFileSync('./violations-plus-viol-count.json'))
let assemblyMap = new Map();

data.forEach( (item) => {
  let foundAssemplyMap = assemblyMap.get(item.CA_STATE_ASSEMBLY_DISTRICT)
  if(typeof(foundAssemplyMap) == 'undefined') {

    assemblyMap.set(item.CA_STATE_ASSEMBLY_DISTRICT,[item]);

  } else {
/*
    // only add to the total if this is a unique system in that district

    let currentDist = foundDistMap;
    if(currentDist.systems.includes(item.WATER_SYSTEM_NUMBER)) {
      // already counted
    } else {
      currentDist.systems.push(item.WATER_SYSTEM_NUMBER)
      let newAffected = parseInt(currentDist.population) + parseInt(item.POPULATION);
      currentDist.population = newAffected;
    }
    distMap.set(item.CA_STATE_ASSEMBLY_DISTRICT,currentDist);
*/

    updateList(assemblyMap,item.CA_STATE_ASSEMBLY_DISTRICT,item);




  }
})

assemblyMap.forEach( (item, key) => {
  fs.writeFileSync('./data-by-district/lower-'+key+'.json',JSON.stringify(item),'utf8');
})