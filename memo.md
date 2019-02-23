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

# Konva　Serialisation

Konvaの各種Nodeは`toJSON()`でシリアライズできる。

```js:sample.js
node.toJSON();
```

# TypeScript EventHandlerの型定義

elemmentのイベントコールバックを指定するときの型定義

```ts:sample.js
interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
}

element.addEventListener('click', (event:HTMLElementEvent<HTMLInputElement>) => {
  console.log(event.target.value);
});
```
