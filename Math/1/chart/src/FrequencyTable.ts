//-----------------------------------------------------------------------------
// 度数分布表
//-----------------------------------------------------------------------------
export default class FrequencyTable 
{
  /**
   * 開始値
   */
  private start:number;

  /**
   * 階級幅
   */
  private width:number;

  /**
   * 階級
   */
  private ranks:number[];

  /**
   * 度数分布表の設定を決める
   * @param {number} start 開始値
   * @param {number} width 階級の幅
   */
  constructor(start:number, width:number) {
    this.start = start; // 開始値
    this.width = width; // 階級の幅
    this.ranks = [];    // 階級
  }

  /**
   * データをセットする
   * @param {number[]} datas データ配列
   */
  set(datas:number[]) 
  {
    // データの最大値を取得
    const max = datas.reduce((a, b) => Math.max(a, b));

    // 最大値を元に階級の数を計算
    const rankCount = this.calcRank(max);
    for(let i = 0; i <= rankCount; ++i) this.ranks[i] = 0;

    // 階級ごとの度数を計算
    datas.forEach((num) => { 
      if (num < this.start) return;
      this.ranks[this.calcRank(num)]++;
    });
  }  

  /**
   * 数値が所属する階級のindexを計算する
   * @param {number} num 
   * @returns 階級
   */
  calcRank(num:number) {
    if (num < this.start) {
      console.error(`${num}:out of range.`)
    }
    return Math.floor((num - this.start) / this.width);
  }


  /**
   * 階級の度数を取得
   * @param {number} index 階級のindex
   * @returns 度数
   */
  getFrequency(index:number) {
    return this.ranks[index];
  }

  /**
   * 階級値、階級の中央の値を取得
   * @param {number} index 階級のindex
   * @returns 階級値
   */
  getClassValue(index:number) {
    const { start, width } = this;

    const a = start + (width * index);
    const b = start + (width * (index+ 1));

    return (a + b) / 2;
  }

  /**
   * 階級の個数
   */
   get rankCount() {
    return this.ranks.length;
  }

  /**
   * 度数の合計
   */
  get total() {
    return this.ranks.reduce((sum, elm) => sum + elm);
  }

  /**
   * 最大度数
   */
  get max() 
  {
    return this.ranks.reduce((a, b) => Math.max(a, b));
  }  

  /**
   * 平均値
   * 各階級の階級値 * 度数 の合計を 度数合計で割ったもの
   */
  get avg() 
  {
    // 各階級の階級値 * 度数の和を求める
    let sum = 0;

    this.ranks.forEach((_, index) => {
      sum += this.getClassValue(index) * this.getFrequency(index);
    });

    // 度数合計で割る
    return sum / this.total;
  }

  // 最頻値:度数のもっとも多い階級の階級値
  get mode() 
  {
    // 度数のもっとも多い階級を調べる
    const { max } = this;

    // 最頻値配列
    return this.ranks.reduce((mode:number[], fre, index) => 
    {
      if (fre === max) mode.push(this.getClassValue(index));
      return mode;
    }, []);
  }

  // 中央値
  get median () 
  {
    const { total, rankCount } = this;

    const nums = [];

    // データ数が奇数の時の中央値の位置
    if (total % 2 !== 0) {
      nums.push((total + 1) / 2);
    } else {
      const n = total / 2;
      nums.push(n, n+1);
    }

    // 中央値が所属する階級の階級値の和
    let sum = 0;

    nums.forEach((num) => 
    {
      let count = 0;
      for(let i = 0; i < rankCount; ++i) {
        count += this.ranks[i];
        if (num <= count) {
          sum += this.getClassValue(i);
          break;
        }
      }      
    });

    return sum / nums.length;
  }

  show() {
    const { rankCount, start, width } = this;

    console.log("階級        | 度数")
    console.log("------------+-----")

    for(let i = 0; i < rankCount; ++i) {
      if (i === 0) {
        console.log(`${start}以上 ${start + width}未満 | ${this.getFrequency(i)}`);
      } else {
        console.log(`${start+width*i}～${this.start+width*(i+1)}     | ${this.getFrequency(i)}`);
      }
    }

    // 合計
    console.log(`計         : ${this.total}`);

    // その他
    console.log("------------------");
    console.log(`平均値=${this.avg}`);
    console.log(`最頻値=${this.mode}`);
    console.log(`中央値=${this.median}`);
  }
}