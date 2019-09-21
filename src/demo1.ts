import TWEEN from '@tweenjs/tween.js';

import { MathUtil } from './util/MathUtil';
import { Sprite, Graphics } from "pixi.js";
export class Demo1 extends PIXI.Container {
  private cards: Array<Card> = [];
  private currentCardIndex: number = 0;
  private targets: Array<PIXI.Point> = [];

  private timer: number = 0;
  constructor() {
    super();

    let numCards = 50;
    let spacing = 2;

    for (let i = 0; i < numCards; i++) {
      let card = new Card();
      this.cards.push(card);
      card.y = i * spacing;
      card.x = 20;
      this.targets.push(new PIXI.Point(100, (numCards - 1) * 2 - i * 2));
      this.addChild(card);
    }
    PIXI.ticker.shared.add(this.update)
  }

  update = () => {
    this.children.sort((a, b) => {
      if (a.y == b.y) return 0;
      else if (a.y > b.y) return -1;
      else return 1;
    })

    //make sure we pause when we're finished OR we're not visible
    if (this.currentCardIndex < this.cards.length && this.visible) {
      this.timer += PIXI.ticker.shared.elapsedMS / 1000
      if (this.timer > 1) {
        this.cards[this.currentCardIndex].move(this.targets[this.currentCardIndex])
        this.currentCardIndex++;
        this.timer = 0;
      }
    }
  }
}

class Card extends Sprite {
  constructor() {
    super();
    let g = new Graphics()
      .beginFill(0xffffff)
      .lineStyle(1, 0)
      .drawRect(0, 0, 40, 50)
      .endFill();
    this.addChild(g);
  }
  public move = (target: PIXI.Point) => {
    new TWEEN.Tween(this).to({ x: target.x, y: target.y }, 2000).start();
  }
}