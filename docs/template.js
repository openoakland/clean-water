function updateList(map,key,newItem) {
  let existingItems = map.get(key);
  existingItems.push(newItem);
  map.set(key,existingItems);
}

export function summary(json) {
  let population = 0;

  let systemMap = new Map();
  let analyteMap = new Map();

  json.forEach( (v) => {
    let foundSystemMap = systemMap.get(v.WATER_SYSTEM_NUMBER)
    if(typeof(foundSystemMap) == 'undefined') {
      systemMap.set(v.WATER_SYSTEM_NUMBER,[v]);
    } else {
      updateList(systemMap,v.WATER_SYSTEM_NUMBER,v);
    }

    let foundAnalyteMap = analyteMap.get(v.ANALYTE_NAME)
    if(typeof(foundAnalyteMap) == 'undefined') {
      analyteMap.set(v.ANALYTE_NAME,[v]);
    } else {
      updateList(analyteMap,v.ANALYTE_NAME,v);
    }
  })
  systemMap.forEach( (item) => {
    population += parseInt(item[0].POPULATION);
  })
  let systemCount = systemMap.size;
  let analyteCount = analyteMap.size;

  return `
    Total Population: ${population}<br>
    Total Analytes: ${analyteCount}<br>
    Total Systems: ${systemCount}
  `
}