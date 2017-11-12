import React, {Component} from 'react';
import SVG_Dimensions from './svg';
import * as d3 from 'd3';
import Bar from './Bar';

// this component will manage the appearance and layout of the bar chart
// it just takes in the data and converts in to the correct bars
// based on the columns
// props: data{arr}, x{str}, y{str}
class CategoryBarChart extends Component {
  constructor(props){
    super(props);
    this.el = null;
    this.gref = null;
    this.xScale = d3.scaleLinear();
    this.yScale = d3.scaleBand();
    this.transition = d3.transition().ease(d3.easeCubicInOut);
    this.data = this.props.data.sort((a,b) => d3.descending(+a[this.props.x], +b[this.props.x]));

    this.state = {
      width: 0,
      height: 0,
      left_margin: 0
    }

  }


  componentDidMount(){

    const left_margin = 0.15;
    this.dim = new SVG_Dimensions(this.el).svg_dimensions();
    this.xScale.range([0, this.dim.w*(1-left_margin)]);
    this.yScale.range([0, this.dim.h]).paddingInner(0.1).paddingOuter(0.1);
    this.setState({
      width: this.dim.width,
      height: this.dim.height,
      left_margin: this.dim.width * left_margin
    })
    this.d3scales(this.props);
  }

  componentWillReceiveProps(newProps) {
    // this.data = newProps.data.sort((a,b) => d3.descending(+a[newProps.x], +b[newProps.x]));

    const sorted_data = newProps.data.sort((a,b) => +b[newProps.x] - a[newProps.x]);
    if (newProps.x === this.props.x){
      console.log('SORTING?');
      this.data = sorted_data;
      this.d3scales(newProps);
      this.sortBars(newProps);
    } else {this.d3scales(newProps, false);}
    // putting after  requires a double click for sorting to be seen for after
    // this.data = newProps.data.sort((a,b) => d3.descending(+a[newProps.x], +b[newProps.x]));
    console.log(newProps.x);
    console.log('DOMAIN', this.xScale.domain());
  }

  d3scales(props, changeY){
    // having some troubles with default params here so will go back to classic
    // scales
    changeY = (typeof changeY !== 'undefined') ?  changeY : true;
    this.xScale.domain([0, d3.max(this.data.map(d => +d[props.x]))]);
    (changeY && this.yScale.domain(this.data.map(d => d[props.y])))
  }

  drawBar(d){

    // this.d3scales();
    let props = {
      x: this.state.left_margin,
      y: this.yScale(d[this.props.y]),
      width: this.xScale(d[this.props.x]),
      height: this.yScale.bandwidth(),
      className: d.group + ' cat bar',
      key: d.group + '-catbar',
      group: d.group
      // tranform: 'translate(' + this.state.left_margin + ', 0)'
    }

    return <Bar {...props} />
  }

  drawLab(d){
    let props = {
      x: this.state.left_margin/2,
      y: this.yScale(d[this.props.y]) + this.yScale.bandwidth()/2 + 4,
      fill: 'black',
      textAnchor: 'middle',
      className: d.group + ' label',
      key: d.group + '-label'
    }

    return(
      <text {...props}>{d.group}</text>
    )
  }

  drawNum(d){
    let props = {
      x: this.state.left_margin + this.xScale(d[this.props.x]) - 0.08*this.state.left_margin,
      y: this.yScale(d[this.props.y]) + this.yScale.bandwidth()/2 + 4,
      fill: 'black',
      textAnchor: 'end',
      className: d.group + ' numLab',
      key: d.group + '-numLab'
    }


    return(
      <text {...props}>{d[this.props.x]}</text>
    )
  }

  sortBars(newProps){
    const groups = d3.select(this.gref);
    console.log(groups);
    // groups._groups[0].map((g,i) =>
    //   g.transition(this.transition)
    //    .attr('y', this.data[i]));


    // groups._groups.map((d,i)=> d.transition(this.transition)
    //       .attr('y', this.yScale(newProps.data[i])));
  }

  render(){
    const data = this.data;
    if (data.length === 0) {return}

    else return(
      <svg className='viz' ref={(ref) => {this.el = ref;}}>
        {/* <g className='axis label' >
          {this.data.map(d => this.drawlabs(d))}
        </g>
        <g className='barchart'>
          {this.data.map(d => this.drawBar(d))}
        </g> */}



          {data.map(d => (
              <g className={d.group + ' group'} key={d.group} href={'#' + d.group}>
                {this.drawLab(d)}
                {this.drawBar(d)}
                {this.drawNum(d)}
              </g>
            )
          )}

      </svg>
  )
  }
}

export default CategoryBarChart;
