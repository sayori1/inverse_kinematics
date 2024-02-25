import { distance, findAngle } from "./math";
import { Segment } from "./segment";

const canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 1000;

let mousePosition: { x: number; y: number } = { x: 0, y: 0 };
document.addEventListener("mousemove", (e) => {
  mousePosition = { x: e.clientX, y: e.clientY };
});

document.body.appendChild(canvas);
const c = canvas.getContext("2d");

let objects: { draw: (canvas: CanvasRenderingContext2D) => void }[] = [];

for (let i = 0; i < 2; i++) {
  let segment = new Segment(100 + i * 100, 100, 0, 100);
  objects.push(segment);
}

function ikSolve(segments: Segment[], target: { x: number; y: number }) {
  for (let i = 1; i < segments.length; i += 2) {
    let child = segments[i];
    let parent = segments[i - 1];
    let c = distance(parent.x, parent.y, target.x, target.y);

    let pAngle = findAngle(child.width, parent.width, c);

    if (Number.isNaN(pAngle)) return;

    let dx = parent.x + Math.cos(pAngle) * parent.width;
    let dy = parent.y + Math.sin(pAngle) * parent.width;

    child.x = dx;
    child.y = dy;

    let angle = Math.atan2(target.y - dy, target.x - dx);

    parent.angle = pAngle;
    child.angle = angle;
  }
}

function loopback() {
  c.clearRect(0, 0, 1000, 1000);
  c.reset();

  objects.map((e) => e.draw(c));
  ikSolve(objects as Segment[], mousePosition);
}

setInterval(() => loopback(), 10);
