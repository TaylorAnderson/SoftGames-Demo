import { Text, Sprite } from "pixi.js";

interface ImageConfig {
  key: string,
  path: string,
}


export class TextTool {
  private loader: PIXI.loaders.Loader;
  private images: Map<string, string> = new Map<string, string>();
  private text: string;

  /**
   * A tool for building text with inline images.  Make sure to wait for the images to load before building anything using the onLoad callback.
   * @param imageConfigs The images you want to use.
   * @param onLoad Callback for when the images have loade
   */
  constructor(imageConfigs: Array<ImageConfig>, onLoad: () => void) {
    this.loader = PIXI.loaders.shared;
    for (let i = 0; i < imageConfigs.length; i++) {
      this.images[imageConfigs[i].key] = imageConfigs[i].path;
      this.loader.add(imageConfigs[i].path);
    }
    this.loader.load(onLoad)
  }
  build = (str: string, style: PIXI.TextStyleOptions) => {
    //to import an image, put the path inside of curly brackets.  ex: "This is an image: {assets/image.png} and this is more text"
    let arr: Array<PIXI.Sprite> = [];
    let currentString = "";
    let insidePath = false;
    for (let i = 0; i < str.length; i++) {
      let char = str.charAt(i);
      if (char == "{") {
        arr.push(new PIXI.Text(currentString, style));
        currentString = "";
        let path = this.images[str.substring(i + 1, str.indexOf("}", i))];
        arr.push(new Sprite(this.loader.resources[path].texture));
        insidePath = true;
      }
      if (char == "}") {
        insidePath = false;
      }
      else if (!insidePath) {
        currentString += char;
      }
    }
    if (currentString.length > 0) {
      arr.push(new PIXI.Text(currentString, style))
    }
    let resultSpr = new Sprite();

    let currentX = 0;
    arr.forEach(sprite => {
      sprite.x = currentX;
      sprite.y = -sprite.getBounds().height / 2;
      currentX += sprite.getBounds().width;
      resultSpr.addChild(sprite);
    });
    return resultSpr;
  }
}