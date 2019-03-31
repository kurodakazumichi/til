# Global Objects

Node.jsで扱えるグローバルオブジェクトについて記載する。

## __dirname

現在実行されているモジュールのディレクトリ名が格納されている。

**/example/index.js**:

```js
console.log(__dirname);
```

> /example

## __filename

現在実行されているモジュールのファイルパス

**/example/index.js**:

```js
console.log(__filename);
```

> /example/index.js
