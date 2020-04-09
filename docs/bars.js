export function bars(json, containerSelector) {
  let analyteMap = new Map();

  json.forEach( (v) => {
    let foundAnalyteMap = analyteMap.get(v.ANALYTE_NAME)
    if(typeof(foundAnalyteMap) == 'undefined') {
      analyteMap.set(v.ANALYTE_NAME,1);
    } else {
      let currentCount = analyteMap.get(v.ANALYTE_NAME)
      analyteMap.set(v.ANALYTE_NAME,currentCount + 1);
    }
  })
  let analyteCount = analyteMap.size;

  let dataString = 'Analyte,Count\n';
  analyteMap.forEach( (item, key) => {
    dataString += `${key.replace(/,/g,'&comma;')},${item}\n`;
  })

  // now we can do d3 chart stuff
  let data = d3.csvParse(dataString);


  // set the dimensions and margins of the graph
  var width = 300,
  height = 300;

  // set the ranges
  var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
  var y = d3.scaleLinear()
        .range([height, 0]);

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 180, left: 40},
  width = 300 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

  document.querySelector(containerSelector).innerHTML = '';
  var svg = d3.select(containerSelector).append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  // set the ranges
  var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
  var y = d3.scaleLinear()
    .range([height, 0]);


  // format the data
  data.forEach(function(d) {
    d.Count = +d.Count;
    d.Analyte = d.Analyte.replace(/&comma;/g,',')
  });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.Analyte; }));
  y.domain([0, d3.max(data, function(d) { return d.Count; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Analyte); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.Count); })
      .attr("height", function(d) { return height - y(d.Count); });

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

  // add the y Axis
  svg.append("g")
    .call(d3.axisLeft(y));
}