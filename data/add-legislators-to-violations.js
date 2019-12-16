const fs = require('fs')

let violations = JSON.parse(fs.readFileSync('./violations.json', 'utf8'));

console.log(violations.length)

let augmentedViolations = [];

violations.forEach( (item, index) => {
  let systemId = item.WATER_SYSTEM_NUMBER;
  if(fs.existsSync('../docs/data/leg-'+systemId+'.json')) {
    let legislatorInfo = JSON.parse(fs.readFileSync('../docs/data/leg-'+systemId+'.json', 'utf8'));
    legislatorInfo.legislators.forEach( (legi) => {
      if(legi.chamber == 'upper') {
        item['CA_STATE_SENATE_DISTRICT'] = legi.district;
      }
      if(legi.chamber == 'lower') {
        item['CA_STATE_ASSEMBLY_DISTRICT'] = legi.district;
      }
    })
    augmentedViolations.push(item);
  } else {
    console.log('wtf ../docs/data/leg-'+systemId+'.json')
  }
})

console.log(augmentedViolations.length)
fs.writeFileSync('./violations-plus-legislators.json', JSON.stringify(augmentedViolations),'utf8');
/*
{
    "REGULATING_AGENCY": "DISTRICT 10 - STOCKTON",
    "WATER_SYSTEM_NUMBER": "CA0210001",
    "WATER_SYSTEM_NAME": "LAKE ALPINE WATER COMPANY",
    "CLASSIFICATION": "COMMUNITY",
    "POPULATION": "625",
    "SERVICE_CONNECTIONS": "487",
    "COUNTY": "ALPINE",
    "CITY": "ARNOLD",
    "ZIPCODE": "95223",
    "VIOLATION_NUMBER": "1210014",
    "VIOLATION_TYPE_NAME": "MCL,  AVERAGE",
    "ANALYTE_NAME": "TOTAL HALOACETIC ACIDS (HAA5)",
    "RESULT": ".06580000 MG/L",
    "MCL": "0.060 MG/L",
    "VIOL_BEGIN_DATE": "2012-07-01T07:00:00.000Z",
    "VIOL_END_DATE": "2012-09-30T07:00:00.000Z",
    "ENF_ACTION_NUMBER": "1310029",
    "ENF_ACTION_ISSUE_DATE": "2012-10-02T07:00:00.000Z",
    "ENF_ACTION_TYPE_ISSUED": "FORMAL ENFORCEMENT ACTION ISSUED"
  }
*/