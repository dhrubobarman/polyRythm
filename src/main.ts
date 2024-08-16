import { Track } from "@/helperClasses/Track";
import "./style.css";
import { createElement } from "./utils/createElement";
import { Ball } from "@/helperClasses/Ball";

const canvas = createElement("canvas");
const ctx = canvas.getContext("2d")!;

const size = 700;
canvas.width = size;
canvas.height = size * 0.5;

const trackCenter = { x: size / 2, y: size / 2 };
const trackMinRadius = 50;
const trackStep = 15;
const ballRadius = 6;
const ballMinSpeed = 0.01;
const ballSpeedStep = -0.0001;

const soundFrequencies = [
  1760, 1567.98, 1396.91, 1318.51, 1174.66, 1046.5, 987.77, 880, 783.99, 698.46,
  659.25, 587.33, 523.25, 493.88, 440, 392, 349.23, 329.63, 293.66, 261.63,
];

const tracks: Track[] = [];
const balls: Ball[] = [];
const N = 20;

for (let i = 0; i < N; i++) {
  const trackRadius = trackMinRadius + i * trackStep;
  const ballSpeed = ballMinSpeed + i * ballSpeedStep;
  const ballSoundFrequency = soundFrequencies[i % soundFrequencies.length];
  const hue = (i * 360) / N;
  const track = new Track(trackCenter, trackRadius, hue);
  const ball = new Ball(track, ballRadius, ballSpeed, ballSoundFrequency, hue);
  tracks.push(track);
  balls.push(ball);
}

const animate = (_d: number) => {
  ctx.clearRect(0, 0, size, size);
  tracks.forEach((track) => track.draw(ctx));
  balls.forEach((ball) => ball.move());
  balls.forEach((ball) => ball.draw(ctx));
  requestAnimationFrame(animate);
};
requestAnimationFrame(animate);
