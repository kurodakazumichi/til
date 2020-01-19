# Haskell: const function

- Prelude library は 以下のような const関数を定義する

`const x _ = x`

- 二番目の引数がなんであろうと、const関数はつねに第一引数を返す。
- 以下のようなlength関数を実装できる。

```
Prelude> let length = sum.map(const 1)
```

ちょっとこれだけじゃ意味がわからないな

---
書籍が少し辛いので、こっちを見てみる
https://qiita.com/7shi/items/145f1234f8ec2af923ef
---

# 束縛
Haskellの変数は再代入できないので、代入ではなく**束縛**という用語を使う。

確かに不変なのに代入という言葉を使うのには違和感を感じていて
束縛と行った方がすっきりする。

(むしろ変数も不変なものしかない、というなら実質変数ではなくて定数なのでは...)
定数しか定義できませんと言われると、それはそれでなるほどってなる気もした

# トップレベル変数
要するにグローバル変数

```hs
a = 1
b = 2
c = a + b
main = do
  print c
```

特にキーワードもなく普通に書くだけ。

# ローカル変数
書き方が２つあるらしい

## where

```hs
main = do 
  print c
  where
    a = 1
    b = 2
    c = a + b
```

実際に使うところの**下**に書く方法が`where`を使う方法らしい

## let

```hs
main = do 
  let a = 1
      b = 2
      c = a + b
  print c
```

変数を定義してから使う方法は`let`
これは普通の手続き型と同じ感じなので違和感はない

```hs
main =
  let a = 1
      b = 2
      c = a + b in
  print c
```

`do`がない場合は`in`と言われても...
`do`がある事で複数行書ける
`do`がなくなると`let`と`print`の２文は描けないので`in`で繋ぐと1文になる感じかな

# 関数

- Haskellの関数定義はとても質素

## 以下でJSの関数定義とHaskellの関数定義を比較

- js:`function f(x) { return x + 1; }
- hs:`f x = x + 1`

## 関数の実行

- js:`f(1)`
- hs:`f 1`

- `print f 1`はエラーになる
- `print (f 1)`ならOK

関数実行に`()`がないので、 `()`がないと  
`f 1`が`print`に渡す引数なのか、それとも関数実行なのか区別できないためであろう

## 相違点

- Haskellでは関数定義時の`()`や`{}`や戻り値のための`return`がない
- 関数実行時も`関数名 引数`という形で`()`がない
- 慣れないと読みづらいが、簡潔な書き方と言える


# $
`$`から行末までが、カッコで囲まれたのと同じになる。

```hs
f x = x + 1

main = do 
  print (f 1)  -- ①
  print $ f 1  -- ②
  -- ①と②は同じもの
```

# 関数の演算子化

- 2つの引数をとる関数を**`**で囲むと演算子として仕様できる ← これ面白い

```hs
add x y = x + y
 
main = do
  print $ add 1 2
  print $ 1 `add` 2 -- 1 + 2 という感覚でかける
```

# 演算子の関数化

中置演算子を`()`で囲むと関数として使える

```hs
add x y = x + y
 
main = do
  print $ 1 + 2
  print $ (+) 1 2 -- +を関数として使える
```

# if then else

- １行で書く例

```hs
a = 1

main = do
    if a == 1 then print "1" else print "?"
```

- 複数行で書く場合はインデントする必要あり

```hs
a = 1

main = do
  if a == 1 
    then print "1" 
    else print "?"
```
    




