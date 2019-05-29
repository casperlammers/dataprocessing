// // Set variabales to load in data from the jsonfile
var jsonfile = "cleaned_file.json";
var country_total = {};
var country_per_year = {};

// PIE CHART INVOEGEN MET KLEUREN OM VERSCHILLEN PER JAAR WEER TE LATEN GEVEN BIJ HOVER

// import the wanted data (Countries/country_totalvalue) from the json
d3.json(jsonfile).then(function(data) {
  //Create counter to compute size of dataset for usage in next loop
  var key = 0, counter = 1;
  for(key in data) {
    if(data.hasOwnProperty(key)){
      counter++;
    }
  }
  // Make storagevalue to compute total value per country
  // Make storagelist to add country_totalvalue per year to list with multiple values per country
  // Store both ^ in country_per_year & country_total
  for (var i = 0; i < (counter/5) - 1; i++){
    var storagevalue = 0;
    var storagelist = {};
    var year = 2012;
    for (var j = 0; j < 5; j++){
      storagevalue += data[(i * 5) +j]["Value"]
      // storagelist.push(data[(i * 5) +j]["Value"])
      storagelist[year] = data[(i * 5) +j]["Value"]
      year += 1
    }
    country_per_year[data[i*5]["LOCATION"]] = storagelist
    country_total[data[i*5]["LOCATION"]] = storagevalue
  }

  // console.log(country_per_year)

  // Dropped USA(really big) & LUX(really small) for visualisation purposes
  delete country_total.USA
  delete country_total.LUX

  var country_totalvalue = Object.values(country_total);

  // Assign values to variables to prevent the use of magic numbers
  var widthSvg = 1000;
  var heightSvg = 800;
  var graphwidth = 850;
  var graphheight = 440;
  var valuedomain = Math.max.apply(Math, Object.values(country_total));
  var addSpaceXaxis = 50;
  var widthcorrection = 10;

  // Create SVG element
  var svg = d3.select("#barchart")
            .append("svg")
            .attr("width", widthSvg)
            .attr("height", heightSvg);

  // Create scale for both axis
  var scaleYaxis = d3.scaleLinear()
                  .domain([0, valuedomain])
                  .range([graphheight, 0]);

  var scaleXaxis = d3.scaleBand()
                  .domain(Object.keys(country_total))
                  .range([0, graphwidth]);

  // Create variables for both axis
  var yAxis = d3.axisLeft(scaleYaxis)
  var xAxis = d3.axisBottom(scaleXaxis);

  // create hover element for mousehover
  var hover = d3.select("body").append("div")
                .attr("class", "mousehover");

  // Draw bars
  svg.selectAll("rect")
     .data(country_totalvalue)
     .enter()
     .append("rect")
     .attr("x", function(a, b) {
          return addSpaceXaxis + (b * (graphwidth / country_totalvalue.length));
      })
     .attr("y", function(c) {
          return  scaleYaxis(c) + widthcorrection;
      })
     .attr("width", graphwidth / country_totalvalue.length - widthcorrection)
     .attr("height", function(d) {
          return graphheight - scaleYaxis(d);
      })
     .attr("class", "bars")

     // add fancy hover function to barchart by http://bl.ocks.org/Caged/6476579
     .on("mousemove", function(country_totalvalue){
        hover.style("left", d3.event.pageX - addSpaceXaxis + "px")
            .style("top", d3.event.pageY - addSpaceXaxis + "px")
            .style("display", "inline-block")
            .html('KTOE total: ' +  country_totalvalue);
      })

     .on("mouseout", function(e){
       hover.style("display", "none");
     })


     .on("click", function(country_totalvalue, index){
       piechart(Object.keys(country_total)[index]);
     });


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

  function piechart(country_code){
      // set the dimensions and margins of the graph
    var width = 300
        height = 300
        margin = 20

    // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#piechart")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    var data = country_per_year[country_code]
    console.log(data)
    // // set the color scale
    // var color = d3.scaleOrdinal()
    //   .domain(data)
    //   .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })
      .sort(d3.descending)

    var data_ready = pie(d3.entries(data))

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)

    var min = Math.min.apply(Math, Object.values(data))
    var max = Math.max.apply(Math, Object.values(data))
    console.log(min, max)

    var myColor = d3.scaleLinear()
      .domain(min, max)
      .range(["grey", "green"])

      svg
        .exit()
        .remove()
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(myColor(d.data.value)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)


    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function(d){ return d.data.key})
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      .style("text-anchor", "middle")
      .style("font-size", 17)

      .on("mousemove", function(data_ready, index){
         hover.style("left", d3.event.pageX - addSpaceXaxis + "px")
             .style("top", d3.event.pageY - addSpaceXaxis + "px")
             .style("display", "inline-block")
             .html(country_code +": " + data_ready.value + " (" + (Math.round(data_ready.value/country_total[country_code]*100)) + "% of total)" );
       })
      .on("mouseout", function(e){ hover.style("display", "none");});
  }
});
