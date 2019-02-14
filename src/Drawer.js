const devicePixelRatio = window.devicePixelRatio;

export default class Drawer {
  constructor(element, n = 5, unit = 10) {
    this.element = element;
    this.canvas = element.getContext('2d');
    this.unit = unit;
    this.width = (n * 2 + 1) * unit;
    this.height = (n * 2 + 1) * unit;

    this.devicePixelRatioUnit = this.unit * devicePixelRatio;
    this.setWidthHeight();
  }

  setWidthHeight() {
    this.element.setAttribute('width', `${this.width * devicePixelRatio}`);
    this.element.setAttribute('height', `${this.height * devicePixelRatio}`);
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
  }

  drawCell([x, y], value) {
    const unit = this.devicePixelRatioUnit;
    const canvas = this.canvas;
    switch (value) {
      case(0):
        canvas.fillStyle = "#FFF";
        break;
      case(1):
        canvas.fillStyle = "#666";
        break;
      case(2):
        canvas.fillStyle = "#EEE";
        break;
      case(3):
        canvas.fillStyle = "#ACA";
        break;
      case(4):
        canvas.fillStyle = "#8C8";
        break;
      case(5):
        canvas.fillStyle = "#3A3";
        break;
      case(6):
        canvas.fillStyle = "#F93";
        break;
      case(7):
        canvas.fillStyle = "#F66";
        break;
    }
    canvas.fillRect(x * unit, y * unit, unit, unit);
  }

  drawPath(path) {
    const unit = this.devicePixelRatioUnit;
    const canvas = this.canvas;

    path.forEach((cell) => {
      canvas.fillStyle = '#ACA';
      canvas.fillRect(cell[0] * unit, cell[1] * unit, unit, unit);

      if (cell.path) {
        canvas.fillStyle = '#8C8';
        canvas.fillRect(cell.path[0] * unit, cell.path[1] * unit, unit, unit);
      }
    });
  }

  drawLabyrinth(map) {
    const unit = this.devicePixelRatioUnit;
    const canvas = this.canvas;

    canvas.fillStyle = '#FFF';
    canvas.fillRect(0, 0, this.width * devicePixelRatio, this.height * devicePixelRatio);

    map.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell === 1) {
          canvas.fillStyle = '#666';
          this.canvas.fillRect(x * unit, y * unit, unit, unit);
        } else if (cell === 2) {
          canvas.fillStyle = '#EEE';
          this.canvas.fillRect(x * unit, y * unit, unit, unit);
        }
      });
    });
  }
}
