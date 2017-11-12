import React, {Component} from 'react';
import './Section.min.css';

// this Section component takes a series of props and then
// returns the html skeleton for a section
// which includes a story section and a visual section with an svg component

class Section extends Component{

  constructor(props){
    super(props);
    this.section_index = props.section_num;
    const classNames = ['scene','story', 'visual'];
    this.fullClassNames = classNames.map(name => name + ' index-' + (props.title ? props.title.replace(' ', '') : ''));
  }

  render(){

    // console.log(this.props.children, 'child');

    return(
      <section className={this.fullClassNames[0]} id={this.props.group}>

        <div className={this.fullClassNames[1]}>
          <h1>{this.props.title}</h1>
          <p>{this.props.text}</p>
        </div>

        <div className={this.fullClassNames[2]}>
          {this.props.children}
        </div>

      </section>
    )
  }
}

export default Section;
