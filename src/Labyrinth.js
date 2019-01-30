import noop from 'lodash/noop';
import random from 'lodash/random';

export function include(cells, cell) {
  return cells.get(`${cell[0]},${cell[1]}`);
}

export function randomCell(cells) {
  return cells[random(0, cells.length - 1)];
}

export function initCheckerboard(n, each = noop) {
  // Zero is road, one is wall
  const checkerboard = [];
  const m = n * 2 + 1;
  for (let x = 0; x < m; x++) {
    const row = [];
    for (let y = 0; y < m; y++) {
      const state = x % 2 === 0 ? 1 : (y % 2 === 0 ? 1 : 0);
      const returned = each(state, x, y);
      row.push(typeof returned === 'undefined' ? state : returned);
    }
    checkerboard.push(row);
  }
  return checkerboard;
}

export function getAdjoinCell(cell, n) {
  return [
    [cell[0] - 2, cell[1]],
    [cell[0], cell[1] - 2],
    [cell[0] + 2, cell[1]],
    [cell[0], cell[1] + 2],
  ].filter(cell => cell[0] > 0 && cell[0] < n * 2 + 1 && cell[1] > 0 && cell[1] < n * 2 + 1);
}

export default class Labyrinth {
  constructor(n) {
    this.n = n;
    this.unlinked = new Map();
    this.recorder = [];
    this.map = initCheckerboard(n, (state, x, y) => {
      if (state === 0) {
        this.unlinked.set(`${x},${y}`, [x, y]);
      }
    });

    this.run();
    this.recorder = this.recorder.map(map => JSON.parse(map));
  }

  next(cell) {
    this.record(this.map);

    if (this.unlinked.size > 0) {
      let nextCell = this.findRandomUnlinkedAdjoinCell(cell);

      if (nextCell) {
        const x = (cell[0] + nextCell[0]) / 2;
        const y = (cell[1] + nextCell[1]) / 2;
        this.map[x][y] = 2;
        this.unlinked.delete(`${nextCell[0]},${nextCell[1]}`);
      } else {
        nextCell = this.findRandomLinkedAdjoinCell(cell);
      }
      return nextCell;
    }
  }

  run() {
    let cell = this.next([1, 1]);
    do {
      cell = this.next(cell);
    } while (cell);
  }

  record(map) {
    const stringify = JSON.stringify(this.map);
    if (this.recorder[this.recorder.length - 1] !== stringify) {
      this.recorder.push(stringify);
    }
  }


  findUnlinkedAdjoinCells(cell) {
    return getAdjoinCell(cell, this.n).filter(cell => include(this.unlinked, cell));
  }

  findRandomUnlinkedAdjoinCell(cell) {
    return randomCell(this.findUnlinkedAdjoinCells(cell));
  }

  findLinkedAdjoinCells(cell) {
    return getAdjoinCell(cell, this.n).filter(cell => !include(this.unlinked, cell));
  }

  findRandomLinkedAdjoinCell(cell) {
    return randomCell(this.findLinkedAdjoinCells(cell));
  }

}
