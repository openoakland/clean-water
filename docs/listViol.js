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
    <div class="violaters">      
      <span class="head">Name</span>
      <span class="head">ID</span>
      <span class="head">City</span>
      <span class="head">County</span>
      <span class="head">Zip</span>
    ${Array.from(systemMap).map((item) => {
      return `
        <span><a class="view-system" href="system.html?id=${item[1][0].WATER_SYSTEM_NUMBER}">${item[1][0].WATER_SYSTEM_NAME}</a></span>
        <span>${item[1][0].WATER_SYSTEM_NUMBER}</span>
        <span>${item[1][0].CITY}</span>
        <span>${item[1][0].COUNTY}</span>
        <span>${item[1][0].ZIPCODE}</span>
      `;
    }).join(' ')}
    </div>
  `
}