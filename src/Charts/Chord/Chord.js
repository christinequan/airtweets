import React, {Component} from 'react';
import * as d3 from 'd3';
import './chord.min.css';
import {project, processData} from './utils';
import Link from './Link';
import Emoji from './Emoji';
import Circle from './Circle';
import ArcText from './ArcText';

class Chord extends Component{
  constructor(){
    super();
    this.emojiHoverCallback = this.emojiHoverCallback.bind(this);
    this.emojiOutCallback = this.emojiOutCallback.bind(this);
    this.emoji_width = 10;

    this.ref = null;
    this.node_coords = {};
    this.emoji_network = {};
    this.links = {};
    this.state ={
      node: [],
      pairs: [],
      currentNodes: [],
      currentLinks: []
    }

    this.color = d3.scaleOrdinal()
    .domain(d3.range(8))
    .range(["#f55e65", "#7c004f", "#1a737b", "#01d1c1", "#a8e49c", "#ffb400", "#ffaa91", "#b3a76b", '#9ca19a']);
  }

  componentDidMount(){
    this.svg_dim = this.ref.getBoundingClientRect();
    // get/set the dimensions of the svg
    this.outerRadius = this.svg_dim.width/2 * 0.78;
    this.innerRadius = this.outerRadius - 10;
    // this.cluster_circ = this.ref !== null && d3.cluster().size([360, innerRadius]);
    // this.cluster_emoj = this.ref !== null && d3.cluster().size([360, outerRadius]);
    // console.log(this.emoji_network);

    d3.queue()
      .defer(d3.csv, './data/airtweets6_hier.csv')
      .defer(d3.csv, './data/airtweets_pairs.csv')
      .await((error, airtweets, pairs) => {
        if (error) throw error;
        let data = processData(airtweets);
        this.createEmojiNetwork(pairs);
        this.setState({node: data, pairs: pairs});
      })
  }

  createEmojiNetwork(pairs){
    // store node, also could have used callback but let's not
    pairs.map(d => {
      this.emoji_network[d.item1] = this.emoji_network[d.item1] || {'nodes': [], links: []};
      this.emoji_network[d.item1]['nodes'].push(d.item2);

      this.emoji_network[d.item2] = this.emoji_network[d.item2] || {'nodes': [], links: []};
      this.emoji_network[d.item2]['nodes'].push(d.item1);

      let link = d.item1 + '-' + d.item2;
      this.emoji_network[d.item1]['links'].push(link);
      this.emoji_network[d.item2]['links'].push(link);
    })

    return(this.emoji_network);
  }

  drawCircles(d){
    let [x,y] = project(d.x, d.y);
    this.node_coords[d.data.emojis] = {x:x, y:y, a:d.x, r:d.y};
    let props = {
      d: d, x:x, y:y,
      svg_dim: this.svg_dim,
      color: this.color,
    }

    return (<Circle {...props}/>)
  }

  drawEmojis(d){
    //store and save coordinates first, could have used callback but let's not
    let [x,y] = project(d.x, d.y);

    let props = {
      d:d, x:x, y:y,
      emoji_width: this.emoji_width,
      svg_dim: this.svg_dim,
      emojiHoverCallback: this.emojiHoverCallback,
      emojiOutCallback: this.emojiOutCallback,
      emoji_network: this.emoji_network,
      current: this.state.currentNodes.includes(d.data.emojis) ? true : false,
    }
    return (<Emoji {...props}/>)
  }

  emojiHoverCallback(emoji_selected){
    let nodes = this.emoji_network[emoji_selected].nodes;
    let currentNodes = [...[emoji_selected], ...nodes];
    let currentLinks = this.emoji_network[emoji_selected].links;
    this.setState({currentNodes: currentNodes, currentLinks: currentLinks});
  }

  emojiOutCallback(){
    this.setState({currentNodes: [], currentLinks: []});
  }

  drawLinks(d){
    let link = d.item1 + '-' + d.item2;

    let props = {
      emoji_width: this.emoji_width,
      node_coords: this.node_coords,
      svg_dim: this.svg_dim,
      d: d,
      current: this.state.currentLinks.includes(link) ? true : false,
    }

    // drawlinks
    return(<Link {...props}/>)
  }


  render(){
    let cluster_circ = this.ref !== null && d3.cluster().size([360, this.innerRadius]);
    let cluster_emoj = this.ref !== null && d3.cluster().size([360, this.outerRadius]);

    return(
      <svg ref={(ref)=>{this.ref=ref}} className='chord'>
                {this.state.pairs.map(d => this.drawLinks(d))}
        {this.state.node.hasOwnProperty('children') &&
          cluster_circ(this.state.node).leaves().map(d => this.drawCircles(d))}
        {this.state.node.hasOwnProperty('children') &&
           cluster_emoj(this.state.node).leaves().map(d => this.drawEmojis(d))}
           {/* {console.log(this.emoji_network)} */}
      </svg>
    )
  }
}

export default Chord;
