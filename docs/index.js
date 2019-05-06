import { summary } from './template.js';
import { selectors } from './menus.js';
import { updateList } from  './updatelist.js';

fetch('data/violations.json')
.then(function(response) {
  return response.json();
})
.then(function(myJson) {

  let systemMap = new Map();
  let zipMap = new Map();
  let countyMap = new Map();
  let cityMap = new Map();
  let analyteMap = new Map();

  myJson.forEach( (v) => {
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

    let foundAnalyteMap = analyteMap.get(v.ANALYTE_NAME)
    if(typeof(foundAnalyteMap) == 'undefined') {
      analyteMap.set(v.ANALYTE_NAME,[v]);
    } else {
      updateList(analyteMap,v.ANALYTE_NAME,v);
    }
  })
  document.querySelector('.summary').innerHTML = summary(myJson)
  document.querySelector('.selectors').innerHTML = selectors(systemMap, cityMap, countyMap, zipMap, analyteMap);

  // setup selector listeners
  let selects = document.querySelectorAll('.selectors select');
  selects.forEach( (selectInput) => {
    let summaryEl = document.querySelector('.summary');
    selectInput.addEventListener('change', function(event) {
      let mapKey = document.querySelector('select[name="'+this.name+'"]').options[document.querySelector('select[name="'+this.name+'"]').selectedIndex].value;
      if(this.name == 'system') {
        summaryEl.innerHTML = summary(systemMap.get(mapKey))
      }
      if(this.name == 'city') {
        summaryEl.innerHTML = summary(cityMap.get(mapKey))
      }
      if(this.name == 'county') {
        summaryEl.innerHTML = summary(countyMap.get(mapKey))
      }
      if(this.name == 'zip') {
        summaryEl.innerHTML = summary(zipMap.get(mapKey))
      }
      if(this.name == 'analyte') {
        summaryEl.innerHTML = summary(analyteMap.get(mapKey))
      }
    })
  })
  // when one changes we gotta send some new json to summary
});