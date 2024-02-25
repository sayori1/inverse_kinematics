export class Segment {
  constructor(public x: number = 0, public y: number = 0, public angle: number = 0, public width: number = 50) {}
  draw(canvas: CanvasRenderingContext2D) {
    canvas.resetTransform();

    canvas.translate(this.x, this.y);
    canvas.rotate(this.angle);
    canvas.moveTo(0, 0);
    canvas.lineTo(this.width, 0);
    canvas.closePath();
    canvas.stroke();

    canvas.resetTransform();
  }
}
