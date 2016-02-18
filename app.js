/* Parameters */

var selector = '#bar-chart';

var language = 'fi';
var titleText = {
  'fi' : "Julkaisuja",
  'en' : "Publications",
  'sv' : "Publikationer"
};

var filePath = "sampledata.tsv";
var xName = "Year";
var yName = "Publications"



/* ********** */

var margin = {top: 50, right: 20, bottom: 60, left: 60},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .29);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(6)
    .innerTickSize(-width);

var svg = d3.select(selector)
  .append("div")
  .classed("svg-container", true)
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
  .classed("svg-content-responsive", true)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("text")
  .text(titleText[language])
  .attr("x", width/2)
  .attr("y", -30)

var tooltip = svg.append("text")
    .attr("class", "tooltip")
    .style("opacity", 0);

function type(d) {
  d[xName] = +d[xName];
  d[yName] = +d[yName];
  return d;
}

var data = d3.dsv(";", "text/plain")(filePath, type, function(error, data) {
  x.domain(data.map(function(d) { return d[xName]; }));
  y.domain([0, d3.max(data, function(d) { return d[yName]; })]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  var barGroups = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "bar");

  var rects = barGroups.append("rect")
    .attr("x", function(d) { return x(d[xName]); })
    .attr("width", x.rangeBand())
    .attr("y", height)
    .attr("height", 0)
    .transition()
    .duration(function(d,i) {
      return 500 + i*100;
    })
    .attr("y", function(d) { return y(d[yName]); })
    .attr("height", function (d) {
        return height - y(d[yName]);
      });

  barGroups.on("mouseover", function(d) {
    tooltip.text(d[yName])
      .attr("x", (x(d[xName]) + x.rangeBand()/2) + 'px')
      .attr("y", -10 + y(d[yName]) + 'px')
      .transition()
      .duration(300)
      .style("opacity", .9)
  })
  .on("mouseout", function(d) {
    tooltip.transition()
      .duration(600)
      .style("opacity", 0);
  });
});
