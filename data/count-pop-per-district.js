let fs = require('fs');

// read from latest violations file
let json = JSON.parse(fs.readFileSync('./violations-plus-viol-count.json','utf8'));

let violMap = new Map();


let distMap = new Map();

json.forEach( (item) => {

  let foundDistMap = distMap.get(item.CA_STATE_ASSEMBLY_DISTRICT)
  if(typeof(foundDistMap) == 'undefined') {
    let districtIssues = {}
    districtIssues.population = parseInt(item.POPULATION);
    districtIssues.systems = [item.WATER_SYSTEM_NUMBER];
    distMap.set(item.CA_STATE_ASSEMBLY_DISTRICT,districtIssues);
  } else {

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