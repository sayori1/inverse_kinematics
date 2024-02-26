import { distance, findAngle } from "./math";
import { Segment } from "./segment";

export function ikSolve(segments: Segment[], target: { x: number; y: number }) {
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

export function ikSolve2(segments: Segment[], target: { x: number; y: number }, pivot: { x: number; y: number } = { x: 100, y: 100 }) {
  let last = segments.length - 1;
  segments[last].drag(target.x, target.y);

  for (let i = last; i > 0; i--) {
    let first = segments[i];
    let second = segments[i - 1];

    second.drag(first.x, first.y);
  }

  for (let i = 0; i < segments.length - 1; i++) {
    let first = segments[i];
    let second = segments[i + 1];

    if (i == 0) {
      first.x = pivot.x;
      first.y = pivot.y;
    }

    let firstEndPoint = first.endPoint();
    second.x = firstEndPoint.x;
    second.y = firstEndPoint.y;
  }
}
