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


