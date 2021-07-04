# Getting Started

Markedは

1. スピードを追及している。
2. 長時間のキャッシュやブロックを行わずにMarkdownを解析する低レベルのMarkdownコンパイラ
3. サポートされているフレーバーと仕様のすべてのMarkdown機能を実装しながら、軽量に作られている
4. コマンドラインインターフェース(CLI)として利用可能で、クライアントサイドまたはサーバーサイドのJavaScriptプロジェクトで動作する



* 比較分析や定義のためのメトリクスにはまだ取り組んでいます。
* 可能な限り依存関係を減らす
* 厳密に順守すると、比較ベンチマークの実行時に処理が遅くなる可能性があります。



## Demo

デモページで[marked](https://marked.js.org/demo/)の動作を確認してみましょう⛹️。

これらのドキュメントページもmarkedを使ってレンダリングされています。



## インストール

**CLI:**`npm install -g marked`

**In-browser:**`npm install marked`



## 使い方

警告: 🚨Markedは出力HTMLをサニタイズしません。出力されるHTMLにはDOMPurify(推奨)やsanite-html、insaneなどのサニタイズライブラリを使用してください! 🚨



**CLI**

```
$ marked -o hello.html
hello world
^D
$ cat hello.html
<p>hello world</p>
```

```
$ marked -s "*hello world*"
<p><em>hello world</em></p>
```



**Browser**

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Marked in the browser</title>
</head>
<body>
  <div id="content"></div>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script>
    document.getElementById('content').innerHTML =
      marked('# Marked in browser\n\nRendered by **marked**.');
  </script>
</body>
</html>
```



**Node.js**

```js
const marked = require("marked");
const html = marked('# Marked in Node.js\n\nRendered by **marked**.');
```

Markedは、高度な設定と拡張性も備えています。



## 対応しているMarkdownの仕様

以下のMarkdownフレーバーの機能を積極的にサポートしています。



| Flavor                                                     | Version | Status                                                       |
| ---------------------------------------------------------- | ------- | ------------------------------------------------------------ |
| The original markdown.pl                                   | --      |                                                              |
| [CommonMark](http://spec.commonmark.org/0.29/)             | 0.29    | [Work in progress](https://github.com/markedjs/marked/issues/1202) |
| [GitHub Flavored Markdown](https://github.github.com/gfm/) | 0.29    | [Work in progress](https://github.com/markedjs/marked/issues/1202) |

上記のMarkdownフレーバーをサポートすることで、Markedは他のフレーバーの使用も支援できる可能性があります。しかし、これらはコミュニティによって積極的にサポートされていません。



## セキュリティ

完全に安全なシステムとは、そもそも存在しないものです。そうは言っても、私たちはMarkedのセキュリティを非常に重要視しています。

したがって、潜在的なセキュリティ問題は、プロジェクトのコミッターおよびNPM内のリストされた所有者にメールで開示してください。私たちは48時間以内にセキュリティレポートの初期評価を行い、2週間以内にパッチを適用する必要があります（また、その問題の修正を自由に投稿することもできます）

