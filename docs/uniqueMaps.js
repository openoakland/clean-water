import { updateList } from  './updatelist.js';

export function uniqueMaps(json) {
  let mapsObj = {};

  mapsObj.systemMap = new Map();
  mapsObj.zipMap = new Map();
  mapsObj.countyMap = new Map();
  mapsObj.cityMap = new Map();
  mapsObj.analyteMap = new Map();
  mapsObj.senatorMap = new Map();
  mapsObj.assemblyMap = new Map();

  json.forEach( (v) => {
    let foundSystemMap = mapsObj.systemMap.get(v.WATER_SYSTEM_NUMBER)
    if(typeof(foundSystemMap) == 'undefined') {
      mapsObj.systemMap.set(v.WATER_SYSTEM_NUMBER,[v]);
    } else {
      updateList(mapsObj.systemMap,v.WATER_SYSTEM_NUMBER,v);
    }

    let foundZipMap = mapsObj.zipMap.get(v.ZIPCODE)
    if(typeof(foundZipMap) == 'undefined') {
      mapsObj.zipMap.set(v.ZIPCODE,[v]);
    } else {
      updateList(mapsObj.zipMap,v.ZIPCODE,v);
    }

    let foundCountyMap = mapsObj.countyMap.get(v.COUNTY)
    if(typeof(foundCountyMap) == 'undefined') {
      mapsObj.countyMap.set(v.COUNTY,[v]);
    } else {
      updateList(mapsObj.countyMap,v.COUNTY,v);
    }

    let foundCityMap = mapsObj.cityMap.get(v.CITY)
    if(typeof(foundCityMap) == 'undefined') {
      mapsObj.cityMap.set(v.CITY,[v]);
    } else {
      updateList(mapsObj.cityMap,v.CITY,v);
    }

    let foundAnalyteMap = mapsObj.analyteMap.get(v.ANALYTE_NAME)
    if(typeof(foundAnalyteMap) == 'undefined') {
      mapsObj.analyteMap.set(v.ANALYTE_NAME,[v]);
    } else {
      updateList(mapsObj.analyteMap,v.ANALYTE_NAME,v);
    }

    let foundSenatorMap = mapsObj.senatorMap.get(v.CA_STATE_SENATE_DISTRICT)
    if(typeof(foundSenatorMap) == 'undefined') {
      mapsObj.senatorMap.set(v.CA_STATE_SENATE_DISTRICT,[v]);
    } else {
      updateList(mapsObj.senatorMap,v.CA_STATE_SENATE_DISTRICT,v);
    }

    let foundAssemplyMap = mapsObj.assemblyMap.get(v.CA_STATE_ASSEMBLY_DISTRICT)
    if(typeof(foundAssemplyMap) == 'undefined') {
      mapsObj.assemblyMap.set(v.CA_STATE_ASSEMBLY_DISTRICT,[v]);
    } else {
      updateList(mapsObj.assemblyMap,v.CA_STATE_ASSEMBLY_DISTRICT,v);
    }
  })

  /*let popObjs = [];
  mapsObj.assemblyMap.forEach( (item) => {
    let popCount = leaderboard(item);
    let districtInfo = item[0].CA_STATE_ASSEMBLY_DISTRICT;
    let popObj = {}
    popObj.population = popCount;
    popObj.dist = districtInfo;
    popObj.type = 'Assembly';
    console.log(`CA Assembly District ${districtInfo} has a population of ${popCount}`)
    popObjs.push(popObj)
  })
  console.log(JSON.stringify(popObjs))*/

  return mapsObj;
}


function leaderboard(json) {
  let population = 0;

  let systemMap = new Map();

  json.forEach( (v) => {
    let foundSystemMap = systemMap.get(v.WATER_SYSTEM_NUMBER)
    if(typeof(foundSystemMap) == 'undefined') {
      systemMap.set(v.WATER_SYSTEM_NUMBER,[v]);
    } else {
      updateList(systemMap,v.WATER_SYSTEM_NUMBER,v);
    }
  })
  systemMap.forEach( (item) => {
    population += parseInt(item[0].POPULATION);
  })
  return population;
}