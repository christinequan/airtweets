import * as d3 from 'd3';
import React, { Component } from 'react';
import Node from './Node.js'

class Node extends Component {
  constructor(props){
    super();
    this.updateD3(props);
  }

  componentWillReceiveProps(newProps){
    this.updateD3(newProps);
  }

  updateD3(){
    let node = vis.selectAll('circle')
    let force = d3.forceSimulation()
                  .data(nodes)
  }

  render(){
    return(
      <h1> Hi! </h1>
    )
  }

}

export default Force
