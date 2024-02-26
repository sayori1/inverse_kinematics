export class Segment {
  constructor(public x: number = 0, public y: number = 0, public angle: number = 0, public width: number = 50) {}

  draw(canvas: CanvasRenderingContext2D) {
    canvas.resetTransform();

    canvas.translate(this.x, this.y);
    canvas.rotate(this.angle);
    canvas.moveTo(0, 0);
    canvas.lineTo(this.width, 0);
    canvas.ellipse(0, 0, 2, 2, 3.14, 0, 6.28);
    canvas.closePath();
    canvas.stroke();

    canvas.resetTransform();
  }

  lookAt(x: number, y: number) {
    let dx = x - this.x;
    let dy = y - this.y;
    this.angle = Math.atan2(dy, dx);
  }

  endPoint() {
    return {
      x: this.x + Math.cos(this.angle) * this.width,
      y: this.y + Math.sin(this.angle) * this.width,
    };
  }

  drag(x: number, y: number) {
    this.lookAt(x, y);
    this.x = x - Math.cos(this.angle) * this.width;
    this.y = y - Math.sin(this.angle) * this.width;
  }
}
