import data from '../data/pie-data.js'

// Selecting the element
const element = document.getElementById('d3-chart');

// Setting dimensions
const margin = 10,
    width = 400,
    height = 400;

// Setting the radius of the pie
const radius = Math.min(width, height) / 2 - margin;

const svg = d3.select(element)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("style", "margin-top: -32px !important")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Setting the color scale
const color = d3.scaleOrdinal()
    .domain(data)
    .range(["#43ab92", "#f75f00", "#512c62"]);

// Setting the position of each group on the pie
const pie = d3.pie()
    .value(function (d) {
        return d[1].value;
    });

const data_ready = pie(Object.entries(data));

// Building arcs
const arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

// Building the pie chart
svg.selectAll('slices')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function (d) {
        return (color(d.data[1].name))
    });

// Adding titles to pie slices
svg.selectAll('slices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function (d) {
        return d.data[1].name
    })
    .attr("transform", function (d) {
        return "translate(" + arcGenerator.centroid(d) + ")";
    })
    .style("text-anchor", "middle")
    .style("font-size", 20);
