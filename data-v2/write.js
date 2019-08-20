const fs = require('fs');

function updateList(map,key,newItem) {
  let existingItems = map.get(key);
  existingItems.push(newItem);
  map.set(key,existingItems);
}

let viols = JSON.parse(fs.readFileSync('./violations.json','utf8'))

let systemMap = new Map();

viols.forEach( (v) => {
  let foundSystemMap = systemMap.get(v.WATER_SYSTEM_NUMBER)
  if(typeof(foundSystemMap) == 'undefined') {
    systemMap.set(v.WATER_SYSTEM_NUMBER,[v]);
  } else {
    updateList(systemMap,v.WATER_SYSTEM_NUMBER,v);
  }
})

systemMap.forEach( (value, key, index) => {
  fs.writeFileSync('./output/'+key+'.json',JSON.stringify(value),'utf8');
})