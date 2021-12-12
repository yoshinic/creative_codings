import "./sass/style.scss";
import p5 from "p5";

let r: number;
let x: number;
const a: string[] = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "🥲",
  "😊",
  "😇",
];
let i: number = 0;

const width = screen.width;
const height = screen.height;

// TypeScript
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(width, height);

    r = Math.min(width, height) / 10;
    x = r;
  };

  p.draw = () => {
    p.clear();

    if (x % 100 === 0) {
      if (i === a.length - 1) {
        i = 0;
      } else {
        i++;
      }
    }
    p.text(`${a[i]} 🎉🎉🎉`, x, 100);
    p.textFont("monospace", 80);

    x += 5;
    if (x > width + r) {
      x = -r;
    }

    p.fill(204, 102, 0);
    p.circle(x, height / 2, r * 2);
  };
};

new p5(sketch);
