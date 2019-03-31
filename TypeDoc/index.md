# インストール

TypeDocを使うにはPCに`Node.js`がインストールされている必要がある。

## グローバルインストール

```bash
yarn global add typedoc
```

## ローカルインストール

```bash
yarn add -D typedoc
```

## バージョン確認

```bash
typedoc --version
```

# ドキュメント生成

```bash
typedoc --out docs /src
```

## format

```bash
typedoc --out [out_dir] [src_dir]
```

| オプション | 説明 |
| - | - |
| out_dir | 出力先のディレクトリパス |
| src_dir | ドキュメント化するソースコードのあるディレクトリパス |



## コマンドライン引数

`typedoc`は出力先のフォルダ以外にも様々なオプションを引数で受け取れる。

```bash
# ドキュメントのヘッダーに表示されるプロジェクト名を指定するケース
typedoc --out [out_dir] [src_dir] --name TestProject

# 下記のコマンド、その他のオプションを確認可能
typedoc --help
```

その他、詳細はココ
https://typedoc.org/guides/arguments/


## typedoc.json

前述のコマンドライン引数は`json`ファイルに記述して管理することもできる。

**出力先**と**除外ファイルパターン**を指定した設定ファイルを`typedoc.json`という名前で作成。

```json
{
  "out": "docs",
  "exclude":"**/__tests__/**/*"
}
```

```bash
# typedoc [src_dr]
typedoc ./src
```
  
デフォルトで`typedoc.json`ファイルの設定が使われる。
`typedoc.json`とは異なる名前でファイルを作成した場合は:

```bash
typedoc ./src --option hoge.json
```

のように`--option`を使って設定ファイルを指定する。
