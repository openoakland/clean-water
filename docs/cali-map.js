export function cali(selectedDistrict) {
  fetch('leaderboard-ca-state-assembly.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(affectedPeopleData) {

    let affectedRanges = [0, 1, 1000, 5000, 10000, 20000];

    //counties: const caliData = "data/cb_2014_us_county_5m.json";
    const caliData = '/CA_Assembly_Dist_2011.json';
      d3.json(caliData, drawMap)
    const californiaSVG = d3.select(".cali-map-container svg")
    const caliProjection = d3.geoAlbers().scale(2000).translate([800, 230])
    const path = d3.geoPath().projection(caliProjection)
    let colorVals = [100000, 2000000, 30000000, 40000000, 500000000, 600000000];
    var counties = d3.map();
    var colorScale = d3.scaleThreshold()
      .domain([100000, 2000000, 30000000, 40000000, 500000000, 600000000])
      .range(d3.schemeBlues[7]);

    function drawMap(err, world) {
      var features = world.features
      if (err) throw err
      californiaSVG.append("g")
        .selectAll("path")
        .data(features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", function(d){
          let dist = d.properties.DISTRICT;
          if (selectedDistrict != null && dist != selectedDistrict) {
            return;
          }
          let affPop = 0;
          // get the affected pop number
          affectedPeopleData.forEach( (aff) => {
            if(aff.dist === dist) {
              affPop = aff.population;
            }
          })
          let affIndex = 0;
          affectedRanges.forEach( (thresh, index) => {
            if(affPop > thresh) {
              affIndex = index;
            }
          })
          // console.log(affIndex);
          // compare to affectedRanges to get index on colorVals
          return colorScale( colorVals[affIndex] )
      });
    }
  })
}
