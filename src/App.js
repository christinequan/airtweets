import React, { Component } from 'react';
import * as d3 from 'd3';

//local
import './App.min.css';
import Preloader from './Preloader/Preloader'
// import { loadAllData } from './data/DataHandling';
import {Intro, Tweet} from './Intro'
import Section from './Section/Section';
import {section_props} from './Section_Props';
import CategoryBarChart from './Charts/CategoryBarChart/CategoryBarChart';
import Map from './Charts/Map/Map';
import Chord from './Charts/Chord/Chord';
import Table from './Charts/Table/Table';
// import {CategoryBarChart, Map, Chord, Table} from './Charts'

class App extends Component {
  constructor(){
    super();
    this.hello = null;
    this.state={
      categories: [],
      categoryView: 'total'
    };
  }

  componentDidMount(){
    d3.queue()
    .defer(d3.csv, './data/category_totals.csv')
    .defer(d3.csv, './data/airtweets7_tables.csv')
    .await((error, category_totals, tables) => {
      if (error) throw error;
      this.setState({categories: category_totals, tables: tables});
    })
  }

  buttonCallback = (event) => {
    // view
    event.preventDefault();
    document.getElementsByClassName('selected')[0].classList.remove('selected');
    event.currentTarget.classList.add('selected');

    // model
    const view = event.currentTarget.dataset.group;
    this.setState({categoryView: view})
  }

  render(){

    if(this.state.categories.length < 1){
      return (
        <Preloader/>
      );
    } else return (
      <div className='App'>
        <Intro />
        <Tweet />
        <Section {...section_props.categories}>
          <div className='vizbox'>
            <CategoryBarChart data={this.state.categories} x={this.state.categoryView} y='group'/>
          </div>
          <div className='button-box'>
            <button type='button' className='selected' data-group='total' onClick={this.buttonCallback}>Totals</button>
            <button type='button' data-group='unique' onClick={this.buttonCallback}>Unique </button>
            <button type='button' data-group='percent' onClick={this.buttonCallback}> Percent Unique </button>
          </div>
        </Section>
        <Section {...section_props.map}>
          {/* <Map map={this.state.map}/> */}
          <Map/>
        </Section>
        {this.state.categories.map(d =>{
          if (d.group === 'Country'){return null}
          else return(
            <Section key={d.group} group={d.group} {...section_props[d.group]}>
              <Table data={this.state.tables} cat={d.group}/>
            </Section>
          )
        })}
        <Section {...section_props.pairs}>
          <Chord/>
        </Section>
      </div>
    )
  }
}

export default App;
