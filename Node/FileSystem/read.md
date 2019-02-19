# fs.readFileSync

```js
// ファイルパスとエンコーディングを指定すればファイルの内容を読み込める
const text = fs.readFileSync("to/path/xxx.txt", "utf-8");
```

```js
// エンコーディングを省略するとテキストではなくバッファが返される。
const text = fs.readFileSync("to/path/xxx.txt");
```

# fs.writeFileSync

```js
// ファイルの書き込み、エンコーディングは指定しないとデフォルトでutf8
fs.writeFileSync("./output.txt", text, "utf8");
```
