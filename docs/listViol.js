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
    <th class="head">Name</th>
    <th class="head">ID</th>
    <th class="head">City</th>
    <th class="head">County</th>
    <th class="head">Zip</th>
      <th class="head">Population</th>
      <th class="head"># Past violations</th>
    ${Array.from(systemMap).map((item) => {
      return `
        <tr><a class="view-system" href="system.html?id=${item[1][0].WATER_SYSTEM_NUMBER}">${item[1][0].WATER_SYSTEM_NAME}</a></tr>
        <tr>${item[1][0].WATER_SYSTEM_NUMBER}</tr>
        <tr>${item[1][0].CITY}</tr>
        <tr>${item[1][0].COUNTY}</tr>
        <tr>${item[1][0].ZIPCODE}</tr>
        <tr>${parseInt(item[1][0].POPULATION).toLocaleString()}</tr>
        <tr>${item[1][0].VIOLATION_HISTORY_TOTAL}</tr>
      `;
    }).join(' ')}
    </table>
  `
}
