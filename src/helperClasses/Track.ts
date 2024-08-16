import { TPoint } from "@/types";

export class Track {
  center: TPoint;
  radius: number;
  period: number;
  hue: number;
  constructor(center: TPoint, radius: number, hue: number) {
    this.center = center;
    this.radius = radius;
    this.hue = hue;
    this.period = Math.PI;
  }
  getPosition(offset: number) {
    return {
      x: this.center.x + this.radius * Math.cos(offset),
      y: this.center.y - this.radius * Math.abs(Math.sin(offset)),
      round: Math.floor(offset / this.period),
      progress: (offset % this.period) / this.period,
    };
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 2; a += 0.01) {
      const position = this.getPosition(a);
      ctx.lineTo(position.x, position.y);
    }
    ctx.closePath();
    // ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
    ctx.stroke();
  }
}
