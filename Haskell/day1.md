# Haskellの環境構築

https://qiita.com/Nekonecode/items/d0b7ebac278b4c1cd873
Qiitaに備忘録を作成。

# イントロダクション

## `ghci`コマンドを使う事で、インタラクティブモードでHaskellを学習できる。

> GHCはGlasgow Haskell Compilerの略

> GHCiの**i**はinteractiveの略

```bash
#書籍ではghciコマンドとあるが、自分の環境だと以下のコマンドでREPLを起動する
$ stack ghci
```

stackがなんなのかはわかっていないが、おそらく時代の流れ的に
こっちのが便利だよと洗練されていった結果の産物と思っておく。

## `stack ghci`をしたあとの画面

```bash
Prelude>
```

REPLを起動するとデフォルトで`Prelude>`と表示されて入力待ちの状態になる。

`Preludue>`の見た目を変更する場合は`:set prompt "xxxxx"を使う。

```bash
Prelude>:set prompt "hoge>"

hoge>
```

という具合になる。

## 負の数(-がつく数)は常にカッコで囲む

```bash
Prelude>5 * -3 # これはエラー

Prelude>5 * (-3) # これはOK
-15
```

## オペレーター(演算子)はプレフィックス形式でも使える。

```bash
# 以下の２つは同じ動きをする
Prelude>10 + 5
Prelude>(+) 10 5
```

プレフィックス形式でオペレーターを使う場合はカッコで囲む。


# Hello World program using ghci.

Step1:以下のファイルを作成する。

```hello.hs
p = 100000
r = 1.10
t = 5

interest = p*t*r*0.01
```

Step2:*hello.hs*のあるディレクトリに移動する。

Step3:`ghci`コマンドを起動し、以下のコマンドを実行する。

```bash
Prelude>:load hello.hs # hello.hsをロード
Prelude>interest

5500.0
```

- `:load`コマンドはHaskellファイルをロードするために使う。
- `:load`は省略して`:l`と書く事ができる。(ex`:l hello.hs`)

- ファイルをロードすると、プロンプト上の`Prelude>`が`*Main>`に変わる。
- プロンプト上で*hello.hs*の中で定義された変数を使用できるようになる。

### なぜ`Prelude>`から`*Main>`に変わるのか
GHCiの中にファイルを読み込んだ時、ファイルにモジュール定義が含まれていると、Preludeはモジュール名に変更されます。
モジュールの名前がない場合は、**Mainモジュール**と呼ばれます。
※モジュールって何？って話はまだ先

# Haskellファイルのリロード方法

- Haskellファイルを変更したら、リロードする必要がある。
- リロードは`:reload`、または`:r`コマンドを使う。


# Haskell:Hello WOrld program using ghc command

- ghc compilerはGHCディストリビューションの一部として提供される。
- `ghc`コマンドはHaskellファイルを受け取り、ネイティブコードを生成する。

## コンパイル

1. 以下のファイルを作成する
```hs:hello_world.hs
main = putStrLn("hello, world");
```

2. コンパイルする

```bash
stack ghc hello_world.hs
```

3. 以下、３つのファイルが出来上がる

- hello_world
- hello_world.hi
- hello_world.o

### hello_world
実行ファイル

### hello_world.hi
これは単なるインターフェイスファイルであり、モジュールからエクスポートされた名前に関する情報を機械可読形式で保存します。
この時点でモジュールについて心配する必要はありません。
モジュールは、コードを論理的に整理するために使用されます。

### hello_world.o
マシンコードを含むオブジェクトファイル








