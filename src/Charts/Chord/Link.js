import React, {Component} from 'react';
import {project} from './utils';

class Link extends Component{
  constructor(props){
    super(props);
    this.emoji_width = props.emoji_width;
    this.node_coords = props.node_coords;
    this.svg_dim = props.svg_dim;
    this.d = props.d;
  }

  render(){
    let emoji_width = this.emoji_width;
    let d = this.d;
    let x1 = (this.node_coords[d.item1].x < this.svg_dim.width/2) ? this.node_coords[d.item1].x + emoji_width : this.node_coords[d.item1].x - emoji_width;
    let y1 = (this.node_coords[d.item1].y < this.svg_dim.height/2) ? this.node_coords[d.item1].y + emoji_width: this.node_coords[d.item1].y - emoji_width;
    let x2 = (this.node_coords[d.item2].x < this.svg_dim.width/2) ? this.node_coords[d.item2].x + emoji_width : this.node_coords[d.item2].x - emoji_width;
    let y2 = (this.node_coords[d.item2].y < this.svg_dim.height/2) ? this.node_coords[d.item2].y + emoji_width: this.node_coords[d.item2].y - emoji_width;

    let a1 = this.node_coords[d.item1].a;
    let a2 = this.node_coords[d.item2].a;
    let r = this.node_coords[d.item1].r;

    let bez1 = project(a1, r/2);
    let bez2 = project(a2, r/2);
    let path = 'M ' + x1 + ',' + y1 + ' C ' + bez1[0] + ',' + bez1[1] + ' ' + bez2[0] + ',' + bez2[1] + ' ' + x2 + ',' + y2;

    let props = {
      key: d.item1 + '-' + d.item2,
      className: 'line',
      link: d.item1 + '-' + d.item2,
      d: path,
      stroke: (this.props.current) ? 'rgb(245,94,101)' : 'rgba(156,161,154, 0.10)',
      fill:'none',
      strokeWidth: d.n,
      transform: 'translate(' + (this.svg_dim.width/2-emoji_width)+ ',' + (this.svg_dim.height/2-emoji_width) + ')'
    }

    return(
      <path {...props}/>
    )
  }
}

export default Link;
