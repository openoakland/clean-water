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

// clear all files from leaderboard/data-by-district.js
// read all the assembly districts from all-assembly.json
// read all the data from data/violations.json

let data = JSON.parse(fs.readFileSync('../data/violations.json'))
let assemblyMap = new Map();

data.forEach( (item) => {
  let foundAssemplyMap = assemblyMap.get(item.CA_STATE_ASSEMBLY_DISTRICT)
  if(typeof(foundAssemplyMap) == 'undefined') {
    assemblyMap.set(item.CA_STATE_ASSEMBLY_DISTRICT,[item]);
  } else {
    updateList(assemblyMap,item.CA_STATE_ASSEMBLY_DISTRICT,item);
  }
})

assemblyMap.forEach( (item, key) => {
  fs.writeFileSync('./data-by-district/lower-'+key+'.json',JSON.stringify(item),'utf8');
})