import * as d3 from 'd3';
import React, {Component} from 'react';
// import { Transition} from 'react-transition-group';
// import anime from 'animejs';
import * as scrollTo from 'scroll-to-element';
import './bar.min.css';


// const animateOut = () => {
//   console.log('ANIMATE OUT');
//   anime({
//     targets: 'rect',
//     w: 0,
//   });
// }

class Bar extends Component{
  constructor(){
    super();
    this.transition = d3.transition().ease(d3.easeCubicInOut);
    this.barRef = null;
  }

  clickHandler = (event) => {
    event.preventDefault();
    console.log(this.props.group);
    let element = '#' + this.props.group;
    scrollTo(element);
  }

  componentWillUpdate(newProps){
    // console.log('TRANSITION');
    let node = d3.select(this.barRef);
    //
    // node.transition(this.transition)
    //     .duration(500)
    //     .attr('width', 0)
    //     .transition(this.transition)
    //     .duration(1000)
    //     .attr('width', newProps.width)
    node.interrupt()
        .transition()
        .ease(d3.easeCubicIn)
        .duration(100)
        .attr('width',0)
        .transition(d3.easeBackOut)
        .duration(1000)
        .attr('width', newProps.width)


    //1000

    // node.transition()
    //     .duration(10000)
    //     .attr('width', newProps.width);

  }


  render(){
    return(
      <rect {...this.props} ref={(ref) => this.barRef=ref} onClick={this.clickHandler}></rect>
    )
  }
}

export default Bar;
