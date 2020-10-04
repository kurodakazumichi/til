type num4 = [
  number, number,
  number, number,
];

type num9 = [
  number, number, number,
  number, number, number,
  number, number, number,
];

export class Matrix3 {

  // 行列内の値
  v:num9;

  // コンストラクタ
  constructor(v:num9) {
    this.v = v.slice() as num9;
  }

  // 平行移動
  translate(tx:number, ty:number) {
    return Matrix3.multiply(this, Matrix3.translation(tx, ty));
  }

  // 回転
  rotate(radian:number) {
    return Matrix3.multiply(this, Matrix3.rotation(radian));
  }

  // 拡大縮小
  scale(sx:number, sy:number) {
    return Matrix3.multiply(this, Matrix3.scaling(sx, sy));
  }

  // かけ算
  multiply(m:Matrix3) {
    return Matrix3.multiply(this, m);
  }

  /** 行列式 */
  get determinant() {
    return Matrix3.determinant(this.v);
  }

  /** 転置 */
  get trans() {
    return Matrix3.trans(this.v);
  }

  toString() {
    const { v } = this;

    return `[
  ${v[0]}, ${v[1]}, ${v[2]},
  ${v[3]}, ${v[4]}, ${v[5]},
  ${v[6]}, ${v[7]}, ${v[8]},
]`;
  }

  /** 単位行列 */
  static get identity() {
    return new Matrix3([
      1, 0, 0,
      0, 1, 0,
      0, 0, 1,
    ]);
  }

  /** ゼロ行列 */
  static get zero() {
    return new Matrix3([
      0, 0, 0,
      0, 0, 0,
      0, 0, 0,
    ]);
  }

  /** 平行移動行列 */
  static translation(tx:number, ty:number) {
    return new Matrix3([
      1, 0, 0,
      0, 1, 0,
      tx, ty, 1
    ]);
  }

  /** 回転行列 */
  static rotation(radian:number) {
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    return new Matrix3([
      c, -s, 0,
      s,  c, 0,
      0,  0, 1,
    ]);
  }

  /** 拡大縮小行列 */
  static scaling(sx:number, sy:number) {
    return new Matrix3([
      sx,  0, 0,
      0 , sy, 0,
      0 ,  0, 1,
    ]);
  }

  /** 行列同士のかけ算 */
  static multiply(a:Matrix3, b:Matrix3) {
    const m = Matrix3.zero;

    for(let r = 0; r < 3; ++r) {
      for(let c = 0; c < 3; ++c) {
        for(let n = 0; n < 3; ++n) {
          m.v[r*3+c] += a.v[r*3+n] * b.v[n*3+c];
        }
      }
    }

    return m;
  }

  /** 射影行列 */
  static projection(width:number, height:number) {
    const x = 1/width;
    const y = 1/height;

    return new Matrix3([
      x, 0, 0,
      0, y, 0,
      0, 0, 1,
    ])
  }

  /** 3x3行列の行列式 */
  static determinant(m:num9) {
    const [
      m0, m1, m2,
      m3, m4, m5,
      m6, m7, m8,
    ] = m;

    // サラスの公式により算出
    return (m0 * m4 * m8 + m1 * m5 * m6 + m2 * m3 * m7)
      - (m2 * m4 * m6 + m5 * m7 * m0 + m8 * m1 * m3);
  }

  static trans(m:num9) {
    return new Matrix3([
      m[0], m[3], m[6],
      m[1], m[4], m[7],
      m[2], m[5], m[8]
    ]);
  }

  /**
   * 余因子
   * @param r 行(1~3)
   * @param c 列(1~3)
   * @param m 小行列
   */
  static cofactor(r:1|2|3, c:1|2|3, m:num4) {
    const a = (-1)**(r+c);
    const d = m[0] * m[3] - m[1] * m[2]
    return a * d;
  }

}
