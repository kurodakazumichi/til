```js
// 次の数列の和を求める関数を定義してください。
// 1 + 3r + 5r^2 ... + (2n-1)r^{n-1}
//
// [考え方]
// S = 1 + 3r + 5r^2 ... + (2n-1)r^{n-1}とおきS-rSを考えると
// 
//   S  = 1 + 3r + 5r^2 ... + (2n-1)r^{n-1}
// - rS =   + r  + 3r^2 + 5r^2 ... + (2n-1)r^n
// --------------------------------------------
// S-rS = 1 + 2r + 2r^2 + 2r^3 ... + 2r^{n-1} - (2n-1)r^n
//            -------------------------------
// 下線部に着目すると初項=2r、公比=r、項数=n-1の等比数列になっているのでこの部分は
// 等比数列の和の公式により(r≠1)
// 2r(r^{n-1} - 1)/(r-1) で求める事ができる。
//
// S-rSの式を整理すると
// S-rS = 1 + 2r(r^{n-1} - 1})/(r-1) - (2n-1)r^n 
// Sについて解くと
// S = (1 + r-(2n+1)r^n + (2n-1)r^{n+1}) / (1-r)^2
//
// またr=1の場合、問題の数列は
// 1 + 3 + 5 + ... + 2(n-1)の等差数列になる
// 初項1、公差2の等差数列の和(S)は、公式により以下の式で求められる
// S = n(1 + 1 + (n-1)*2)/2
//   = n^2
function sum(r, n) 
{
  // rが1の場合
  if (r === 1) return n * n;
    
  // rが1以外の場合、以下の式で求められるが
  // S = (1 + r-(2n+1)r^n + (2n-1)r^{n+1}) / (1-r)^2
  // 式が長いので以下のように段階的に処理する
  // S = 1 + r - A + B / C
  const A = (2*n+1) * Math.pow(r, n);
  const B = (2*n-1) * Math.pow(r, n+1);
  const C = Math.pow(1-r, 2);
  const S = (1 + r - A + B) / C;
    
  return S;
}
```

