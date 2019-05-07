fetch('data/'+window.location.search.replace('?id=','')+'.json')
.then(function(response) {
  return response.json();
})
.then(function(systemData) {

  let uniqueSystemData = [];
  systemData.forEach( (item) => {
    let matchFound = false;
    uniqueSystemData.forEach( (existingItem) => {
      if(item.ANALYTE_NAME == existingItem.ANALYTE_NAME && item.VIOL_BEGIN_DATE == existingItem.VIOL_BEGIN_DATE && item.VIOL_END_DATE == existingItem.VIOL_END_DATE) {
        // skip
        matchFound = true;
      }
    })
    if(!matchFound) {
      uniqueSystemData.push(item);
    }
  })

  let output = `
  <h1>Water System:  ${systemData[0].WATER_SYSTEM_NAME}</h1>
  <h3 class="erf-align">Regulating Agency:  ${systemData[0].REGULATING_AGENCY}</h3>
  <h3 class="erf-align">Location:  ${systemData[0].CITY}, ${systemData[0].COUNTY} ${systemData[0].ZIPCODE}</h3>

  <h4 class="erf-align">Analyte History:</h4>
  <div class="violaters">
    <span class="head">Analyte</span>
    <span class="head">Violation Begin Date</span>
    <span class="head">Violation End Date</span>
    <span class="head">Exceedance Level</span>
    <span class="head">Allowed Level</span>
  ${uniqueSystemData.map((item) => {
    return `
      <span>${item.ANALYTE_NAME}</span>
      <span>${item.VIOL_BEGIN_DATE}</span>
      <span>${item.VIOL_END_DATE}</span>
      <span>${item.RESULT}</span>
      <span>${item.MCL}</span>
    `;
  }).join(' ')}
  </div>
  `;

  document.querySelector('.system-history').innerHTML = output;
})
/*
ANALYTE_NAME: "1,2,3-TRICHLOROPROPANE"
CITY: "DEL REY"
CLASSIFICATION: "COMMUNITY"
COUNTY: "FRESNO"
ENF_ACTION_ISSUE_DATE: "2018-05-18"
ENF_ACTION_NUMBER: "9511008"
ENF_ACTION_TYPE_ISSUED: "CA STATE ACTION ISSUED"
MCL: "0.005 UG/L"
POPULATION: "1500"
REGULATING_AGENCY: "DISTRICT 23 - FRESNO"
RESULT: "0.006 UG/L"
SERVICE_CONNECTIONS: "328"
VIOLATION_NUMBER: "9111005"
VIOLATION_TYPE_NAME: "STATE PRIMARY MCL VIOL - NOT CR6"
VIOL_BEGIN_DATE: "2018-04-01"
VIOL_END_DATE: "2018-06-30"
WATER_SYSTEM_NAME: "DEL REY COMMUNITY SERV DIST"
WATER_SYSTEM_NUMBER: "CA1010035"
ZIPCODE: "93616"*/