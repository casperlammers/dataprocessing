// Set variabales to load in data from the jsonfile
var jsonfile = "cleaned_file.json";
var countries = [];
var output = [];

// import the wanted data (Countries/output) from the json
d3.json(jsonfile).then(function(data) {
  data.forEach(function(columnselector) {
      countries.push(columnselector[0]);
      output.push(columnselector[3]);

  });

  // Assign values to variables to prevent the use of magic numbers
  var widthSvg = 1000;
  var heightSvg = 800;
  var graphwidth = 850;
  var graphheight = 440;
  var valuedomain = 50000;
  var addSpaceXaxis = 50;
  var widthcorrection = 10;

  // Create SVG element
  var svg = d3.select("body")
            .append("svg")
            .attr("width", widthSvg)
            .attr("height", heightSvg);

  // Create scale for both axis
  var scaleYaxis = d3.scaleLinear()
                  .domain([0, valuedomain])
                  .range([graphheight, 0]);
  var scaleXaxis = d3.scaleBand()
                  .domain(countries.map(function(findcountries){ return findcountries}))
                  .range([0, graphwidth]);

  // Create variables for both axis
  var yAxis = d3.axisLeft(scaleYaxis)
  var xAxis = d3.axisBottom(scaleXaxis);

  // create hover element for mousehover
  var hover = d3.select("body").append("div")
                .attr("class", "mousehover");

  // Draw bars
  svg.selectAll("rect")
     .data(output)
     .enter()
     .append("rect")
     .attr("x", function(a, b) {
          return addSpaceXaxis + (b * (graphwidth / output.length));
      })
     .attr("y", function(c) {
          return  scaleYaxis(c) + widthcorrection;
      })
     .attr("width", graphwidth / output.length - widthcorrection)
     .attr("height", function(d) {
          return graphheight - scaleYaxis(d);
      })
     .attr("class", "bars")

     // add fancy hover function to barchart by http://bl.ocks.org/Caged/6476579
     .on("mousemove", function(output, index){
        hover.style("left", d3.event.pageX - addSpaceXaxis + "px")
            .style("top", d3.event.pageY - addSpaceXaxis + "px")
            .style("display", "inline-block")
            .html(countries[index]+ ': ' +  output);
      })
     .on("mouseout", function(e){ hover.style("display", "none");});


  // add y axis to the chart
   svg.append("g")
      .call(yAxis)
      .attr("class", "yaxis")
      .attr("transform", "translate(50, 10)");

   // add x axis to the chart
   svg.append("g")
      .call(xAxis)
      .attr("class", "xaxis")
      .attr("transform", "translate(50, 450)");

  // add description line to left axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 65)
      .style("text-anchor", "end")
      .attr("font-family", "monospace")
      .text("Energyuse in KTOE");

});
