# markdown-itのrules一覧

https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.js

# 画像が読み込まれるのを待つ

Imageのonloadを使って画像の読み込みを判定する。

```js:sample.js
let isLoadedImage = false; // 画像が読み込まれたか？

const image = new Image();

// onloadを使って画像読み込みが終わったかどうかを判定
image.onload = function() {
  isLoadedImage = true;
}
```





# VS Code

## コマンドラインにパスを登録する

VSCodeを起動する
Commannd + Shift + P
Command Paletteで検索

Shell Command: Install 'code' command in PATHとあるので
これを実行するとVSCodeのパスが設定される

あとはターミナルで

```shell
code .
```
とかすればOK

# レスポンシブ対応

Chromeのモバイルエミュレーターでレスポンシブ(media query)が反応しない現象が起きた

- ブラウザ自体のサイズを変更する ＝　ちゃんとレスポンシブする
- ブラウザはフルスクリーンでモバイルエミュレーターでサイズを変える　＝　レスポンシブしない

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

これはmetaタグでviewportを指定することで解決した。













