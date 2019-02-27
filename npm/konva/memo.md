
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

