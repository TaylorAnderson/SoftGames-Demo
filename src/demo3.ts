import { MathUtil } from './util/MathUtil';
import { Graphics } from 'pixi.js';
import data from "./assets/emitter.json"
import * as PIXI from "pixi.js"
import particles = require("pixi-particles");
export class Demo3 extends PIXI.Container {
  /**
   *
   */

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


interface FireParticleConfig {
  startTex: PIXI.Texture,
  endTex: PIXI.Texture,
  minAngle: number,
  maxAngle: number,
  startColor: string,
  midColor: string,
  endColor: string,
  //in ms
  lifetime: number,
}

interface RGB {
  r?: number,
  g?: number,
  b?: number,
}
interface HSV {
  h?: number,
  s?: number,
  v?: number
}

/*class FireParticle extends PIXI.Sprite {

  private vel: PIXI.Point = new PIXI.Point();
  private lifeCounter = 0;
  private startColor: RGB = {}
  private endColor: RGB = {}
  private midColor: RGB = {}
  private currentColor: RGB = {};
  constructor(public config: FireParticleConfig) {
    super();

    let angle = MathUtil.randomRange(this.config.minAngle, this.config.maxAngle) * PIXI.DEG_TO_RAD;
    this.vel.x = Math.cos(angle) * 5;
    this.vel.y = Math.sin(angle) * 5;

    this.rotation = angle;

    this.texture = config.startTex;

    this.startColor = this.hexToRGB(this.config.startColor)
    this.midColor = this.hexToRGB(this.config.midColor);
    this.endColor = this.hexToRGB(this.config.endColor);
    this.currentColor = this.startColor;
    this.tint = this.RGBToHex(this.startColor);
    PIXI.ticker.shared.add(this.update);
  }

  update = () => {
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.alpha -= 0.05;
    this.scale.x += 0.05;
    this.scale.y += 0.05;
    if (this.lifeCounter > this.config.lifetime) {
      this.destroy();
      PIXI.ticker.shared.remove(this.update);
    }
    let destColor = this.endColor;
    console.log(this.lifeCounter / this.config.lifetime);
    this.currentColor.r = MathUtil.lerp(this.currentColor.r, destColor.r, this.lifeCounter / this.config.lifetime);
    this.currentColor.g = MathUtil.lerp(this.currentColor.g, destColor.g, this.lifeCounter / this.config.lifetime);
    this.currentColor.b = MathUtil.lerp(this.currentColor.b, destColor.b, this.lifeCounter / this.config.lifetime);
    this.tint = this.RGBToHex(this.currentColor);

    this.lifeCounter += PIXI.ticker.shared.elapsedMS;
    if (this.lifeCounter > this.config.lifetime / 2) {
      this.texture = this.config.endTex;
    }
  }

  hexToRGB = (color: string): RGB => {
    let output: RGB = {}
    color = color.substr(2);
    output.r = parseInt(color.substr(0, 2), 16);//Red
    output.g = parseInt(color.substr(2, 2), 16);//Green
    output.b = parseInt(color.substr(4, 2), 16);//Blue
    return output;
  }
  RGBToHex = (color: RGB) => {
    return color.r << 16 | color.g << 8 | color.b;
  }
}*/