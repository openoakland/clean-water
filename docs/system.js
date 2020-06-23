import { updateList } from  './updatelist.js';
import { exportList } from './exportList.js';

let waterSystemId = window.location.search.replace('?id=','');

fetch('data/'+waterSystemId+'.json')
.then(function(response) {
  return response.json();
})
.then(function(systemData) {
  // split these by unique analyte
  let uniqueAnalyteMap = new Map();
  systemData.forEach( (item) => {
    let foundAnalyte = uniqueAnalyteMap.get(item.ANALYTE_NAME)
    if(typeof(foundAnalyte) == 'undefined') {
      uniqueAnalyteMap.set(item.ANALYTE_NAME,[item]);
    } else {
      updateList(uniqueAnalyteMap,item.ANALYTE_NAME,item);
    }
  });

  document.querySelector('h1').innerHTML = "Water System: " + systemData[0].WATER_SYSTEM_NAME;
  document.querySelector('#population').innerHTML = parseInt(systemData[0].POPULATION).toLocaleString();
  document.querySelector('#city').innerHTML = "City of " + systemData[0].CITY;
  document.querySelector('#zipcode').innerHTML = systemData[0].ZIPCODE;
  document.querySelector('#county').innerHTML = systemData[0].COUNTY + " County";
  document.querySelector('#reg_agency').innerHTML = "Regulating Agency: "+ systemData[0].REGULATING_AGENCY;
  
  let analytes = [];

  let output = `
  ${Array.from(uniqueAnalyteMap).map((analyte) => {
    if (analyte[1].length > 0 && (analyte[1][analyte[1].length - 1].ENF_ACTION_TYPE_ISSUED) == "RETURN TO COMPLIANCE")
      return '';
    analytes.push(analyte[0]);
    return `
      <h2>${analyte[0]} - ${analyte[1][0].VIOLATION_TYPE_NAME}</h2>
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
        ${systemData.map((item) => {
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

  document.getElementById("export-list").addEventListener("click", function() {
    exportList(document.querySelectorAll('table tr'));
  })

  document.querySelector('#analytes').innerHTML = analytes.join(', ');
  document.querySelector('#tables').innerHTML = output;
})
