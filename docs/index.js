import { summary } from './template.js';
import { listViol } from './listViol.js';
import { selectors } from './menus.js';
import { uniqueMaps } from './uniqueMaps.js';
import { exportList } from './exportList.js';

fetch('data/violations.json')
.then(function(response) {
  return response.json();
})
.then(function(incomingJSON) {

  let myJson = incomingJSON;
  let mapsObj = uniqueMaps(myJson);

  document.querySelector('.summary').innerHTML = summary(myJson)
  document.querySelector('.violating-systems').innerHTML = listViol(myJson)
  document.querySelector('.selectors').innerHTML = selectors(mapsObj.systemMap, mapsObj.cityMap, mapsObj.countyMap, mapsObj.zipMap, mapsObj.analyteMap);

  // setup selector listeners
  let selects = document.querySelectorAll('.selectors select');
  selects.forEach( (selectInput) => {
    let summaryEl = document.querySelector('.summary');
    let violatorsEl = document.querySelector('.violating-systems');
    selectInput.addEventListener('change', function(event) {
      let currentIndex = document.querySelector('select[name="'+this.name+'"]').selectedIndex;
      let mapKey = document.querySelector('select[name="'+this.name+'"]').options[currentIndex].value;

      if(mapKey == '') {
        // if you changed a selector back to the default value, reset summary view to full state
        document.querySelector('.summary').innerHTML = summary(myJson)
        document.querySelector('.violating-systems').innerHTML = listViol(myJson)
        document.querySelector('h1').innerHTML = 'California Drinking Water';
      } else {
        summaryEl.innerHTML = summary(mapsObj[this.name+'Map'].get(mapKey))
        violatorsEl.innerHTML = listViol(mapsObj[this.name+'Map'].get(mapKey));
        document.querySelector('h1').innerHTML = mapKey+' Drinking Water';
      }
      resetElements(this.name,currentIndex);
    })
  })

  document.getElementById("export-list").addEventListener("click", function() {
    exportList(document.querySelectorAll('.violating-systems span'), document.querySelectorAll('.violating-systems span.head').length);


  })

  });

function resetElements(currentName, currentIndex) {
  // revert everything not touched back to default
  document.querySelector('select[name="system"]').selectedIndex = 0;
  document.querySelector('select[name="city"]').selectedIndex = 0;
  document.querySelector('select[name="county"]').selectedIndex = 0;
  document.querySelector('select[name="zip"]').selectedIndex = 0;
  document.querySelector('select[name="analyte"]').selectedIndex = 0;
  document.querySelector('select[name="'+currentName+'"]').selectedIndex = currentIndex;
}
