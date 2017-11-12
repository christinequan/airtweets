import React, {Component} from 'react';
import * as d3 from 'd3';

class Chord extends Component{
  constructor(){
    super();

    this.ref = null;
    this.state ={
      cipher: null,
      matrix: [] //make sure this is initiaized correctly
    }

    this.chord = d3.chord().padAngle(0.4);

    this.color = d3.scaleOrdinal()
    .domain(d3.range(8))
    .range(["#000000", "#FFDD89", "#957244", "#F26223", "#F26453", "#957244", "#F26223", "#F26453"]);
  }

  componentDidMount(){
    this.svg_dim = this.ref.getBoundingClientRect();
    // get the dimensions of the svg
    this.outerRadius = this.svg_dim.width/2;
    this.innerRadius = this.outerRadius - 10;

    // TODO this might be refactored to the top so the defs are in constructor
    // this.arc = d3.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius);
    // this.ribbon = d3.ribbon().radius(this.innerRadius);

    d3.queue()
      .defer(d3.csv, './data/airtweets_id.csv')
      .defer(d3.csv, './data/airtweets_pairs.csv')
      .await((error, id, pairs) => {
        if (error) throw error;
        let {cipher, matrix} = createMatrix(id, pairs);
        this.setState({cipher: cipher, matrix: matrix});
      })
  }

  // drawChord(){
  //
  //   this.chord(this.state.matrix).map(d => {
  //     return(
  //     <g>
  //       <path d={this.arc} fill='teal'></path>
  //     </g>
  //   )
  //   })
  //
  // }

  render(){
    const arc = d3.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius);
    const ribbon = d3.ribbon().radius(this.innerRadius);
    // console.log('arc', arc);
    // console.log(this.chord(this.state.matrix).groups);
    // console.log('ribbon', ribbon());

    return(
      <svg ref={(ref)=>{this.ref=ref}}>
        {
          this.chord(this.state.matrix).groups.map(d => {
            // console.log(d);
            arc.startAngle(d.startAngle).endAngle(d.endAngle);
            // console.log(arc());
            return(
            <g transform={'translate('+ this.svg_dim.width/2 + ',' + this.svg_dim.height/2+')'}>
              <path d={arc()} fill={this.color(d.index)}></path>
            </g>
          )
          })
        }

        {
          this.chord(this.state.matrix).map(d => {
            return(
              <g transform={'translate('+ this.svg_dim.width/2 + ',' + this.svg_dim.height/2+')'}>
                <path d={ribbon(d)} fill='pink'/>
              </g>
            )
          })
        }
      </svg>
    )
  }
}

function createMatrix(id, pairs){
  let key = {};
  let cipher = {};
  id.forEach(d => key[d.emojis]= d.e_id);
  id.forEach(d => cipher[d.emojis] = d);

  // zero matrix
  const max_id = d3.max(id, d => +d.e_id) + 1; // zero index
  const zero_row = Array(max_id).fill(0);
  // let matrix = Array(max_id).fill(Array(max_id).fill(0)); // this doesn't work...werid pointer issues
  let matrix = zero_row.map((d, i, a) => Array(max_id).fill(0));

  //matrix
  pairs.forEach(d => {
    const row = +key[d.item1];
    const col = +key[d.item2];
    matrix[row][col] = +d.n;
    // matrix[col][row] = +d.n;

  })

  return {cipher, matrix}

}

export default Chord;

// References
// https://mimno.github.io/showcase/project2/got/
