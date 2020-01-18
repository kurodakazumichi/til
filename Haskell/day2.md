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


# Haskell: Define variable at GHCi prompt

- `let`キーワードを使う事でghciプロンプト上で変数を定義できる。

```bash
Prelude> let radius=10
```

# Haskell: Specifying type to a variable

変数に型を指定することもできる

> **Syntax**  
> 変数名::型

```hs:sample.hs
name::String
pin::Integer
name = "Krishna"
pin = 123456
```

```bash
*Main> name
"Krishna"
*Main> pin
123456

*Main> t: name # :tは変数の型が見れる
name::String

*Main> :t pin
pin::Integer
```

以下のように型定義と値を１行にまとめることも可能

```hs:sample.hs
name = "Krishna"::String
pin = 123456::Integer
```

もし全部の変数が同じ型だったら、その場合はそれらを同じ行でまとめて定義できる。

```hs:sample.hs
a, b, c, d :: Integer
e, f :: String

a = 10
b = 11
c = 12
d = 13

e = "ptr"
f = "nayan"
```

- GHCiの拡張昨日であるScopedTypeVariablesを有効にすると、異なる型の変数であっても同じ行にまとめて書くこともできる。

```sample.hs
{-# LANGUAGE ScopedTypeVariables #-}

(empId::Integer, name::String, salary::Double) = (10, "Sudhir", 5.7)
```

# Haskell: Comments

- コメントはコードを綺麗に文書かするために使う。
- Haskellはコメントについて２種類の書き方がある。

## 1行コメント

1行コメントは `--` から始まり、行の最後までがコメントになる。

## 複数行コメント

複数行コメントは `{- ... -}`の間に記述できる。



# Haskell: Functions

- 関数は入力を受け取り、その入力を処理してアウトプットを返す。
- 関数を使う事でコードを再利用できる。
- 変数と関数の名前は必ず小文字で始める。

ex:
```
square(x) = x * x
cube(x) = x * x * x

## 関数の定義方法

`関数名 引数1 引数2 ... 引数n = 関数本体`

関数の定義方法は以下でもOKっぽい

- cube(x) = x * x * x
- cube x = x * x * x

関数の呼び出しは、関数名に引数をつける事で実行される。

`cube x`

Haskellの関数は`*,+,-`のような演算子よりも優先される。

```hs
addition x y = x + y


# 全関数と部分関数

- どのような引数を渡されても問題なく実行される関数と全関数(total function)
- 引数によっては例外を返すこともある関数を部分関数(partical function)

コードを書く時は部分関数を書かないようにしましょう。


# カリー化

- カリー化は複数の引数を受け取る関数を単一の引数のみを受け取る関数に変換する手法
- イギリスの数学者、かつ論理学者のHaskell Curryにちなんで名付けられた。


```
*Main> let sum a b = (a + b)
*Main> let incBy1 = sum 1

*Main> incBy1 10
11
```

## なぜこうなるか？
`incBy1 10` -> `sum 1 10` = `11`
`incBy1`が`sum 1`に置き換わる。

これは`#define マクロ`みたいな動きだ。

# 高階関数

- 引数に関数をとる、結果として関数をかえす関数、またはその両方の関数のことを高階関数
- jsのmapとかreduceとかそういうもの

