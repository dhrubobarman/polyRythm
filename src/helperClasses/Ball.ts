import { Track } from "@/helperClasses/Track";
import { playSound } from "@/utils/sound";

export class Ball {
  track: Track;
  ballRadius: number;
  ballSpeed: number;
  center: any;
  offset: number;
  soundFequency: number;
  round: number;
  hue: number;
  progress: number;

  constructor(
    track: Track,
    ballRadius: number,
    ballSpeed: number,
    soundFequency: number,
    hue: number
  ) {
    this.track = track;
    this.ballRadius = ballRadius;
    this.ballSpeed = ballSpeed;
    this.offset = 0;
    this.center = this.track.getPosition(this.offset);
    this.soundFequency = soundFequency;
    this.round = 0;
    this.hue = hue;
    this.progress = 0;
  }
  move() {
    this.offset += this.ballSpeed;
    const res = this.track.getPosition(this.offset);
    this.center = { x: res.x, y: res.y };
    this.progress = res.progress;
    if (res.round !== this.round) {
      playSound(this.soundFequency);
      this.round = res.round;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.ballRadius, 0, Math.PI * 2);
    const lightness = 100 - 50 * this.progress;
    ctx.fillStyle = `hsl(${this.hue}, 100%, ${lightness}%)`;
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}
