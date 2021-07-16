export default class Data 
{
  /**
   * データ配列
   */
  private datas:number[];  
  
  /**
   * コンストラクタ
   * @param datas データ配列
   */
  constructor(datas:number[] = []) {
    this.datas = datas;
    this.sort();
  }

  /**
   * データの大きさ
   */
  get magnitude() {
    return this.datas.length;
  }

  /**
   * 合計値
   */
  get total() {
    return this.datas.reduce((sum, data) => sum + data, 0);
  }

  /**
   * 最小値
   */
  get min() {
    return this.datas[0];
  }

  /**
   * 最大値
   */
  get max() {
    return this.datas[this.datas.length - 1];
  }

  /**
   * 平均値
   */
  get avg() 
  {
    const { total, magnitude } = this;

    // データの大きさが0の時は未定義
    if (magnitude <= 0) return undefined;

    return total / magnitude;
  }

  /**
   * 中央値
   */
  get median() {
    const { datas, magnitude } = this;

    // データの大きさが奇数のときは真ん中の値を返す
    if (magnitude % 2 !== 0) {
      const idx = Math.floor(magnitude / 2);
      return datas[idx];
    }

    // データが偶数の時は中央の2つの値の平均を中央値とする
    else {
      const idx1 = (magnitude / 2) - 1;
      const idx2 = idx1 + 1;
      return (datas[idx1] + datas[idx2]) / 2;
    }
  }

  /**
   * 最頻値
   */
  get mode() 
  {
    const { datas, magnitude } = this;

    const countup:number[][] = [];

    for(let count = 0, i = 0; i < magnitude - 1; ++i) {

      const d1 = datas[i];
      const d2 = datas[i+1];

      // 出現数をカウント
      count = (d1 !== d2)? 0 : count + 1;

      if (countup[count] === undefined) {
        countup[count] = [d1];
      } else {
        countup[count].push(d1);
      }
    }

    // 全てが1度しか登場しないのであれば最頻値なし
    if (countup.length === 1) return [];

    // 配列の最後の要素が最頻値になる
    return countup[countup.length - 1];
  }

  /**
   * 昇順でソート
   */
  private sort() {
    this.datas.sort((a, b) => a - b);
  }

  /**
   * 表示
   */
  show() {
    console.log(`data:${this.datas}`);
    console.log(`大きさ:${this.magnitude}`);
    console.log(`最小値:${this.min}`);
    console.log(`最大値:${this.max}`);
    console.log(`合計値:${this.total}`);
    console.log(`平均値:${this.avg}`);
    console.log(`最頻値:${this.mode}`);
    console.log(`中央値:${this.median}`);
  }
}