import { Matrix3 } from "./Matrix3";
import { Vector3 } from "./Vector3";

type num9 = [
  number, number, number,
  number, number, number,
  number, number, number,
];

type num16 = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
];

export class Matrix4 {

  // 行列内の値
  v:num16;

  // コンストラクタ
  constructor(v:num16) {
    this.v = v.slice() as num16;
  }

  // 平行移動
  translate(tx:number, ty:number, tz:number) {
    return Matrix4.multiply(this, Matrix4.translation(tx, ty, tz));
  }

  // 回転(x, y, z)
  xRotate(radian:number) {
    return Matrix4.multiply(this, Matrix4.xRotation(radian));
  }
  yRotate(radian:number)  {
    return Matrix4.multiply(this, Matrix4.yRotation(radian));
  }
  zRotate(radian:number) {
    return Matrix4.multiply(this, Matrix4.zRotation(radian));
  }

  // 拡大縮小
  scale(sx:number, sy:number, sz:number) {
    return Matrix4.multiply(this, Matrix4.scaling(sx, sy, sz));
  }

  // かけ算
  multiply(m:Matrix4) {
    return Matrix4.multiply(this, m);
  }

  // 逆行列
  get inverse (){
    return Matrix4.inverse(this);
  }

  /** 行列式 */
  get determinant() {
    return Matrix4.determinant(this.v);
  }

  /** 転置 */
  get trans() {
    return Matrix4.trans(this.v);
  }

  toString() {
    const { v } = this;

    return `[
  ${v[0]}, ${v[1]}, ${v[2]}, ${v[3]}
  ${v[4]}, ${v[5]}, ${v[6]}, ${v[7]}
  ${v[8]}, ${v[9]}, ${v[10]}, ${v[11]}
  ${v[12]}, ${v[13]}, ${v[14]}, ${v[15]}
]`;
  }

  /** 単位行列 */
  static get identity() {
    return new Matrix4([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
  }

  /** ゼロ行列 */
  static get zero() {
    return new Matrix4([
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
    ]);
  }

  /** 平行移動行列 */
  static translation(tx:number, ty:number, tz:number) {
    return new Matrix4([
       1,  0,  0, 0,
       0,  1,  0, 0,
       0,  0,  1, 0,
      tx, ty, tz, 1,
    ]);
  }

  /** x軸回転 */
  static xRotation(radian:number) {
    const c = Math.cos(radian);
    const s = Math.sin(radian);

    return new Matrix4([
      1,  0, 0, 0,
      0,  c, s, 0,
      0, -s, c, 0,
      0,  0, 0, 1,
    ])
  }

  /** y軸回転 */
  static yRotation(radian:number) {
    const c = Math.cos(radian);
    const s = Math.sin(radian);

    return new Matrix4([
      c,  0, -s, 0,
      0,  1,  0, 0,
      s,  0,  c, 0,
      0,  0,  0, 1,
    ])
  }

  /** z軸回転 */
  static zRotation(radian:number) {
    const c = Math.cos(radian);
    const s = Math.sin(radian);

    return new Matrix4([
      c, -s,  0, 0,
      s,  c,  0, 0,
      0,  0,  1, 0,
      0,  0,  0, 1,
    ])
  }

  /** 拡大縮小行列 */
  static scaling(sx:number, sy:number, sz:number) {
    return new Matrix4([
      sx,  0,  0, 0,
       0, sy,  0, 0,
       0,  0, sz, 0,
       0,  0,  0, 1,
    ]);
  }

  /** 行列同士のかけ算 */
  static multiply(a:Matrix4, b:Matrix4) {
    const m = Matrix4.zero;

    for(let r = 0; r < 4; ++r) {
      for(let c = 0; c < 4; ++c) {
        for(let n = 0; n < 4; ++n) {
          m.v[r*4+c] += a.v[r*4+n] * b.v[n*4+c];
        }
      }
    }

    return m;
  }

  /** 正投影 */
  static orthographic(left:number, right:number, top:number, bottom:number, near:number, far:number){
    const w = right - left;
    const h = bottom - top;
    const d = far - near;

    return new Matrix4([
      2/w,   0,   0, 0,
        0, 2/h,   0, 0,
        0,   0, 2/d, 0,
        0,   0,   0, 1,
    ])
  }

  /** 透視投影 */
  static perspective(fovY:number, aspect:number, near:number, far:number) {
    // 1/tanθだとtanθが0になった場合に0除算が発生する
    // 1/tanθ = tan(90°-θ)なのでこの計算式にすると0除算が発生しない。
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fovY);
    const rangeInv = 1.0 / (far - near);

    return new Matrix4([
      f/aspect, 0,                          0,  0,
      0,        f,                          0,  0,
      0,        0,    (far + near) * rangeInv,  1,
      0,        0,  -2* near * far * rangeInv,  0,
    ]);
  }

  /** 4x4行列の行列式(余因子展開で求める) */
  static determinant(m:num16) {
    const [ 
       m0,  m1,  m2, m3,
       m4,  m5,  m6, m7,
       m8,  m9, m10, m11,
      m12, m13, m14, m15,
    ] = m;

    const t1 = m0 * Matrix3.determinant([
       m5,  m6,  m7,
       m9, m10, m11,
      m13, m14, m15,
    ]);
    const t2 = -m1 * Matrix3.determinant([
       m4,  m6,  m7,
       m8, m10, m11,
      m12, m14, m15,
    ])
    const t3 = m2 * Matrix3.determinant([
       m4,  m5,  m7,
       m8,  m9, m11,
      m12, m13, m15,
    ])
    const t4 = -m3 * Matrix3.determinant([
       m4,  m5,  m6,
       m8,  m9, m10,
      m12, m13, m14,
    ])

    return t1 + t2 + t3 + t4;
  }

  static trans(m:num16) {
    return new Matrix4([
      m[0], m[4],  m[8], m[12],
      m[1], m[5],  m[9], m[13],
      m[2], m[6], m[10], m[14],
      m[3], m[7], m[11], m[15],
    ])
  }

  /** 逆行列を求める */
  static inverse(m:Matrix4) {
    const [ 
      m0,  m1,  m2,  m3,
      m4,  m5,  m6,  m7,
      m8,  m9, m10, m11,
     m12, m13, m14, m15,
   ] = m.v;

   // 1 / 行列式
   const d = 1.0 / Matrix4.determinant(m.v);

   // 各成分の余因子に上記をかけた値を計算
   const c11 = d * Matrix4.cofactor(1, 1, [m5, m6, m7, m9, m10, m11, m13, m14, m15]);
   const c12 = d * Matrix4.cofactor(1, 2, [m4, m6, m7, m8, m10, m11, m12, m14, m15]);
   const c13 = d * Matrix4.cofactor(1, 3, [m4, m5, m7, m8,  m9, m11, m12, m13, m15]);
   const c14 = d * Matrix4.cofactor(1, 4, [m4, m5, m6, m8,  m9, m10, m12, m13, m14]);
   const c21 = d * Matrix4.cofactor(2, 1, [m1, m2, m3, m9, m10, m11, m13, m14, m15]);
   const c22 = d * Matrix4.cofactor(2, 2, [m0, m2, m3, m8, m10, m11, m12, m14, m15]);
   const c23 = d * Matrix4.cofactor(2, 3, [m0, m1, m3, m8,  m9, m11, m12, m13, m15]);
   const c24 = d * Matrix4.cofactor(2, 4, [m0, m1, m2, m8,  m9, m10, m12, m13, m14]);
   const c31 = d * Matrix4.cofactor(3, 1, [m1, m2, m3, m5,  m6,  m7, m13, m14, m15]);
   const c32 = d * Matrix4.cofactor(3, 2, [m0, m2, m3, m4,  m6,  m7, m12, m14, m15]);
   const c33 = d * Matrix4.cofactor(3, 3, [m0, m1, m3, m4,  m5,  m7, m12, m13, m15]);
   const c34 = d * Matrix4.cofactor(3, 4, [m0, m1, m2, m4,  m5,  m6, m12, m13, m14]);
   const c41 = d * Matrix4.cofactor(4, 1, [m1, m2, m3, m5,  m6,  m7,  m9, m10, m11]);
   const c42 = d * Matrix4.cofactor(4, 2, [m0, m2, m3, m4,  m6,  m7,  m8, m10, m11]);
   const c43 = d * Matrix4.cofactor(4, 3, [m0, m1, m3, m4,  m5,  m7,  m8,  m9, m11]);
   const c44 = d * Matrix4.cofactor(4, 4, [m0, m1, m2, m4,  m5,  m6,  m8,  m9, m10]);

   // 余因子行列の転置 = 逆行列
   return Matrix4.trans([
     c11, c12, c13, c14,
     c21, c22, c23, c24,
     c31, c32, c33, c34,
     c41, c42, c43, c44,
   ]);
  }

  /** 逆行列(参考にした計算式) */
  static inverse2(mat:Matrix4) {
      const m = mat.v;
      var m00 = m[0 * 4 + 0];
      var m01 = m[0 * 4 + 1];
      var m02 = m[0 * 4 + 2];
      var m03 = m[0 * 4 + 3];
      var m10 = m[1 * 4 + 0];
      var m11 = m[1 * 4 + 1];
      var m12 = m[1 * 4 + 2];
      var m13 = m[1 * 4 + 3];
      var m20 = m[2 * 4 + 0];
      var m21 = m[2 * 4 + 1];
      var m22 = m[2 * 4 + 2];
      var m23 = m[2 * 4 + 3];
      var m30 = m[3 * 4 + 0];
      var m31 = m[3 * 4 + 1];
      var m32 = m[3 * 4 + 2];
      var m33 = m[3 * 4 + 3];
      var tmp_0  = m22 * m33;
      var tmp_1  = m32 * m23;
      var tmp_2  = m12 * m33;
      var tmp_3  = m32 * m13;
      var tmp_4  = m12 * m23;
      var tmp_5  = m22 * m13;
      var tmp_6  = m02 * m33;
      var tmp_7  = m32 * m03;
      var tmp_8  = m02 * m23;
      var tmp_9  = m22 * m03;
      var tmp_10 = m02 * m13;
      var tmp_11 = m12 * m03;
      var tmp_12 = m20 * m31;
      var tmp_13 = m30 * m21;
      var tmp_14 = m10 * m31;
      var tmp_15 = m30 * m11;
      var tmp_16 = m10 * m21;
      var tmp_17 = m20 * m11;
      var tmp_18 = m00 * m31;
      var tmp_19 = m30 * m01;
      var tmp_20 = m00 * m21;
      var tmp_21 = m20 * m01;
      var tmp_22 = m00 * m11;
      var tmp_23 = m10 * m01;
  
      var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
          (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
      var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
          (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
      var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
          (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
      var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
          (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
  
      var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

      return new Matrix4([
        d * t0,
        d * t1,
        d * t2,
        d * t3,
        d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
              (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
        d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
              (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
        d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
              (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
        d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
              (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
        d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
              (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
        d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
              (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
        d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
              (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
        d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
              (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
        d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
              (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
        d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
              (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
        d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
              (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
        d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
              (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
      ]);
    
  }

  /**
   * 余因子
   * @param r 行(1~4)
   * @param c 列(1~4)
   * @param m 小行列
   */
  static cofactor(r:1|2|3|4, c:1|2|3|4, m:num9) {
    const a = (-1)**(r+c);
    const d = Matrix3.determinant(m);
    return a * d;
  }

  static lookAt(position:Vector3, target:Vector3, up:Vector3) {
    const z = Vector3.sub(target, position).normalized;
    const x = Vector3.cross(up, z);
    const y = Vector3.cross(z, x);
    return new Matrix4([
      x.x, x.y, x.z, 0,
      y.x, y.y, y.z, 0,
      z.x, z.y, z.z, 0,
      position.x, position.y, position.z, 1,
    ])
  }
}

