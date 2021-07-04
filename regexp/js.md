# 正規表現

jsにおける正規表現の使い方。



## 正規表現の作成

Jsで正規表現はオブジェクトとして扱われ、正規表現オブジェクトを作成する方法は以下の2通りがある。

```js
// 正規表現リテラル(スラッシュで囲む)
const reg = /ab+c/;
```

```js
// RegExpオブジェクトのコンストラクタを呼び出す
const reg = new RegExp('ab+c');
```



## 正規表現の使い方

### 一致する文字列の情報を取得する

```js
// 1文字以上のaが続く文字列
const reg = /a+/;

// 以下は同等
reg.exec("abc");  // 結果情報の配列 or null
"abc".match(reg); // 結果情報の配列 or null
```



#### RegExp.exec(text:string):array

文字列内で一致するものの検索所実行し、結果情報の配列を返します。一致するものがなければ`null`を返す。



#### String.match(reg:RegExp):array

キャプチャグループを含む、すべての一致するものを含む配列を返します。一致するものがない場合は `null` を返します。



### 一致する文字列があるかどうか調べる

```js
// 1文字以上のaが続く文字列
const reg = /a+/;

reg.test("abc"); // true
```



## 文字列のメソッドで正規表現を使う

### 正規表現に一致するすべての文字列をイテレータで返す。

```js
const reg = /a+/g;

const array = [..."abcabc".matchAll(reg)];

array; // 結果情報の配列
```



### 一致する文字列の位置を調べる

```js
// 1文字以上のaが続く文字列
const reg = /a+/;

"abc".search(reg); // 0
```



### 一致した文字列を置換する

```js
// 1文字以上のaが続く文字列
const reg = /a+/;

"abc".replace(reg, "z"); // zbc
"baaaac".replace(reg, "z"); // bzc
```



### 一致した全ての文字列を置換する

```js
// 1文字以上のaが続く文字列 (global flag必須)
const reg = /a+/g;

"abcabc".replaceAll(reg, "z"); // zbczbc
```



### 文字列分割する

```js
// 1文字以上のaが続く文字列
const reg = /a+/;

"abcabc".split(reg);
```



## 主な使い分け

あるパターンが文字列に存在するかどうかがわかればいいだけであれば、`test()`か`search()`を使い、より詳細な情報が欲しい場合は、`exec()`か`match()`を使う。

