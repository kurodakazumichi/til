export class Vector3 
{
  x:number;
  y:number;
  z:number;

  constructor(x:number = 0, y:number = 0, z:number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  sum(a:Vector3) {
    return Vector3.add(this, a);
  }

  sub(a:Vector3) {
    return Vector3.sub(this, a);
  }

  times(num:number) {
    return Vector3.times(this, num);
  }

  toString() {
    return `(${this.x}, ${this.y}, ${this.z})`
  }

  get normalized() {
    return Vector3.normalize(this);
  }

  /** 加法 */
  static add(a:Vector3, b:Vector3) {
    return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  /** 減法 */
  static sub(a:Vector3, b:Vector3) {
    return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  /** 定数倍 */
  static times(a:Vector3, num:number) {
    return new Vector3(a.x * num, a.y * num, a.z * num);
  }

  /** 正規化 */
  static normalize(v:Vector3) {
    const length = Math.sqrt(v.x**2 + v.y**2 + v.z**2);

    // 0除算にならないようにする
    if (0.00001 < length) {
      return new Vector3(v.x / length, v.y / length, v.z / length);
    } else {
      return Vector3.zero;
    }
  }

  /** 内積 */
  static dot(a:Vector3,  b:Vector3) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  /** 外積 */
  static cross(a:Vector3, b:Vector3) {
    const x = a.y * b.z - a.z * b.y;
    const y = a.z * b.x - a.x * b.z;
    const z = a.x * b.y - a.y * b.x;
    return new Vector3(x, y, z);
  }

  /** ゼロベクトル */
  static get zero() {
    return new Vector3(0, 0, 0);
  }

  static get one() {
    return new Vector3(1, 1, 1);
  }

  static get up() {
    return new Vector3(0, 1, 0);
  }

  static get down() {
    return new Vector3(0, -1, 0);
  }
}
