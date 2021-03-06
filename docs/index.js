import { summary } from './template.js';
import { listViol } from './listViol.js';
import { selectors } from './menus.js';
import { uniqueMaps } from './uniqueMaps.js';
import { exportList } from './exportList.js';
import { bars } from './bars.js';
import { cali } from './cali-map.js';
import { barsHistory } from './viol-history.js';

let lastDistrict = 'NONE';

function updateStatistics(summary) {
  document.querySelector('#population').innerHTML = summary.population;
  document.querySelector('#non-compliant').innerHTML = summary.non_compliant;
  document.querySelector('#analyte-count').innerHTML = summary.analyte_count;
}

fetch('data/violations.json')
.then(function(response) {
  return response.json();
})
.then(function(myJson) {

  let mapsObj = uniqueMaps(myJson);

  updateStatistics(summary(myJson));
  document.querySelector('.violating-systems').innerHTML = listViol(myJson)
  document.querySelector('.selectors').innerHTML = selectors(mapsObj.systemMap, mapsObj.cityMap, mapsObj.countyMap, mapsObj.zipMap, mapsObj.analyteMap, mapsObj.senatorMap, mapsObj.assemblyMap);

  regenerateCaliMapIfNeeded();
  barsHistory(myJson, '.chart-container.history');
  bars(myJson, '.chart-container.analytes');

  // setup selector listeners
  let selects = document.querySelectorAll('.selectors select');
  selects.forEach( (selectInput) => {
    let violatorsEl = document.querySelector('.violating-systems');
    selectInput.addEventListener('change', function(event) {
      let currentIndex = document.querySelector('select[name="'+this.name+'"]').selectedIndex;
      let mapKey = document.querySelector('select[name="'+this.name+'"]').options[currentIndex].value;

      if(mapKey == '') {
        // if you changed a selector back to the default value, reset summary view to full state
        updateStatistics(summary(myJson));
        document.querySelector('.violating-systems').innerHTML = listViol(myJson)
        document.querySelector('h1').innerHTML = 'California Drinking Water Systems Out of Compliance';
        regenerateCaliMapIfNeeded();
        barsHistory(myJson, '.chart-container.history');
        bars(myJson, '.chart-container.analytes');
      } else {
        updateStatistics(summary(mapsObj[this.name+'Map'].get(mapKey)));
        violatorsEl.innerHTML = listViol(mapsObj[this.name+'Map'].get(mapKey));
        let title = '';
        switch(this.name) {
          case 'senator': 
            title = 'CA State Senate District ' + mapKey + ' Drinking Water';
            break;
          case 'assembly':
            title = 'CA State Assembly District ' + mapKey + ' Drinking Water';
            break;
          case 'city':
            title = 'City of ' + mapKey + ' Drinking Water';
            break;
          case 'county':
            title = 'County of ' + mapKey + ' Drinking Water';
            break;
          case 'zip':
            title = 'Zip code ' + mapKey + ' Drinking Water';
            break;
          case 'analyte':
            title = mapKey + ' in Drinking Water';
            break;
          default:
            title = mapKey + ' Drinking Water';
            break;
        }

        document.querySelector('h1').innerHTML = title;
        regenerateCaliMapIfNeeded(this.name == 'assembly' ? mapKey : null);

        barsHistory(mapsObj[this.name+'Map'].get(mapKey), '.chart-container.history');
        bars(mapsObj[this.name+'Map'].get(mapKey), '.chart-container.analytes');
      }
      resetElements(this.name,currentIndex);
    })
  })

  document.getElementById("export-list").addEventListener("click", function() {
    exportList(document.querySelectorAll('table tr'));


  })

  });

function resetElements(currentName, currentIndex) {
  // revert everything not touched back to default
  document.querySelector('select[name="system"]').selectedIndex = 0;
  document.querySelector('select[name="city"]').selectedIndex = 0;
  document.querySelector('select[name="county"]').selectedIndex = 0;
  document.querySelector('select[name="zip"]').selectedIndex = 0;
  document.querySelector('select[name="analyte"]').selectedIndex = 0;
  document.querySelector('select[name="senator"]').selectedIndex = 0;
  document.querySelector('select[name="assembly"]').selectedIndex = 0;
  document.querySelector('select[name="'+currentName+'"]').selectedIndex = currentIndex;
}


function regenerateCaliMapIfNeeded(selectedDistrict) {
  if (selectedDistrict != lastDistrict) {
    lastDistrict = selectedDistrict;
    document.querySelector('.cali-map-container').innerHTML = '<svg width="320" height="400"></svg>';
    cali(selectedDistrict);
  }
}
