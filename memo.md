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







