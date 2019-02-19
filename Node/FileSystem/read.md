# fs.readFileSync

```js
// ファイルパスとエンコーディングを指定すればファイルの内容を読み込める
const text = fs.readFileSync("to/path/xxx.txt", "utf-8");
```

```js
// エンコーディングを省略するとテキストではなくバッファが返される。
const text = fs.readFileSync("to/path/xxx.txt");
```

