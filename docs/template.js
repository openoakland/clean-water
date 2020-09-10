import { updateList } from  './updatelist.js';

export function summary(json) {
  let population = 0;

  let systemMap = new Map();
  let analyteMap = new Map();

  json.forEach( (v) => {
    systemMap.set(v.WATER_SYSTEM_NUMBER,v.POPULATION);
    /*
    let foundSystemMap = systemMap.get(v.WATER_SYSTEM_NUMBER)
    if(typeof(foundSystemMap) == 'undefined') {
    } else {
      updateList(systemMap,v.WATER_SYSTEM_NUMBER,v);
    }*/

    let foundAnalyteMap = analyteMap.get(v.ANALYTE_NAME)
    if(typeof(foundAnalyteMap) == 'undefined') {
      analyteMap.set(v.ANALYTE_NAME,1);
    } else {
      let currentCount = analyteMap.get(v.ANALYTE_NAME)
      analyteMap.set(v.ANALYTE_NAME,currentCount + 1);
    }
  })
  systemMap.forEach( (item) => {
    population += parseInt(item);
  })

  return {
    population: population.toLocaleString('en'),
    non_compliant: systemMap.size,
    analyte_count: analyteMap.size
  };
}
