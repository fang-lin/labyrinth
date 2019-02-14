import React, { Component } from 'react';
import './App.css';

import Labyrinth from './Labyrinth';
import Pathfinder from './Pathfinder';
import Drawer from './Drawer';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      start: null,
      end: null
    }
  }

  componentDidMount() {
    this.n = 50;
    this.unit = 8;

    this.drawer = new Drawer(this.canvas, this.n, this.unit);

    this.labyrinth = new Labyrinth(this.n);
    this.labyrinth.run();

    this.pathfinder = new Pathfinder(this.labyrinth.map);

    this.drawer.drawLabyrinth(this.labyrinth.map);
  }

  createCanvas = (ele) => {
    this.canvas = ele || null;
  };

  componentDidUpdate() {
    this.drawer.drawLabyrinth(this.labyrinth.map);
    this.pathfinder.reset();

    const { start, end } = this.state;

    if (start && end) {
      const path = this.pathfinder.find(start, end);
      this.drawer.drawPath(path);
    }

    if (start) {
      this.pathfinder.map[start[0]][start[1]] = 6;
      this.drawer.drawCell(start, 6);
    }

    if (end) {
      this.pathfinder.map[end[0]][end[1]] = 7;
      this.drawer.drawCell(end, 7);
    }
  }

  getCoordinate(event) {
    const { left, top } = this.canvas.getBoundingClientRect();
    const x = Math.floor((event.pageX - left) / this.unit);
    const y = Math.floor((event.pageY - top) / this.unit);
    return [x, y];
  }

  onClickCanvas = event => {
    const [x, y] = this.getCoordinate(event);

    if (this.labyrinth.map[x][y] === 0) {
      const { start, end } = this.state;
      if (!(!start ^ !end)) {
        this.setState({
          start: [x, y],
          end: null,
        });
      } else {
        this.setState({
          end: [x, y],
        });
      }
    }
  };

  onMouseMoveCanvas = event => {
    const [x, y] = this.getCoordinate(event);
    if (this.labyrinth.map[x][y] === 0) {
      if (this.hoverCell) {
        const [g, k] = this.hoverCell;
        this.drawer.drawCell([g, k], this.hoverCell.value);
      }
      this.hoverCell = [x, y];
      this.hoverCell.value = this.pathfinder.map[x][y];
      this.drawer.drawCell([x, y], 5);
    }
  };

  render() {
    const { start, end } = this.state;
    return (
      <div className="App">
        <canvas ref={ this.createCanvas } onClick={ this.onClickCanvas } onMouseMove={ this.onMouseMoveCanvas }/>
      </div>
    );
  }
}

export default App;
