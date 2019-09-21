import { MathUtil } from './util/MathUtil';
import { Graphics } from 'pixi.js';
import data from "./assets/emitter.json"
import * as PIXI from "pixi.js"
import particles = require("pixi-particles");
export class Demo3 extends PIXI.Container {
  private emitter: particles.Emitter;
  constructor() {
    super();

    this.emitter = new particles.Emitter(this, [PIXI.Texture.from("assets/fire-sprite.png"), PIXI.Texture.from("assets/fire-sprite-2.png")], data);

    this.emitter.emit = true;

    PIXI.ticker.shared.add(() => {
      this.emitter.update(PIXI.ticker.shared.elapsedMS / 1000);
    })

  }
}