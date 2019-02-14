import React, { Component } from 'react';
import './App.css';

import Labyrinth from './Labyrinth';
import Pathfinder from './Pathfinder';
import Canvas from './Canvas';

class App extends Component {

  componentDidMount() {
    let count = 0;
    const n = 50;
    const unit = 3;

    const labyrinth = new Labyrinth(n);
    const canvas = new Canvas(this.canvas, n, unit);
    labyrinth.run();
    canvas.drawMap(labyrinth.map);
    const pathfinder = new Pathfinder(labyrinth.map, [1, 1], [n * 2 - 1, n * 2 - 1]);
    pathfinder.find();

    const pathRecordHandler = setInterval(() => {
      if (pathfinder.recorder[count]) {
        canvas.drawPathCell(pathfinder.recorder[count]);
        pathfinder.recorder[count].path && canvas.drawPath(pathfinder.recorder[count].path);
        count++;
      } else {
        clearInterval(pathRecordHandler);
      }
    }, 0);


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
