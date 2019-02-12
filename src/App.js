import React, { Component } from 'react';
import './App.css';

import Labyrinth from './Labyrinth';
import Canvas from './Canvas';

class App extends Component {

  componentDidMount() {
    let count = 0;
    const n = 10;
    const unit = 10;

    const labyrinth = new Labyrinth(n);
    const canvas = new Canvas(this.canvas, n, unit);

    canvas.drawMap(labyrinth.map);
    labyrinth.run();

    const recordHandler = setInterval(() => {
      if (labyrinth.recorder[count]) {
        canvas.drawCell(labyrinth.recorder[count]);
        count++;
      } else {
        clearInterval(recordHandler);
      }
    }, 100);
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
