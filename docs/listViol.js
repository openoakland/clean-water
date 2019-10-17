import { updateList } from  './updatelist.js';

export function listViol(json) {
  let systemMap = new Map();

  json.forEach( (v) => {
    let foundSystemMap = systemMap.get(v.WATER_SYSTEM_NUMBER)
    if(typeof(foundSystemMap) == 'undefined') {
      systemMap.set(v.WATER_SYSTEM_NUMBER,[v]);
    } else {
      updateList(systemMap,v.WATER_SYSTEM_NUMBER,v);
    }
  })

  return `
  <table class="violaters">
  <tr>
    <th class="head">Name</th>
    <th class="head">ID</th>
    <th class="head">City</th>
    <th class="head">County</th>
    <th class="head">Zip</th>
    <th class="head">Population</th>
    <th class="head"># Past violations</th>
    </tr>
    ${Array.from(systemMap).map((item) => {
      return `<tr>
        <td><a class="view-system" href="system.html?id=${item[1][0].WATER_SYSTEM_NUMBER}">${item[1][0].WATER_SYSTEM_NAME}</a></td>
        <td>${item[1][0].WATER_SYSTEM_NUMBER}</td>
        <td>${item[1][0].CITY}</td>
        <td>${item[1][0].COUNTY}</td>
        <td>${item[1][0].ZIPCODE}</td>
        <td>${parseInt(item[1][0].POPULATION).toLocaleString()}</td>
        <td>${item[1][0].VIOLATION_HISTORY_TOTAL}</td>
        </tr>
      `;
    }).join(' ')}
    </table>
  `
}
