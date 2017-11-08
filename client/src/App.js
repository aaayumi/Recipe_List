import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
      results : []
  }

  componentDidMount() {
    fetch('/result')
     .then(res => res.json())
     .then(results => this.setState({ results: results }))
  }

  render() {
  
    console.log(this.state.results.results)

    let recipe;
    if(this.state.results.length > 0) {
      recipe = this.state.results.results.map(
        (obj) => (
          <div>
          <p>{obj.name}</p>
          </div>
          ))
      return <div>{recipe}</div>
    }

    return (
      <div className="App">
      <h2>Recipe List </h2>
      </div>
      )
    }
  }

export default App;
