# DropTarget

自作したReactComponentを`DropTarget`でラップする。  
そうするとこのコンポーネントはドラッグされているコンポーネントに反応するコンポーネントにできる。  

また`DropTarget`を使用するには、アプリの最上位コンポーネントを  
`DragDropContext`で囲まないといけない。   
> **これマジでハマった** 

(最上位？単純に最上位のコンポーネントに指定するだけでいい？)

## 書き方

```js
import { DropTarget } from 'react-dnd';

// 1. コンポーネントを作る
class MyComponent {
  /* ... */
}

// 2. DropTarget -> の戻り値がFunctinoなので引数にコンポーネント渡す
export default DropTarget(types, spec, collect)(MyComponent);
```

`DropTarget`はデコレータ記法も使えるよ
```js
import { DropTarget } from 'react-dnd';

@DropTarget(types, spec, collect)
class MyComponent {
  /* ... */
}
```

## DropTargetの引数

### types(必須)
`string`か`ES6 symbol`、もしくはこのどちらかの配列か、これを返す関数(引数にpropsをもらう)。
DropTargetは、このtypesが一致するドラッグアイテムにのみ反応する。

### spec(必須)
ドラッグ&ドロップに関するメソッドを持ったJavaScriptオブジェクト。

### collect(必須)
ドロップ要素の情報を返すメソッドを定義する。
ここで返す情報はドラッグ側で取得して扱える。
`connect`と`monitor`の２つの引数を受け取ります。

### options(任意)


