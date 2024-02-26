import { ikSolve, ikSolve2 } from "./ik";
import { distance, findAngle } from "./math";
import { Segment } from "./segment";

const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mousePosition: { x: number; y: number } = { x: 0, y: 0 };
document.addEventListener("mousemove", (e) => {
  mousePosition = { x: e.clientX, y: e.clientY };
});

document.body.appendChild(canvas);
const c = canvas.getContext("2d");

let objects: { draw: (canvas: CanvasRenderingContext2D) => void }[] = [];

for (let i = 0; i < 40; i++) {
  let segment = new Segment(100 + i * 10, 100, 0, 20);
  objects.push(segment);
}

function loopback() {
  c.clearRect(0, 0, 1000, 1000);
  c.reset();

  objects.map((e) => e.draw(c));

  ikSolve2(objects as Segment[], mousePosition);
}

setInterval(() => loopback(), 10);
