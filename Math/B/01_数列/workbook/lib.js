/**
 * 総和関数Σを定義
 * Σ{k=s}{e} f(n)
 * @param {*} s 開始 
 * @param {*} e 終了
 * @param {*} f 関数 f(n:number) => number
 * @returns 
 */
exports.sigma = (s, e, f) => {
  let sum = 0;
  for(let n = s; n <= e; ++n) {
    sum += f(n);
  }
  return sum;
}