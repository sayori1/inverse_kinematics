export function findAngle(opposite: number, adjacent: number, adjacent2: number): any {
  return Math.acos((adjacent ** 2 + adjacent2 ** 2 - opposite ** 2) / (2 * adjacent * adjacent2));
}

export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
