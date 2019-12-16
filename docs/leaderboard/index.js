
fetch('all-assembly.json')
.then(function(response) {
  return response.json();
})
.then(function(myJson) {
  let allAssembly = myJson;

  fetch('../leaderboard-ca-state-assembly.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
  
  // let data = [{"population":34019,"dist":"5","type":"Assembly"},{"population":2244,"dist":"3","type":"Assembly"},{"population":2777,"dist":"1","type":"Assembly"},{"population":5214,"dist":"4","type":"Assembly"},{"population":66523,"dist":"31","type":"Assembly"},{"population":4420,"dist":"23","type":"Assembly"},{"population":102378,"dist":"26","type":"Assembly"},{"population":23220,"dist":"56","type":"Assembly"},{"population":42587,"dist":"34","type":"Assembly"},{"population":198973,"dist":"32","type":"Assembly"},{"population":4105,"dist":"36","type":"Assembly"},{"population":9841,"dist":"41","type":"Assembly"},{"population":83,"dist":"10","type":"Assembly"},{"population":987,"dist":"2","type":"Assembly"},{"population":115308,"dist":"21","type":"Assembly"},{"population":4007,"dist":"29","type":"Assembly"},{"population":25548,"dist":"30","type":"Assembly"},{"population":2074,"dist":"35","type":"Assembly"},{"population":3076,"dist":"71","type":"Assembly"},{"population":6704,"dist":"67","type":"Assembly"},{"population":580,"dist":"11","type":"Assembly"},{"population":1410,"dist":"9","type":"Assembly"},{"population":4925,"dist":"33","type":"Assembly"},{"population":1975,"dist":"42","type":"Assembly"},{"population":103630,"dist":"40","type":"Assembly"},{"population":5479,"dist":"52","type":"Assembly"},{"population":1180,"dist":"75","type":"Assembly"},{"population":1529,"dist":"13","type":"Assembly"},{"population":192547,"dist":"12","type":"Assembly"},{"population":668,"dist":"24","type":"Assembly"},{"population":78,"dist":"28","type":"Assembly"}]

    data.sort(function(x, y) {
      if (x.population.population < y.population.population) {
        return -1;
      }
      if (x.population.population > y.population.population) {
        return 1;
      }
      return 0;
    });

    let highestPopulation = data[data.length - 1].population.population;

    let output = '';
    data.reverse().forEach( (row) => {
      let myPercent = parseInt(Math.ceil(parseFloat(row.population.population / highestPopulation) * 100));
      if(myPercent < 10) {
        myPercent += 3;
      }
      if(myPercent > 90) {
        myPercent += -3;
      }
      allAssembly.forEach( (assem) => {
        if(assem.district == row.dist) {
          row.member = assem;
        }
      })

      output += `<div class="bar" data-district="${row.dist}" style="width: ${myPercent}vw;">
        <span class="label">
          <span class="cropper">
            <img src="${row.member.image}" />
          </span>
          <span class="member-details">
            <span class="politician">${row.member.name} ${row.type} District ${row.dist}</span><br>
            <span class="popText"><strong>${row.population.population.toLocaleString()}</strong> constituents without access to clean drinking water</span>
          </span>
      </div>`;
    })
    document.querySelector('.bars').innerHTML = output;

    document.querySelectorAll('.bar').forEach( (bar) => {
      bar.addEventListener('click', function(event) {
        fetch(`data-by-district/augmented-lower-${this.dataset.district}.json`)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          // create an overlay with map element
          let overlay = document.querySelector('at-overlay');
          buildMapOverlay(myJson, overlay);
        })
      })
    })
  })
});

function getUniqueAnalytes(data) {
  let uniqueAnalyteMap = new Map();
  data.forEach( (item) => {
    let foundAnalyteMap = uniqueAnalyteMap.get(item.properties.ANALYTE_NAME)
    if(typeof(foundAnalyteMap) == 'undefined') {
      uniqueAnalyteMap.set(item.properties.ANALYTE_NAME,item);
    }
  })
  return uniqueAnalyteMap;
}

function getFilteredJson(data, selectedAnalytes) {
  let filteredArray = [];
  data.forEach( (item) => {
    selectedAnalytes.forEach( (selectedAnalyte) => {
      if(selectedAnalyte == item.properties.ANALYTE_NAME) {
        filteredArray.push(item);
      }
    })
  })
  return filteredArray;
}

function buildMapOverlay(data, overlay) {
  let color = '#c00';
  
  let uniqueAnalytes = getUniqueAnalytes(data);
  let selectedAnalytes = [];
  overlay.html = `
    ${Array.from(uniqueAnalytes).map( (item, index) => {
      if(index == 0) {
        selectedAnalytes.push(item[0]);
        return `<button class="analyte-button active">${item[0]}</button>`;
      } else {
        return `<button class="analyte-button">${item[0]}</button>`;
      }
    }).join(' ')}
  <cfa-oak-map-columns color="${color}" center="" key="pk.eyJ1IjoiYWFyb25oYW5zIiwiYSI6ImNqNGs4cms1ZzBocXkyd3FzZGs3a3VtamYifQ.HQjFfVzwwxwCmGr2nvnvSA"></cfa-oak-map-columns>
  `
  overlay.setAttribute('display','block');
  window.scrollTo(0,0)

  let mapComponent = document.querySelector('cfa-oak-map-columns');
  // filter json by selectedAnalytes
  let filteredJson = getFilteredJson(data, selectedAnalytes);
  console.log(filteredJson)
  mapComponent.json = filteredJson;
  mapComponent.setAttribute('center',filteredJson[0].geometry.coordinates.toString());      

  document.querySelectorAll('.analyte-button').forEach( (button) => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      if(!this.classList.contains('active')) {
        this.classList.add('active')
      } else {
        this.classList.remove('active');
      }
      selectedAnalytes = [];
      document.querySelectorAll('button.analyte-button.active').forEach( (item) => {
        selectedAnalytes.push(item.textContent.trim())
      })
      filteredJson = getFilteredJson(data, selectedAnalytes);
      mapComponent.json = filteredJson;
      if(filteredJson.length > 0) {
        mapComponent.setAttribute('center',filteredJson[0].geometry.coordinates.toString());      
      }
      mapComponent.setAttribute('reset',Math.random());
    })
  })
}
