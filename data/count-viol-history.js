let fs = require('fs');

// read from latest violations file
let json = JSON.parse(fs.readFileSync('./violations-plus-legislators.json','utf8'));

let violMap = new Map();


json.forEach( (item) => {
  let systemInfo = JSON.parse(fs.readFileSync('../docs/data/'+item.WATER_SYSTEM_NUMBER+'.json'));
  let violCount = 0;
  let analyteMap = new Map();

  systemInfo.forEach( (viol) => {
    // console.log(viol.ENF_ACTION_TYPE_ISSUED);
    violMap.set(viol.ENF_ACTION_TYPE_ISSUED,viol.ENF_ACTION_TYPE_ISSUED);

    analyteMap.set(viol.ANALYTE_NAME,viol.ANALYTE_NAME);

    if(viol.ENF_ACTION_TYPE_ISSUED != 'STATE INTENTIONAL NO ACTION TAKEN' && viol.ENF_ACTION_TYPE_ISSUED != 'RETURN TO COMPLIANCE') {
      violCount++;
    }
  })
  item.VIOLATION_HISTORY_TOTAL = violCount;
  item.ANALYTE_SET = (function() { 
    let analyteSet = [];
    analyteMap.forEach( (ana) => {
      analyteSet.push(ana);
    })
    return analyteSet
  })()
})

fs.writeFileSync('./violations-plus-viol-count.json',JSON.stringify(json),'utf8');