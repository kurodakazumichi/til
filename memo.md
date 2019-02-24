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

# Konva　

## Serialisation
Konvaの各種Nodeは`toJSON()`でシリアライズできる。

```js:sample.js
node.toJSON();
```

## 再描画

レイヤーや図形の描画

```js
layer.draw(); // レイヤー全体が再描画される(レイヤー全体がクリアされた上で再描画)
shape.draw(); // 指定した図形が描画される。(もともと描画されていたものは消えない)
```

## 座標の取得、更新
```js
shape.position();           // 座標取得
shape.position({x:0, y:0}); // 座標更新
shape.x();                  // X座標取得
shape.x(0);                 // X座標更新
shape.y();                  // Y座標取得
shape.y(0);                 // Y座標更新

// 非推奨？(これでも座標変わるけどインテリセンスには出てこない)
shape.setX(0);
shape.setY(0);
```


# TypeScript 型定義

## EventHandlerの型定義
elementのイベントコールバックを指定するときの型定義

```ts:sample.js
interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
}

element.addEventListener('click', (event:HTMLElementEvent<HTMLInputElement>) => {
  console.log(event.target.value);
});
```

## ブラウザのwindowオブジェクトの型を定義する方法

```ts:sample.js
/*
 * numとfunというメソッドを持ったWindow
 */
interface Window {
  num : number;
  fun : () => void;
}
// 定義
declare var window:Window;

// これで警告は出ない
window.num = 0;
window.fun = () => {};
```

## React,ReactDOMの型定義ファイル

```shell
yarn add @types/react
yarn add @types/react-dom
```

# Parcel

## SCSSに対応する

`sass`を入れてjs内で`import`するだけ。

https://parceljs.org/scss.html
```shell
npm install -D sass
# or
yarn add -d sass
```

```js
import './custom.scss'
```

# React

## TypeScript 型定義

### onInputなどのコールバックで受け取るeventの型

ReactでonXXXなどに渡すコールバックを定義し、引数でeventをもらう場合
そのeventの型は`React.FormEvent<T>`を使う

```js:sample.js
class MyComponent extends React.Component {
  render () {
    return <input type="range" onInput={ this.onInput.bind(this); } />
  }
  onInput(e:React.FormEvent<HTMLInputElement>) {
    console.log(e);
  }
}
```
