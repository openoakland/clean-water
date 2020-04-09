export function barsHistory(json, containerSelector) {
  let historyCount = new Map();

  console.log(json[1])

  json.forEach( (v) => {
    let foundHistory = historyCount.get(v.VIOLATION_HISTORY_TOTAL)
    if(typeof(foundHistory) == 'undefined') {
      historyCount.set(v.VIOLATION_HISTORY_TOTAL,1);
    } else {
      let currentCount = historyCount.get(v.VIOLATION_HISTORY_TOTAL)
      historyCount.set(v.VIOLATION_HISTORY_TOTAL,currentCount + 1);
    }
  })
  // order the map by the key (numver of violations), then graph will show distribution
  console.log(historyCount)
  let orderedHistoryCount = new Map(
    Array
      .from(historyCount)
      .sort((a, b) => {
        // a[0], b[0] is the key of the map
        return a[1] - b[1];
      })
  )
  console.log(orderedHistoryCount)

  let dataString = 'History,Count\n';
  orderedHistoryCount.forEach( (item, key) => {
    dataString += `${key},${item}\n`;
  })

  // now we can do d3 chart stuff
  let data = d3.csvParse(dataString);

  // set the dimensions and margins of the graph

  // set the ranges
  var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
  var y = d3.scaleLinear()
        .range([height, 0]);

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 180, left: 40},
  width = 450 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

  document.querySelector(containerSelector).innerHTML = '';
  let svg = d3.select(containerSelector).append("svg")
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
    d.History = d.History
  });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.History; }));
  y.domain([0, d3.max(data, function(d) { return d.Count; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.History); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.Count); })
      .attr("height", function(d) { return height - y(d.Count); });



  // add the x Axis
  // X axis: scale and draw:
  var x = d3.scaleLinear()
      .domain([0, historyCount.size])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
      
  // add the y Axis
  svg.append("g")
    .call(d3.axisLeft(y));


      // text label for the x axis
  svg.append("text")             
  .attr("transform",
        "translate(" + (width/2) + " ," + 
                       (height + margin.top + 20) + ")")
  .style("text-anchor", "middle")
  .text("Number of systems");


// text label for the y axis
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Past Violation Count");  

}