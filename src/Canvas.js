const devicePixelRatio = window.devicePixelRatio;

export default class Canvas {
  constructor(element, n = 5, unit = 10) {
    this.element = element;
    this.canvas = element.getContext('2d');
    this.unit = unit;
    this.width = (n * 2 + 1) * unit;
    this.height = (n * 2 + 1) * unit;

    this.setWidthHeight();
  }

  setWidthHeight() {
    this.element.setAttribute('width', `${this.width * devicePixelRatio}`);
    this.element.setAttribute('height', `${this.height * devicePixelRatio}`);
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
  }

  drawDoor([x, y]) {
    const unit = this.unit * devicePixelRatio;
    const canvas = this.canvas;

    canvas.fillStyle = "#EEE";
    this.canvas.fillRect(x * unit, y * unit, unit, unit);
  }

  drawPath([x, y]) {
    const unit = this.unit * devicePixelRatio;
    const canvas = this.canvas;

    canvas.fillStyle = "#8B8";
    this.canvas.fillRect(x * unit, y * unit, unit, unit);
  }

  drawPathCell([x, y]) {
    const unit = this.unit * devicePixelRatio;
    const canvas = this.canvas;

    canvas.fillStyle = "#ACA";
    this.canvas.fillRect(x * unit, y * unit, unit, unit);
  }

  drawMap(map) {
    const unit = this.unit * devicePixelRatio;
    const canvas = this.canvas;

    canvas.fillStyle = "#FFF";
    this.canvas.fillRect(0, 0, this.width, this.height);

    map.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell === 1) {
          canvas.fillStyle = "#666";
          this.canvas.fillRect(x * unit, y * unit, unit, unit);
        } else if (cell === 2) {
          canvas.fillStyle = "#EEE";
          this.canvas.fillRect(x * unit, y * unit, unit, unit);
        }
      });
    })
  }
}
