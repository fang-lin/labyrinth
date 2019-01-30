import React, { Component, createElement } from 'react';
import styled from 'styled-components';
import './App.css';

import Labyrinth from './Labyrinth';

const width = 10;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const Cell = styled.div`
  width: ${width}px;
  height: ${width}px;
  background-color: #fff;
  color: #333;
  font-size: 8px;
`;

const Road = styled.div`
  width: ${width}px;
  height: ${width}px;
  background-color: #eee;
  color: #333;
  font-size: 8px;
`;

const Wall = styled.div`
  width: ${width}px;
  height: ${width}px;
  background-color: #666;
  color: #333;
  font-size: 8px;
`;

class App extends Component {

  constructor(props) {
    super(props);
    this.labyrinth = new Labyrinth(20);
    this.state = {
      labyrinth: this.labyrinth.map,
    }
  }

  componentDidMount() {
    let count = 0;
    const recordHandler = setInterval(() => {
      if (this.labyrinth.recorder[count]) {
        this.setState({
          labyrinth: this.labyrinth.recorder[count],
        });
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
        <div id="canvas" ref={ this.createCanvas }>
          {
            this.state.labyrinth.map((row, x) => (
              <Row key={ x }>
                {
                  row.map((cell, y) => (
                    createElement(cell === 0 ? Cell : cell === 2 ? Road : Wall, { key: y })
                  ))
                }
              </Row>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
