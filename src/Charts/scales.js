import * as d3 from 'd3';

export default class Scales{
  constructor(x_domain, y_domain, chart_area, svg, current_data) {

    this.drawAxes = this.drawAxes.bind(this);
    this.x_domain = x_domain;
    this.y_domain = y_domain;

    this.xScale = d3.scaleLinear()
               .domain(this.x_domain)
               .range([0, svg.width]);

    this.yScale = d3.scaleLinear()
                 .domain(this.y_domain)
                 .range([0, svg.height]);

    this.chart = chart_area;

    // year values
    const yearRange = d3.extent(current_data, d => d.year);
    this.yearValues = d3.range(yearRange[0], yearRange[1], 10);

    this.xAxis = d3.axisTop(this.xScale).tickValues(this.yearValues).tickFormat(d3.format('d'));
    this.yAxis = d3.axisLeft(this.yScale);
  }

  drawAxes() {

    //draw the axes
    this.chart.append('g')
       .attr('class', 'x axis')
       .call(this.xAxis);

    this.chart.append('g')
       .attr('class', 'y axis')
       .call(this.yAxis);
  }

  reDrawAxes(svg){
    this.xScale = d3.scaleLinear()
               .domain(this.x_domain)
               .range([0, svg.width]);

    this.yScale = d3.scaleLinear()
                 .domain(this.y_domain)
                 .range([0, svg.height]);

    this.xAxis = d3.axisTop(this.xScale).tickValues(this.yearValues).tickFormat(d3.format('d'));
    this.yAxis = d3.axisLeft(this.yScale);

    this.drawAxes()
  }
}
