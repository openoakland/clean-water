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
  let systemCount = systemMap.size;
  let analyteCount = analyteMap.size;

  // console.log(systemMap)
  // console.log(analyteMap)

  return `
    <div class="numcards">
      <p class="numcard">
        <span class="bignum">${population.toLocaleString('en')}</span>
        <span>People with Unsafe Drinking Water</span>
      </p>
      <p class="numcard">
        <span class="bignum">${systemCount}</span>
        <span>Non-Compliant Water Systems</span>
      </p>
      <p class="numcard">
        <span class="bignum">${analyteCount}</span>
        <span>Analyte(s) Exceeding a Drinking Water Standard</span>
      </p>
    </div>
    <div class="chartcards">
      <style>
      /* D3 map */
      path {
        fill: lightgray;
        stroke: #000;
      }
      .graticule {
        fill: none;
        stroke: #ccc;
        stroke-width: .5px;
      }
      .foreground {
        fill: none;
        stroke: #333;
        stroke-width: 1.5px;
      }
      /* footer */
      .footnote {
        color: gray;
        margin-bottom: 200px;
        margin-top: -100px;
        margin-left: 70px;
      }
      #cali-map {
        width: 320px;
        height: 400px;
      }
      </style>
      <div>
        <div class="cali-map-container">
          <img id="cali-map" src="cali-map.png" />
        </div>
        <h3>Population affected per CA Congressional district</h3>
        <a href="/leaderboard/">see leaderboard for more info</a>
      </div>

      <style>
      .bar { fill: steelblue; }
      </style>
      <div>
        <div class="chart-container history"></div>
        <h3>Previous violations in these systems</h3>
      </div>
      <div>
        <div class="chart-container analytes"></div>
        <h3>Violations per analyte</h3>
      </div>

      </div>
  `
}
