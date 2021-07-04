# 言明

## 境界型の原名

### 先頭にマッチ

```js
const reg = /^A/;

"an A".match(reg);
"An a".match(reg);
```



## その他

### 先読み言明

**xの後にyが続くxを探す**

```js
// xにyが続く場合のみxにマッチする。
// yの部分はマッチの結果には含まれない。
const reg = /x(?=y)/

"abcdxyz".match(reg); // xyにマッチ
```



**Jackの後にSpratか、Frostが続くJackを探す**

```js
const reg = /Jack(?=Sprat|Frost)/;

"JackSprat".match(reg);
"JackFrost".match(reg);
"JackZack".match(reg);
```



### 否定先読み言明

**xにyが続かないxを探す**

```js
const reg = /x(?!y)/;

" xyz ".match(reg);
" xzz ".match(reg);
```



**後ろに`.`が続かない数値を探す**

`3.141`の`3`は後ろに`.`があるのでマッチせず、`141`にマッチする正規表現

```js
const reg = /\d+(?!\.)/;

"3.141".match(reg);
"3141".match(reg);
```



