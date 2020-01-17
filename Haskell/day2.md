# Haskell: Variables

- 変数は値を格納するために、メモリの場所に名前をつけたもの
- 変数、および関数は小文字から始まらなければならない
- Haskellの変数はイミュータブル(不変=再代入不可)

以下のコードを書き:

```sample.hs
var1 = 10
var1 = 13.24
```

*sample.hs*ファイルをロードしようとすると、`multiple declarations of variable var1`というエラーがでる。


- Haskellの変数はimmutableなので、以下のようなコードも問題なく動作する

```sample.hs
y = x + 10
x = 10
```

`y = x + 10`で`x`が使われた後にxを定義している
今までの知見からすると驚きの動作

## Specifying type to a variable

```variable.hs
x::Int
x = 10
```

- `x::Int`
  この文は`x`の型がInt型と示している
- `x=10`
  この文は変数xに値10を割り当てる
  
- Haskellの変数は不変なので、再定義ができない。


例えば以下のような場合:

```variable.hs
x::Int
x = 10
x = 11
```

これはエラーになる。



