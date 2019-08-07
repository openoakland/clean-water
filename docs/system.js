import { updateList } from  './updatelist.js';
import { exportList } from './exportList.js';

let waterSystemId = window.location.search.replace('?id=','');

fetch('data/'+waterSystemId+'.json')
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

  // split these by unique analyte
  let uniqueAnalyteMap = new Map();
  uniqueSystemData.forEach( (item) => {
    let foundAnalyte = uniqueAnalyteMap.get(item.ANALYTE_NAME)
    if(typeof(foundAnalyte) == 'undefined') {
      uniqueAnalyteMap.set(item.ANALYTE_NAME,[item]);
    } else {
      updateList(uniqueAnalyteMap,item.ANALYTE_NAME,item);
    }
  })

  let output = `
  <h1>Water System: ${systemData[0].WATER_SYSTEM_NAME}</h1>
  <h2 style="text-align: center; font-weight: 500;">${systemData[0].POPULATION} People affected</h2>
  <h3 class="erf-align">${systemData[0].CITY}, ${systemData[0].ZIPCODE}</h3>
  <h3 class="erf-align">${systemData[0].COUNTY} COUNTY</h3>
  <h3 class="erf-align">Regulating Agency:  ${systemData[0].REGULATING_AGENCY}</h3>
  <br><br>
  <h3 class="erf-align">The following table(s) show all measurements for all analytes which exceeded allowed levels</h3>
  <br><br>
  ${Array.from(uniqueAnalyteMap).map((analyte) => {
    return `
      <h2 class="erf-align">${analyte[0]}</h2>
        <div align="right">
        <button id="export-list" >Export</button>
        </div>
      <div class="violaters system-specific">
        <span class="head">Violation Begin Date</span>
        <span class="head">Violation End Date</span>
        <span class="head">Measured Level</span>
        <span class="head">Allowed Level</span>
        <span class="head">Absolute Exceedance</span>
        <span class="head">% Exceedance</span>
        ${analyte[1].map((item) => {
          var absexc = item.RESULT.split(" ")[0] - item.MCL.split(" ")[0];
          var pctexc = absexc/item.MCL.split(" ")[0]*100;
          return `
            <span>${item.VIOL_BEGIN_DATE}</span>
            <span>${item.VIOL_END_DATE}</span>
            <span>${item.RESULT}</span>
            <span>${item.MCL}</span>
            <span>${absexc.toFixed(3) + " " + item.MCL.split(" ")[1]}</span>
            <span>${pctexc.toFixed(2)}</span>
          `;
        }).join(' ')}
      </div>
    `
  }).join(' ')}
  `;

  document.querySelector('.system-history').innerHTML = output;

  document.getElementById("export-list").addEventListener("click", function() {
    exportList(document.querySelectorAll(".violaters > span"), document.querySelectorAll(".violaters > span.head").length);


  })
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
