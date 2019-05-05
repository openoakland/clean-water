let fs = require('fs');

let violations = fs.readFileSync('./data/violations.json', 'utf8');
let jsonViol = JSON.parse(violations)

/*
let geoData = fs.readFileSync('./data/locations.json', 'utf8');
let jsonGeo = JSON.parse(geoData);
*/

function updateList(map,key,newItem) {
  let existingItems = map.get(key);
  existingItems.push(newItem);
  map.set(key,existingItems);
}

let systemMap = new Map();
let zipMap = new Map();
let countyMap = new Map();
let cityMap = new Map();

jsonViol.forEach( (v) => {
  let foundSystemMap = systemMap.get(v.WATER_SYSTEM_NUMBER)
  if(typeof(foundSystemMap) == 'undefined') {
    systemMap.set(v.WATER_SYSTEM_NUMBER,[v]);
  } else {
    updateList(systemMap,v.WATER_SYSTEM_NUMBER,v);
  }

  let foundZipMap = zipMap.get(v.ZIPCODE)
  if(typeof(foundZipMap) == 'undefined') {
    zipMap.set(v.ZIPCODE,[v]);
  } else {
    updateList(zipMap,v.ZIPCODE,v);
  }

  let foundCountyMap = countyMap.get(v.COUNTY)
  if(typeof(foundCountyMap) == 'undefined') {
    countyMap.set(v.COUNTY,[v]);
  } else {
    updateList(countyMap,v.COUNTY,v);
  }

  let foundCityMap = cityMap.get(v.CITY)
  if(typeof(foundCityMap) == 'undefined') {
    cityMap.set(v.CITY,[v]);
  } else {
    updateList(cityMap,v.CITY,v);
  }
})




/*
systemMap.forEach( (value, key, map) => {
  // check for key in 
  jsonGeo.features.forEach( (f) => {
    if(f.properties.WATER_SYST == key) {
      console.log('match')
      systemMap.set(key,'matched system');
    }
  })
});
systemMap.forEach( (value, key, map) => {
  if(systemMap.get(key) == 'unmatched water system') {
    console.log(key)
  }
});
*/


console.log(systemMap.size)
console.log(zipMap.size)
console.log(countyMap.size)
console.log(cityMap.size)
cityMap.forEach( (value, key, map) => {
  console.log(systemMap.get(key).length)
});
/*
build the initial template
  initial calculations
  create all the pulldown menus
  interacting with the pulldown menu fires a new event
  

for the totality
and for each one of those sets
  calculate my 3 numbers
    total out of compliance systems
    total of out of compliance analytes
    population affected
    list of systems in violation

  system specific page
    has some info on the problematic analyte
    list of violations for that system

*/



