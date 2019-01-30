import React, { Component } from 'react';
import './App.css';

import Labyrinth from './Labyrinth';
import Canvas from './Canvas';

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let count = 0;
    const n = 20;
    const unit = 10;

    this.labyrinth = new Labyrinth(n);
    const canvas = new Canvas(this.canvas, n, unit);

    const recordHandler = setInterval(() => {
      if (this.labyrinth.recorder[count]) {
        canvas.draw(this.labyrinth.recorder[count]);
        count++;
      } else {
        clearInterval(recordHandler);
      }
    }, 10);
  }

  createCanvas = (ele) => {
    this.canvas = ele || null;
  };

  render() {
    return (
      <div className="App">
        <canvas ref={ this.createCanvas }/>
      </div>
    );
  }
}

export default App;
