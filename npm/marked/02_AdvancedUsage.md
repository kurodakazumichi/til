# 高度な使い方

## The `marked` function

```js
marked(markdownString [,options] [,callback])
```



| Argument       | Type       | Notes                                                        |
| -------------- | ---------- | ------------------------------------------------------------ |
| markdownString | `string`   | コンパイルされるマークダウンソースの文字列。                 |
| options        | `object`   | オプションのハッシュ。marked.setOptionsも使用できます。      |
| callback       | `function` | markdownStringが解析されたときに呼び出されます。オプションが存在しない場合、2番目の引数として使用できます。 |



## 参考資料を用いた代替案

```js
// Create reference instance
const marked = require('marked');

// Set options
// `highlight` example uses https://highlightjs.org
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

// Compile
console.log(marked(markdownString));
```



## Options

| Member       | Type       | Default           | Since  | Notes                                                        |
| ------------ | ---------- | ----------------- | ------ | ------------------------------------------------------------ |
| baseUrl      | `string`   | `null`            | 0.3.9  | 相対リンクのためのプレフィックスURLです。                    |
| breaks       | `boolean`  | `false`           | v0.2.7 | trueの場合、1回の改行で<br/>を追加します（GitHubのコメントに対する動作をコピーしますが、レンダリングされたマークダウンファイルには適用されません）。gfm を true にする必要があります。 |
| gfm          | `boolean`  | `true`            | v0.2.1 | trueの場合は、GitHub Flavored Markdown（GFM）仕様を使用します。 |
| headerIds    | `boolean`  | `true`            | v0.4.0 | trueの場合、見出し（h1、h2、h3など）を発行する際にid属性を含める。 |
| headerPrefix | `string`   | `''`              | v0.3.0 | 見出し（h1、h2、h3など）を生成する際に、id属性の前に付ける文字列です。 |
| highlight    | `function` | `null`            | v0.3.0 | コードブロックをハイライトする機能、「[非同期式ハイライト](https://marked.js.org/using_advanced#highlight)」を参照。 |
| langPrefix   | `string`   | `language-`       | v0.3.0 | <code>ブロック内のclassNameの前に付ける文字列です。シンタックスハイライトに便利です。 |
| mangle       | `boolean`  | `true`            | v0.3.4 | trueの場合、自動リンクされたメールアドレスは、HTMLの文字参照でエスケープされます。 |
| pedantic     | `boolean`  | `false`           | v0.2.1 | trueの場合、オリジナルのmarkdown.plに可能な限り準拠します。オリジナルのmarkdownのバグや動作は修正しません。gfmをオフにしてオーバーライドします。 |
| renderer     | `object`   | `new Renderer()`  | v0.3.0 | トークンをHTMLにレンダリングするための関数を含むオブジェクトです。詳細は [extensibility](https://marked.js.org/using_pro) を参照してください。 |
| sanitize     | `boolean`  | `false`           | v0.2.1 | trueの場合、markdownStringに渡されたHTMLをsanitizer関数でサニタイズします。<br/>警告。この機能は非推奨であり、安全とは言えないため、使用すべきではありません。<br/>代わりに、DOMPurify（推奨）、saniteize-html、insaneなどのサニタイズライブラリを出力HTMLに使用してください。 |
| sanitizer    | `function` | `null`            | v0.3.4 | markdownStringに渡されたHTMLをサニタイズする関数です。       |
| silent       | `boolean`  | `false`           | v0.2.7 | trueの場合、パーサーは例外を発生させません。                 |
| smartLists   | `boolean`  | `false`           | v0.2.8 | trueの場合、markdown.plで見られるものよりもスマートなリスト動作を使用します。 |
| smartypants  | `boolean`  | `false`           | v0.2.9 | trueの場合、引用符やダッシュなどに「スマートな」タイポグラフィ句読点を使用します。 |
| tokenizer    | `object`   | `new Tokenizer()` | v1.0.0 | マークダウンからトークンを作成するための関数を含むオブジェクトです。詳細は[extensibility](https://marked.js.org/using_pro)を参照してください。 |
| walkTokens   | `function` | `null`            | v1.1.0 | トークンごとに呼び出される関数です。詳細は[extensibility](https://marked.js.org/using_pro)を参照してください。 |
| xhtml        | `boolean`  | `false`           | v0.3.2 | trueの場合、XHTMLで要求されているように、void要素（<br/>、<img/>など）に「/」を付けて自己完結するHTMLタグを発する。 |



## Inline Markdown

markdownをmarked.parseInlineに通すことで、インラインのmarkdownを解析することができます。

```js
const blockHtml = marked('**strong** _em_');
console.log(blockHtml); // '<p><strong>strong</strong> <em>em</em></p>'

const inlineHtml = marked.parseInline('**strong** _em_');
console.log(inlineHtml); // '<strong>strong</strong> <em>em</em>'
```



## Asynchronous highlighting

highlight.jsとは異なり、pygmentize.jsライブラリは非同期のハイライトを使用します。この例では、markedが使用するハイライターに依存しないことを示しています。



```js
marked.setOptions({
  highlight: function(code, lang, callback) {
    require('pygmentize-bundled') ({ lang: lang, format: 'html' }, code, function (err, result) {
      callback(err, result.toString());
    });
  }
});

marked(markdownString, (err, html) => {
  console.log(html);
});
```



どちらの例でも、codeはハイライターに渡すコードのセクションを表す文字列です。この例では、langはコードに使用するプログラミング言語をハイライターに知らせる文字列で、callbackは非同期のハイライターが完了したときに呼び出す関数です。



## Works

ReDoS攻撃を防ぐためには、ワーカー上でMarkedを実行し、解析に通常よりも時間がかかったときにワーカーを終了させることができます。

Markedは、ノードサーバー上のワーカースレッドや、ブラウザ上のウェブワーカーで実行することができます。



### Node Worker Thread

```js
// markedWorker.js

const marked = require('marked');
const { parentPort } = require('worker_threads');

parentPort.on('message', (markdownString) => {
  parentPort.postMessage(marked(markdownString));
});
```

```js
// index.js

const { Worker } = require('worker_threads');
const markedWorker = new Worker('./markedWorker.js');

const markedTimeout = setTimeout(() => {
  markedWorker.terminate();
  throw new Error('Marked took too long!');
}, timeoutLimit);

markedWorker.on('message', (html) => {
  clearTimeout(markedTimeout);
  console.log(html);
  markedWorker.terminate();
});

markedWorker.postMessage(markdownString);
```



### Web Worker

> 注：Web Workers は、ペイロードを .data プロパティに格納したオブジェクトで postMessage からペイロードを送信します。



```js
// markedWorker.js

importScripts('path/to/marked.min.js');

onmessage = (e) => {
  const markdownString = e.data
  postMessage(marked(markdownString));
};
```

```js
// script.js

const markedWorker = new Worker('./markedWorker.js');

const markedTimeout = setTimeout(() => {
  markedWorker.terminate();
  throw new Error('Marked took too long!');
}, timeoutLimit);

markedWorker.onmessage = (e) => {
  clearTimeout(markedTimeout);
  const html = e.data;
  console.log(html);
  markedWorker.terminate();
};

markedWorker.postMessage(markdownString);
```

