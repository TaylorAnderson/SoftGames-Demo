import { Sprite, Graphics } from "pixi.js";

interface ButtonOptions {
  text: string,
  color: number,
  backColor: number,
  onToggled: (button: Button) => void
}
export class Button extends Sprite {

  private front: Sprite = new Sprite();
  private back: Graphics;
  private text: PIXI.Text;

  public toggled: boolean = false;
  constructor(private options: ButtonOptions) {
    super();
    this.text = new PIXI.Text(options.text, {
      fontSize: 24,
      fill: 0xFFFFFF,
    })
    let textPadding = 10;

    let frontBG = new Graphics()
      .beginFill(options.color)
      .drawRoundedRect(0, 0, 300, 50, 4)
      .endFill();
    this.front.addChild(frontBG);
    this.front.addChild(this.text);
    this.text.x = this.front.getBounds().width / 2 - this.text.getBounds().width / 2;
    this.text.y = this.front.getBounds().height / 2 - this.text.getBounds().height / 2;

    this.back = new Graphics()
      .beginFill(this.options.backColor)
      .drawRoundedRect(0, 0, frontBG.width, frontBG.height, 4)
      .endFill();

    this.back.y += 5;

    this.addChild(this.back);
    this.addChild(this.front)


    this.interactive = true;
    this.on("pointerdown", this.onDown);
  }
  onDown = () => {
    this.toggled = !this.toggled;
    this.front.y = this.toggled ? 5 : 0
    this.options.onToggled(this);
  }
}