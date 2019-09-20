import { MathUtil } from './util/MathUtil';
import { TextTool } from './text-tool';
export class Demo2 extends PIXI.Container {
  private tool: TextTool;

  private textSegments = [
    "This is a llooonngggggeeerrrrrr test",
    "Short test",
    "TEST WITH ALL CAPS",
    "T;e`s~3t w^it#h s%y#mb!ols",
    "This is a test"
  ]
  private imageKeys = [
    "smiley",
    "dog",
    "dollar"
  ]
  private counter: number = 0;
  private currentTextSpr: PIXI.Sprite;
  constructor() {
    super();
    this.tool = new TextTool([
      { key: "smiley", path: "assets/face.png" },
      { key: "dog", path: "assets/dog.png" },
      { key: "dollar", path: "assets/dollar-sign.png" }
    ], this.onToolLoaded)
  }
  onToolLoaded = () => {
    PIXI.ticker.shared.add(() => {
      this.counter += PIXI.ticker.shared.elapsedMS / 1000
      if (this.counter > 2) {
        this.counter = 0;
        let testString = "";
        for (let i = 0; i < 3; i++) {
          if (Math.random() > 0.5) {
            let index = Math.round(Math.random() * (this.textSegments.length - 1));
            testString += this.textSegments[index] + " "
          }
          else {
            let index = Math.floor(Math.random() * (this.imageKeys.length - 1));
            testString += " {" + this.imageKeys[index] + "} "
          }
        }

        if (this.currentTextSpr != null) this.currentTextSpr.destroy();
        this.currentTextSpr = this.tool.build(testString, {
          fontSize: MathUtil.randomRange(10, 50),
          fill: 0xffffff,
        })
        this.addChild(this.currentTextSpr);
      }

    })
  }
}