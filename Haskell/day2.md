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


# Haskell: Naming, coding conventions

- 関数と変数にはキャメルケースを使う
ex: employeeAge, placeOfBirth, stateOfProvince etc...

- 変数名や関数名に文字数の制限はないので、意味のある名前をつける。
ex:principle, rateOfInterest

- タブ文字は使ってはいけない,プログラムのロード時に警告がでます。

- 1行あたり最大80文字を維持する、このルールによってコードが読みやすくなる

- 関数、変数には常に型を指定する

```sample.hs
add::Int -> Int -> Int -> Int
add abc
  |(a > 0) = (a + b + c)
  |(b > 0) = (a + b - c)
  |otherwise = a * b * c
```

`add::Int->Int->Int->Int`

これは、add関数がInt型の引数を3つ受け取り、戻り値としてInt型を返すという意味になる。
型をつけることで、ドキュメントを強化できる。

- 関数名が完全な意味を持っていない、理解に必要な情報がある場合は、常にその関数にコメントをつける。
- 変数に関しても同様。

- 複雑な関数は小さなサブ関数に分割する(そうする事で複雑さを解決する)

- 型名は常に大文字から始まり、変数名は常に小文字で始まる。  
これは慣習ではなく、Haskellによって強制されるルールです。



