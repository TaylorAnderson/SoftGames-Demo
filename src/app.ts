import { Button } from './button';
import { Demo3 } from './demo3';
import { Demo1 } from "demo1";
import TWEEN from "@tweenjs/tween.js"
import { Demo2 } from 'demo2';
import { Sprite } from 'pixi.js';
class Game {
  private app: PIXI.Application;
  private demo1: Demo1;
  private demo2: Demo2
  private demo3: Demo3;

  private demos: Array<PIXI.Container> = [];
  private buttons: Array<Button> = [];

  private fpsText: PIXI.Text = new PIXI.Text("", { fill: 0xFFFFFF })
  private headerText: PIXI.Text = new PIXI.Text("SoftGames Demo", { fontSize: 48, fill: 0xffffff })
  constructor() {

    this.app = new PIXI.Application({
      backgroundColor: 0x0f0912,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    let element = document.getElementById("game");
    element.appendChild(this.app.view);

    this.headerText.x = this.app.renderer.width / 2 - this.headerText.getBounds().width / 2;
    this.headerText.y = 100;
    this.app.stage.addChild(this.headerText);

    //#region setting up demos
    this.demo1 = new Demo1();
    this.demo2 = new Demo2();
    this.demo3 = new Demo3();

    this.demo1.x = this.app.renderer.width / 2 - this.demo1.getBounds().width / 2;
    this.demo2.x = 100 // doesnt have a defined width
    this.demo3.x = this.app.renderer.width / 2 - this.demo3.getBounds().width / 2;

    this.demo1.y = this.app.renderer.height - 200
    this.demo2.y = this.app.renderer.height - 150
    this.demo3.y = this.app.renderer.height - 150

    this.demo1.visible = this.demo2.visible = this.demo3.visible = false;

    this.app.stage.addChild(this.demo1)
    this.app.stage.addChild(this.demo2)
    this.app.stage.addChild(this.demo3)

    this.demos = [this.demo1, this.demo2, this.demo3]
    //#endregion

    //#region setting up buttons
    this.buttons = [
      new Button({
        text: "Stacking Demo",
        color: 0xe23d69,
        backColor: 0x8a3622,
        onToggled: this.onButtonToggled
      }),
      new Button({
        text: "Text Demo",
        color: 0x60c83d,
        backColor: 0x0c7e45,
        onToggled: this.onButtonToggled
      }),
      new Button({
        text: "Particles Demo",
        color: 0x4c81fb,
        backColor: 0x2234d1,
        onToggled: this.onButtonToggled
      })
    ]

    for (let i = 0; i < this.buttons.length; i++) {
      const button = this.buttons[i];
      this.app.stage.addChild(button);
      button.x = this.app.renderer.width / 2 - button.getBounds().width / 2;
      button.y = this.app.renderer.height / 2 + i * (button.getBounds().height + 10);
    }

    //#endregion

    this.app.stage.addChild(this.fpsText);
    this.fpsText.x = this.app.renderer.width - 50;
    this.fpsText.y = 20;

    PIXI.ticker.shared.add(() => {
      this.fpsText.text = Math.round(PIXI.ticker.shared.FPS).toString();
      TWEEN.update();
    })
  }

  onButtonToggled = (button: Button) => {
    this.demos[this.buttons.indexOf(button)].visible = button.toggled
  }
}
new Game();

