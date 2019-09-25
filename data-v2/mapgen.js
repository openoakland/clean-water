let fs = require('fs');

let uvMap = new Map();
let actionTypes = new Map();
let uvTallies = new Map();

let all = JSON.parse(fs.readFileSync('./violations-all.json','utf8'))
console.log(all.length)
// console.log(all[0])
all.forEach( (item, index) => {
  let key = item.WATER_SYSTEM_NUMBER+'-'+item.ANALYTE_NAME;
  // let key = item.VIOLATION_NUMBER; strangely violation numbers span water systems, see 1600051
  let existingItem = uvMap.get(key);
  if(existingItem) {
    existingItem.push(item);
    uvMap.set(key,existingItem);
  } else {
    uvMap.set(key,[item]);
  }
  actionTypes.set(item.ENF_ACTION_TYPE_ISSUED,item.ENF_ACTION_TYPE_ISSUED);
})

console.log(uvMap.size)
uvMap.forEach( (item, key) => {
  uvTallies.set(key,0);
})

let startDate = new Date('2012-01-01T08:00:00.000Z');

while(startDate < new Date()) {
  let filename = startDate.getFullYear().toString() + '-' + (startDate.getMonth() + 1).toString();
  let violationListThisMonth = evaluateEverything(startDate);
  let talliedViolations = [];

  uvTallies.forEach( (tally, key) => {
    let matchFound = false;
    violationListThisMonth.forEach( (v) => {
      let currentKey = v.WATER_SYSTEM_NUMBER+'-'+v.ANALYTE_NAME;
      if(currentKey == key) {
        matchFound = true;
        v.dirtyMonths = uvTallies.get(key) + 1;
        talliedViolations.push(v);
      }
    })
    if(matchFound) {
      let existingTally = uvTallies.get(key);
      uvTallies.set(key,existingTally + 1);
    } else {
      uvTallies.set(key,0)
    }
  })
  fs.writeFileSync('./map-files/'+filename+'.json',JSON.stringify(talliedViolations),'utf8');
  startDate.setMonth(startDate.getMonth()+1);
}

// latest date before today (was an end date) 2019-06-30T07:00:00.000Z

function evaluateEverything(currentDate) {
  let matchingSystemsPlusAnalytes = [];
  uvMap.forEach( (item) => {
    // console.log(item[0].WATER_SYSTEM_NUMBER+'-'+item[0].ANALYTE_NAME)
    let match = false;
    for(let i = 0;i<item.length;i++) {
      let v = item[i];
      let thisBegin = new Date(v.VIOL_BEGIN_DATE);
      if(thisBegin <= currentDate) {
        if(v.VIOL_END_DATE) {
          let thisEnd = new Date(v.VIOL_END_DATE);
          if(thisEnd >= currentDate) {
            match = true;
          }
        } else {
          match = true;
        }
      }
      if(match) {
        // stop loop
        // keep track of the system and analyte for this month
        matchingSystemsPlusAnalytes.push(v);
        break;
      }
    }
  })
  return matchingSystemsPlusAnalytes;
}
  /*
Do we always have both? Nope, but we always have BEGIN
  VIOL_BEGIN_DATE: '2015-07-01T07:00:00.000Z',
  VIOL_END_DATE: '2015-09-30T07:00:00.000Z',
Should be grouping by: VIOLATION_NUMBER


{
'STATE INTENTIONAL NO ACTION TAKEN',
'FORMAL ENFORCEMENT ACTION ISSUED',
'RETURN TO COMPLIANCE',
'OTHER INFORMAL ENFORCEMENT ACTION TAKEN',
'INFORMAL ENFORCEMENT ACTION ISSUED',
'FORMAL ENFORCEMENT ACTION WITH PENALTY ISSUED',
'CA STATE ACTION ISSUED',
'US EPA FEDERAL ADMINSTRATIVE ORDER ON CONSENT' 
}




Filters won't work for me because I have to tally months to show chronic violations

maybe able to create big geojson and just use mapbox setFilter to get:
> VIOL_BEGIN_DATE, v.VIOL_BEGIN_DATE
  can set multiple filters

in order to do above probably have to set missing END_DATEs to something

also have to create the full geojson

should review all violations for date overlap with same analyte
*/
