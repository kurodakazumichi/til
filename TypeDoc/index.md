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

## ドキュメント生成

```bash
typedoc --out docs /src
```

### format

```bash
typedoc --out [out_dir] [src_dir]
```

| オプション | 説明 |
| - | - |
| out_dir | 出力先のディレクトリパス |
| src_dir | ドキュメント化するソースコードのあるディレクトリパス |




