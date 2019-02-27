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
