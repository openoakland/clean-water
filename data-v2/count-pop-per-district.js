let fs = require('fs');

// read from latest violations file
let json = JSON.parse(fs.readFileSync('./violations-current-plus-legislators.json','utf8'));

let violMap = new Map();


let distMap = new Map();

json.forEach( (item) => {

  let foundDistMap = distMap.get(item.CA_STATE_ASSEMBLY_DISTRICT)
  if(typeof(foundDistMap) == 'undefined') {
    distMap.set(item.CA_STATE_ASSEMBLY_DISTRICT,parseInt(item.POPULATION));
  } else {
    let currentAffected = foundDistMap;
    let newAffected = parseInt(currentAffected) + parseInt(item.POPULATION);
    distMap.set(item.CA_STATE_ASSEMBLY_DISTRICT,newAffected);
    
  }

})

let outputArray = [];
// [{"population":34019,"dist":"5","type":"Assembly"}
distMap.forEach( (value, key) => {
  let obj = {};
  obj.population = value;
  obj.dist = key;
  obj.type = 'Assembly';
  outputArray.push(obj)
})

console.log(outputArray);

fs.writeFileSync('../docs/leaderboard-ca-state-assembly.json',JSON.stringify(outputArray),'utf8')
//console.log(distMap)