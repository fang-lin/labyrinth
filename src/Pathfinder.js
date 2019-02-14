import { include } from './Labyrinth';

export default class Pathfinder {
  constructor(map) {
    // Zero is cell, one is wall, two is door, three is path cell, four is path
    this.bankMap = map;
    this.reset();
  }

  reset() {
    this.map = JSON.parse(JSON.stringify(this.bankMap));
  }

  find(start, end) {
    this.reset();
    this.start = start;
    this.end = end;
    this.recorder = [];
    this.passed = new Map();
    this.generateTree(start);
    return this.recorder;
  }

  generatePath(end) {
    let cell = end;
    do {
      const [x, y] = cell;
      this.map[x][y] = 3;
      if (cell.path) {
        const [g, k] = cell.path;
        this.map[g][k] = 4;
      }
      this.recorder.push(cell);
      cell = cell.parent;
    } while (cell);
    this.recorder.reverse();
  }

  generateTree(cell) {
    this.passed.set(`${cell[0]},${cell[1]}`, cell);
    if (cell[0] === this.end[0] && cell[1] === this.end[1]) {
      this.generatePath(cell);
    } else {
      const cells = this.findLinkedAdjoinCells(cell);
      cell.children = cells;
      cells.forEach(nextCell => {
        nextCell.parent = cell;
        this.generateTree(nextCell);
      });
    }
  };

  findLinkedAdjoinCells(cell) {
    return [
      [cell[0] - 1, cell[1]],
      [cell[0], cell[1] - 1],
      [cell[0] + 1, cell[1]],
      [cell[0], cell[1] + 1],
    ]
      .filter(path => this.map[path[0]] && this.map[path[0]][path[1]] === 2)
      .map(path => {
        const pathCell = [
          path[0] * 2 - cell[0],
          path[1] * 2 - cell[1],
        ];
        pathCell.path = path;
        return pathCell;
      })
      .filter(cell => !include(this.passed, cell));
  }
};
