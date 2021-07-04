# default.js

marked.jsのデフォルトのオプションが定義されている。



## function

### getDefaults() : object

marked.jsのデフォルトオプションを返す



### changeDefaults(newDefaults:object):void

```js
function changeDefaults(newDefaults) {
  module.exports.defaults = newDefaults;
}
```

デフォルトのエクスポートへ変更するだけのメソッド



## exports

```js
module.exports = {
  defaults: getDefaults(),
  getDefaults,
  changeDefaults
};
```

