# marked.js

marked.jsのメインファイル



## 依存

- Lexer.js
- Parser.js
- Tokenizer.js
- Renderer.js
- TextRenderer.js
- Slugger.js
- helpder.js
  - marge
  - checkSanitizeDeprecation
  - escape
- defaults.js
  - getDefaults
  - changeDefaults
  - defaults



## functions

### marked(src, opt, callback)

#### 引数チェック

- 引数:`src`が指定されてなかったら例外を投げる
- 引数:`src`が文字列じゃなければ例外を投げる
- 引数:`opt`が関数だったらcallbackとして扱う
- 

#### callback関連

#### 構文解析

- `Lexer`をマークダウン文字列をtokenに変換し、`Parser`がtokenをHTMLに変換する。
- 解析中に例外が発生したら例外を投げるが、`options.silent`が`true`だったら、例外は投げない。

```js
if (opt.silent) {
    return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
}
```

