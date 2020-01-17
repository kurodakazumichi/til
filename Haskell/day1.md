# Haskellの環境構築

https://qiita.com/Nekonecode/items/d0b7ebac278b4c1cd873
Qiitaに備忘録を作成。

# イントロダクション

1.`ghci`コマンドを使う事で、インタラクティブモードでHaskellを学習できる。

> GHCはGlasgow Haskell Compilerの略

> GHCiの**i**はinteractiveの略

```bash
#書籍ではghciコマンドとあるが、自分の環境だと以下のコマンドでREPLを起動する
$ stack ghci
```

stackがなんなのかはわかっていないが、おそらく時代の流れ的に
こっちのが便利だよと洗練されていった結果の産物と思っておく。

# `stack ghci`をしたあとの画面

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

# 負の数(-がつく数)は常にカッコで囲む

```bash
Prelude>5 * -3 # これはエラー

Prelude>5 * (-3) # これはOK
-15
```

# オペレーター(演算子)はプレフィックス形式でも使える。

```bash
# 以下の２つは同じ動きをする
Prelude>10 + 5
Prelude>(+) 10 5
```

プレフィックス形式でオペレーターを使う場合はカッコで囲む。
