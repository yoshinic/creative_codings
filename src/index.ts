import "./sass/style.scss";
import p5 from "p5";

const sketch = (p: p5) => {
  /** 初期化処理 */
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background("#131821"); // 背景色を設定
  };

  /** フレームごとの描画処理 */
  p.draw = () => {
    if (p.frameCount % 50 === 0) {
      p.strokeWeight(p.random(30, 80));
      p.stroke(p.random(180, 255), p.random(180, 255), p.random(180, 255));
      p.circle(p.width / 2, p.height / 2, p.random(50, 300));
    }
  };
};

new p5(sketch);
