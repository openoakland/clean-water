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
        // matchFound = true;
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
  <h2 style="text-align: center; font-weight: 500;">${parseInt(systemData[0].POPULATION).toLocaleString()} People affected</h2>
  <h3 class="erf-align">${systemData[0].CITY}, ${systemData[0].ZIPCODE}</h3>
  <h3 class="erf-align">${systemData[0].COUNTY} COUNTY</h3>
  <h3 class="erf-align">Regulating Agency:  ${systemData[0].REGULATING_AGENCY}</h3>
  <br><br>
  <h3 class="erf-align">The following table(s) show all measurements for all analytes which exceeded allowed levels</h3>
  <br><br>
  <div align="left">
  <button id="export-list">Export Displayed Data</button>
  </div>
  ${Array.from(uniqueAnalyteMap).map((analyte) => {
    return `
      <h2 class="erf-align">${analyte[0]} - ${analyte[1][0].VIOLATION_TYPE_NAME}</h2>
      <table class="violaters system-specific">
      <tr>
        <th class="head">Violation Begin Date</th>
        <th class="head">Violation End Date</th>
        <th class="head">Measured Level</th>
        <th class="head">Allowed Level</th>
        <th class="head">Action</th>
        <th class="head">Absolute Exceedance</th>
        <th class="head">% Exceedance</th>
        <th class="head" style="display:none">Regulating Agency</th>
        <th class="head" style="display:none">Water System #</th>
        <th class="head" style="display:none">Water System Name</th>
        <th class="head" style="display:none">Population</th>
        <th class="head" style="display:none">County</th>
        <th class="head" style="display:none">City</th>
        <th class="head" style="display:none">Zip</th>
        <th class="head" style="display:none">Violation #</th>
        <th class="head" style="display:none">Violation Type Name</th>
        <th class="head" style="display:none">Analyte Name</th>
        <th class="head" style="display:none">Enforcement Action #</th>
        <th class="head" style="display:none">Enforcement Action Issue Date</th>
        </tr>
        <!-- need to loop through all violations -->
        ${uniqueSystemData.map((item) => {
          if(item.ANALYTE_NAME == analyte[0]) {
            var absexc = item.RESULT.split(' ')[0] - item.MCL.split(' ')[0];
            var pctexc = absexc/item.MCL.split(' ')[0]*100;
            return `<tr>
              <td>${new Date(item.VIOL_BEGIN_DATE).toLocaleDateString("en-US")}</td>
              <td>${new Date(item.VIOL_END_DATE).toLocaleDateString("en-US")}</td>
              <td>${item.RESULT}</td>
              <td>${item.MCL}</td>
              <td>${item.ENF_ACTION_TYPE_ISSUED} ${new Date(item.ENF_ACTION_ISSUE_DATE).toLocaleDateString("en-US")}</td>
              <td>${absexc.toFixed(3) + " " + item.MCL.split(' ')[1]}</td>
              <td>${pctexc.toFixed(2)}</td>
              <td style="display:none">${item.REGULATING_AGENCY}</td>
              <td style="display:none">${item.WATER_SYSTEM_NUMBER}</td>
              <td style="display:none">${item.WATER_SYSTEM_NAME}</td>
              <td style="display:none">${item.POPULATION}</td>
              <td style="display:none">${item.COUNTY}</td>
              <td style="display:none">${item.CITY}</td>
              <td style="display:none">${item.ZIPCODE}</td>
              <td style="display:none">${item.VIOLATION_NUMBER}</td>
              <td style="display:none">${item.VIOLATION_TYPE_NAME}</td>
              <td style="display:none">${item.ANALYTE_NAME}</td>
              <td style="display:none">${item.ENF_ACTION_NUMBER}</td>
              <td style="display:none">${item.ENF_ACTION_ISSUE_DATE}</td>
              </tr>
            `;
          }
        }).join(' ')}
      </table>
    `
  }).join(' ')}
  `;

  document.querySelector('.system-history').innerHTML = output;

    document.getElementById("export-list").addEventListener("click", function() {
      exportList(document.querySelectorAll('table tr'));

  })
})
/*
{"REGULATING_AGENCY":"DISTRICT 19 - TEHACHAPI","WATER_SYSTEM_NUMBER":"CA1500459","WATER_SYSTEM_NAME":"LAKE OF THE WOODS MOBILE VILLAGE","CLASSIFICATION":"COMMUNITY","POPULATION":"82","SERVICE_CONNECTIONS":"86","COUNTY":"KERN","CITY":"LAKE OF THE WOODS","ZIPCODE":"93225","VIOLATION_NUMBER":9619006,"VIOLATION_TYPE_NAME":"MCL, SINGLE SAMPLE","ANALYTE_NAME":"NITRATE","RESULT":"12 MG/L","MCL":"10 MG/L","VIOL_BEGIN_DATE":"2016-04-01T07:00:00.000Z","VIOL_END_DATE":"2016-06-30T07:00:00.000Z","ENF_ACTION_NUMBER":719011,"ENF_ACTION_ISSUE_DATE":"2019-06-26T07:00:00.000Z","ENF_ACTION_TYPE_ISSUED":"STATE INTENTIONAL NO ACTION TAKEN"}
*/
