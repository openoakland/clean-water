const fs = require('fs');

function updateList(map,key,newItem) {
  let existingItems = map.get(key);
  existingItems.push(newItem);
  map.set(key,existingItems);
}

let viols = JSON.parse(fs.readFileSync('./violations-all.json','utf8'))

let systemMap = new Map();

viols.forEach( (v) => {
  let foundSystemMap = systemMap.get(v.WATER_SYSTEM_NUMBER)
  if(typeof(foundSystemMap) == 'undefined') {
    systemMap.set(v.WATER_SYSTEM_NUMBER,[v]);
  } else {
    updateList(systemMap,v.WATER_SYSTEM_NUMBER,v);
  }
})

let systemViolMap = new Map();

systemMap.forEach( (uniqueSystem, index) => {
  // console.log(index)
  viols.forEach( (v) => {
    if(v.WATER_SYSTEM_NUMBER == index) {

      let foundSystem = systemViolMap.get(v.WATER_SYSTEM_NUMBER)
      if(typeof(foundSystem) == 'undefined') {
        systemViolMap.set(v.WATER_SYSTEM_NUMBER,[v]);
      } else {
        // here compare dates and set if date is newer
        if(foundSystem[0].VIOL_END_DATE < v.VIOL_END_DATE) {
          systemViolMap.set(v.WATER_SYSTEM_NUMBER,[v]);
        }
        if(foundSystem[0].VIOL_END_DATE == v.VIOL_END_DATE) {
          if(v.ENF_ACTION_TYPE_ISSUED == 'RETURN TO COMPLIANCE') {
            systemViolMap.set(v.WATER_SYSTEM_NUMBER,[v]);
          }
        }
      }
    }
  })
})

let violationTypes = new Map();

let violations = [];
systemViolMap.forEach( (value, key, index) => {

  let foundType = violationTypes.get(value[0].ENF_ACTION_TYPE_ISSUED)
  if(typeof(foundType) == 'undefined') {
    violationTypes.set(value[0].ENF_ACTION_TYPE_ISSUED,value[0].ENF_ACTION_TYPE_ISSUED);
  }
  if(value[0].ENF_ACTION_TYPE_ISSUED != 'RETURN TO COMPLIANCE') {
    violations.push(value[0]);
  }
})

violations.sort( (a,b) => a.WATER_SYSTEM_NUMBER > b.WATER_SYSTEM_NUMBER)

violations.forEach( (v) => {
  // console.log(v.WATER_SYSTEM_NUMBER)
})

fs.writeFileSync('./violations-current.json',JSON.stringify(violations),'utf8');


// console.log(violationTypes)
/*
FORMAL ENFORCEMENT ACTION ISSUED
RETURN TO COMPLIANCE
INFORMAL ENFORCEMENT ACTION ISSUED
OTHER INFORMAL ENFORCEMENT ACTION TAKEN
FORMAL ENFORCEMENT ACTION WITH PENALTY ISSUED
CA STATE ACTION ISSUED
US EPA FEDERAL ADMINSTRATIVE ORDER ON CONSEN
*/