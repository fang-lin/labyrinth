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

  draw(map) {
    const unit = this.unit * devicePixelRatio;
    const canvas = this.canvas;
    map.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell === 1) {
          canvas.fillStyle = "#666";
        } else if (cell === 2) {
          canvas.fillStyle = "#EEE";
        } else {
          canvas.fillStyle = "#FFF";
        }
        this.canvas.fillRect(x * unit, y * unit, unit, unit);
      });
    })
  }


}
