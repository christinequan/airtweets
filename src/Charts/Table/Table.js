import React, {Component} from 'react';
import './table.min.css';

const FILL = 0.48;

class Table extends Component{
  constructor(props){
    super(props);
    this.data = this.props.data.filter(d => d.group === this.props.cat)
    this.data = this.data.sort((a,b) => +b.nn - +a.nn);
    this.numRow = (this.data.length%2 === 0) ? this.data.length/2 : (this.data.length + 1)/2;
    this.state = {dim: null};
  }

  componentDidMount(){
    const dim = this.ref.getBoundingClientRect();
    this.emoji_size =  Math.sqrt(dim.height*dim.width*FILL/this.data.length);
    this.setState({dim: dim});
  }

  render(){
    return(
      <div className='table' ref={(ref)=> this.ref = ref}>
        {this.data.map(d => {
          let href = './emojione/' + d.unicode + '.svg';
          return (
            <div key={d.emojis} id={d.emojis}>
              <img src={href} width={this.emoji_size} height={this.emoji_size} alt={d.name}/>
              <p color='pink'>{d.nn}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Table;

// References
// https://mimno.github.io/showcase/project2/got/
