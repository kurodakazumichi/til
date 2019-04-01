# 絶対パスを取得する

```js
// 必要なパッケージ
const path = require('path');

// 絶対パスを知りたいパス
const SOMETHING_PATH = ".";

// path.resolveでパス解決された結果のパスが取得できる
const absPath = path.resolve(SOMETHING_PATH);
```

> path/to

# ファイルの絶対パスを取得する
```js
// 必要なパッケージ
const path = require('path');

// path.resolveの第二引数に指定したパスが連結される
const absPath = path.resolve('.', "hoge.txt");
```

> path/to/hoge.txt


# ディレクトリ内のディレクトリ一覧を配列で取得する

```js
// 必要なパッケージ
const fs = require('fs');
const path = require('path');

// ディレクトリの内容を知りたいディレクトリのパス
const SOMETHING_DIR = "path/to/any";

// ディレクトリ読み込み -> 絶対パスの配列を作る -> ディレクトリのみにフィルタリング
const list = fs
  .readdirSync(SOMETHING_DIR)
  .map(file => path.resolve(SOMETHING_DIR, file))
  .filter(f => fs.lstatSync(path.resolve(f)).isDirectory());
```

# コマンドライン引数を受け取る

```js
// 配列の先頭２要素は実行パス、ファイルパスが入っているので飛ばして取得
console.log(process.argv.slice(2));
```

