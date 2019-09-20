
export class MathUtil {
  public static lerp = (a: number, b: number, t: number) => {
    return a + t * (b - a);
  }
  public static map = (x: number, fromMin: number, fromMax: number, toMin: number, toMax: number) => {
    return toMin + ((x - fromMin) / (fromMax - fromMin)) * (toMax - toMin);
  }
  public static randomRange = (minNum: number, maxNum: number) => {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
  }
}
