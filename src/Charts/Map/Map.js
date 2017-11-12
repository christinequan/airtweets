import React, {Component} from 'react';
import * as d3 from 'd3';
import {feature} from 'topojson-client';
import './map.min.css';

class Map extends Component {
  constructor(props){
    super(props);
    this.mapref = null;
    this.geojson = this.props.map;
    this.state = {
      worlddata: [],
      flagdata: []
    }
  }


  componentDidMount(){
    this.svgdim = this.mapref.getBoundingClientRect();
    this.projection = d3.geoMercator().scale(150);

    d3.queue()
    .defer(d3.json, './data/worldmap_m110.json')
    .defer(d3.csv, './data/airtweets_map.csv')
    .await((error, worldmap, flagdata) => {
      if (error) throw error;
      this.setState({
        worlddata: feature(worldmap, worldmap.objects.countries).features,
        flagdata: flagdata
      })
    });

  }

  hoverHandler(event){
    event.currentTarget.attr.width = 20;
  }

  render(){
    return(
      <svg xmlns='http://www.w3.org/2000/svg'
           ref={ref=>{this.mapref = ref}} className='map' viewBox='0 0 900 500' preserveAspectRatio = 'xMidYMid meet'>
        <g className="countries">
        {
          this.state.worlddata.map((d,i) => (
            <path
              d={ d3.geoPath().projection(this.projection)(d) }
              className="country"
              key = {'country' + i}
            />
          ))
        }
        </g>
        <g className="markers">
        {
          this.state.flagdata.map( d => (

            <image href={'./emojione/'+ d.unicode +  '.svg'}
            x={this.projection([+d.longitude, +d.latitude])[0]}
            y={this.projection([+d.longitude, +d.latitude])[1]}
            width='15'
            height='15'
            className='emoji'
            key={d.emojis}
            id={d.emojis}></image>

          ))
        }
        </g>
      </svg>
    )
  }
}

export default Map;
