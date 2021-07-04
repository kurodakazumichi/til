# Extending Marked

単一責任主義とオープン/クローズドの原則を支持するために、私たちはMarkedを比較的容易に拡張できるようにしました。カスタム機能の追加をお考えの方は、まずここから始めてみてください。



## marked.use()

marked.use(extension)は、Markedを拡張するための推奨される方法です。拡張オブジェクトには、Markedで利用可能なあらゆるオプションを含めることができます。

```js
const marked = require('marked');

marked.use({
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});
```



また、複数のエクステンション・オブジェクトを一度に供給することも可能です。

```
marked.use(myExtension, extension2, extension3);

\\ 以下に相当:

marked.use(myExtension);
marked.use(extension2);
marked.use(extension3);
```

すべてのオプションは、以前に設定されたものを上書きします。ただし、以下のオプションは既存のフレームワークにマージされ、Markedの機能を変更または拡張するために使用することができます：`renderer`,`tokenizer`,`wolkTokens`,`extensions`



- レンダラとトークナイザのオプションは、それぞれ組み込みのレンダラとトークナイザにマージされる関数を持つオブジェクトです。
- walkTokensオプションは、レンダリング前に各トークンを後処理するために呼び出される関数です。
- extensions オプションは、デフォルトの解析ロジックが実行される前に実行される、カスタムのレンダラーやトークナイザーのステップを追加できるオブジェクトの配列です。



## The marked Pipeline

カスタムエクステンションを構築する前に、MarkedがMarkdownからHTMLへの翻訳に使用するコンポーネントを理解することが重要です。



1. ユーザーはMarkedに翻訳されるべき入力文字列を与えます。
2. レクサは、入力された文字列の一部を各トークン化器に送り込み、その出力から、入れ子構造の木構造の一連のトークンを生成します。
3. 各トークナイザーはMarkdownテキストのセグメントを受け取り、それが特定のパターンにマッチした場合、関連情報を含むトークンオブジェクトを生成します。
4. walkTokens関数は、ツリー内のすべてのトークンをトラバースし、トークンの内容に最終的な調整を行います。
5. パーサーは、トークンツリーを走査し、各トークンを適切なレンダラーに送り、それらの出力を連結して最終的なHTML結果とします。
6. 各レンダラーは、トークンを受け取り、その内容を操作して、HTMLのセグメントを生成します。
7. 

Markedは、既存のトークンタイプのレンダラーとトークナイザーを直接オーバーライドする方法を提供しています。また、完全にカスタムされた構文を処理するために、カスタムのレンダラーとトークナイザー関数を追加で挿入することもできます。



## The Renderer: `renderer`

レンダラは、与えられたトークンのHTML出力を定義します。Marked のオプションにレンダラーオブジェクトを指定すると、組み込みのレンダラーにマージされ、内部の関数はそのトークンタイプのデフォルト処理をオーバーライドします。

marked.use()を呼び出して同じ関数を複数回オーバーライドすると、最後に割り当てられたバージョンが優先されます。関数をオーバーライドする際にfalseを返すと、一連のオーバーライドの中で前のオーバーライドに戻るか、すべてのオーバーライドがfalseを返すとデフォルトの動作を再開します。それ以外の値（何もない場合も含む）を返すと、フォールバック動作は行われません。



例 GitHubのようにアンカータグを埋め込んで、デフォルトの見出しトークンの出力を上書きする。

```js
// Create reference instance
const marked = require('marked');

// Override function
const renderer = {
  heading(text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    return `
            <h${level}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${level}>`;
  }
};

marked.use({ renderer });

// Run marked
console.log(marked('# heading+'));
```

**Output**

```html
<h1>
  <a name="heading-" class="anchor" href="#heading-">
    <span class="header-link"></span>
  </a>
  heading+
</h1>
```



### Block-level renderer methods

- code(string code, string infostring, boolean escaped)
- blockquote(string quote)
- html(string html)
- heading(string text, number level, string raw, Slugger slugger)
- hr()
- list(string body, boolean ordered, number start)
- listitem(string text, boolean task, boolean checked)
- checkbox(boolean checked)
- paragraph(string text)
- table(string header, string body)
- tablerow(string content)
- tablecell(string content, object flags)



### Inline-level renderer methods

- strong(string text)
- em(string text)
- codespan(string code)
- br()
- del(string text)
- link(string href, string title, string text)
- image(string href, string title, string text)
- text(string text)



sluggerには、値からユニークなIDを作成するslugメソッドがあります。(※headingの引数に渡されてくる)

```js
slugger.slug('foo')   // foo
slugger.slug('foo')   // foo-1
slugger.slug('foo')   // foo-2
slugger.slug('foo 1') // foo-1-1
slugger.slug('foo-1') // foo-1-2
...
```



slugger.slugは、dryrunオプションを付けて呼び出すこともでき、ステートレスな動作が可能です。

```js
slugger.slug('foo')                    // foo
slugger.slug('foo')                    // foo-1
slugger.slug('foo')                    // foo-2
slugger.slug('foo', { dryrun: true })  // foo-3
slugger.slug('foo', { dryrun: true })  // foo-3
slugger.slug('foo')                    // foo-3
slugger.slug('foo')                    // foo-4
...
```



flagsは以下のような特性を持っています。(※tablecellに渡されてくる)

```js
{
    header: true || false,
    align: 'center' || 'left' || 'right'
}
```



## The Tokenizer: `tokenizer`

トークナイザーは、マークダウンテキストをトークンに変換する方法を定義します。Markedオプションにtokenizerオブジェクトを与えると、それは組み込みのtokenizerにマージされ、内部の関数はそのトークンタイプのデフォルト処理をオーバーライドします。

marked.use() を呼び出して同じ関数を複数回オーバーライドすると、最後に割り当てられたバージョンが優先されます。関数をオーバーライドする際に false を返すと、一連のオーバーライドの中で前のオーバーライドに戻るか、すべてのオーバーライドが false を返すとデフォルトの動作を再開します。それ以外の値（何もない場合も含む）を返すと、フォールバック動作は行われません。



例 デフォルトの codespan トークナイザーをオーバーライドして LaTeX を含める。

```js
// Create reference instance
const marked = require('marked');

// Override function
const tokenizer = {
  codespan(src) {
    const match = src.match(/\$+([^\$\n]+?)\$+/);
    if (match) {
      return {
        type: 'codespan',
        raw: match[0],
        text: match[1].trim()
      };
    }

    // return false to use original codespan tokenizer
    return false;
  }
};

marked.use({ tokenizer });

// Run marked
console.log(marked('$ latex code $\n\n` other code `'));
```

**Output**

```html
<p><code>latex code</code></p>
<p><code>other code</code></p>
```

注：これはlatexを完全にはサポートしていません。



### Block level tokenizer methods

- space(string src)
- code(string src)
- fences(string src)
- heading(string src)
- nptable(string src)
- hr(string src)
- blockquote(string src)
- list(string src)
- html(string src)
- def(string src)
- table(string src)
- lheading(string src)
- paragraph(string src)
- text(string src)



### Inline level tokenizer methods

- escape(string src)
- tag(string src, bool inLink, bool inRawBlock)
- link(string src)
- reflink(string src, object links)
- emStrong(string src, string maskedSrc, string prevChar)
- codespan(string src)
- br(string src)
- del(string src)
- autolink(string src, function mangle)
- url(string src, function mangle)
- inlineText(string src, bool inRawBlock, function smartypants)



mangleは、テキストをHTMLの文字参照に変更するメソッドです。

```js
mangle('test@example.com')
// "&#x74;&#101;&#x73;&#116;&#x40;&#101;&#120;&#x61;&#x6d;&#112;&#108;&#101;&#46;&#x63;&#111;&#x6d;"
```



smartypantsは、プレーンなASCII句読点文字を「スマートな」タイポグラフィ句読点のHTMLエンティティに変換するメソッドです。

```js
smartypants('"this ... string"')
// "“this … string”"
```



## Walk Tokens: `workTokens`

walkTokens関数は、トークンごとに呼び出されます。子トークンが呼ばれてから、兄弟トークンに移ります。各トークンは参照によって渡されるので、パーサーに渡されたときに更新が持続されます。この関数の戻り値は無視されます。

marked.use()は、異なるwalkTokens関数で複数回呼び出すことができます。それぞれの関数は、最後に割り当てられた関数から順に呼び出されます。

例 見出しのトークンをh2から始まるように上書きする。

```js
const marked = require('marked');

// Override function
const walkTokens = (token) => {
  if (token.type === 'heading') {
    token.depth += 1;
  }
};

marked.use({ walkTokens });

// Run marked
console.log(marked('# heading 2\n\n## heading 3'));
```

**Output**

```html
<h2 id="heading-2">heading 2</h2>
<h3 id="heading-3">heading 3</h3>
```



## Custom Extensions: `extensions`

options オブジェクトに extensions 配列を指定することができます。この配列には、以下のプロパティを用いて任意の数の拡張オブジェクトを含めることができます。



**`name`**

この拡張機能で処理されるトークンを識別するために使用する文字列です。
この名前が既存の拡張機能の名前や、上記のトークナイザ/レンダラの既存のメソッドと一致する場合は、最後に割り当てられた拡張機能を優先して、以前に割り当てられた動作を上書きします。拡張機能が false を返すと、以前の動作に戻ります。



**`level`**

拡張トークナイザーをいつ実行するかを決定する文字列。block' または 'inline' と等しくなければなりません。
ブロックレベルの拡張機能は、上記のブロックレベルのトークナイザーのメソッドの前に処理されます。

インラインレベルの拡張子は、各ブロックレベルのトークンの内側で、上記のインラインレベルのトークナイザーメソッドの前に処理されます。これらは通常、「style-type」のテキスト（イタリック、ボールドなど）で構成されます。



**`start(string src)`**

カスタムトークンの次の開始点となる可能性のあるインデックスを返す関数です。
このインデックスは、 src.match().index の結果であったり、単純な src.index() であったりします。Marked はこの関数を使用して、カスタムトークンの一部であるべきテキストをスキップしないようにします。



**`tokenizer(string src, array tokens)`**

Markdownテキストの文字列を読み込んで、生成されたトークンを返す関数です。tokensパラメータには、その時点までにレキサーによって生成されたトークンの配列が含まれており、例えば前のトークンにアクセスするために使用することができます。
戻り値は、以下のパラメータを持つオブジェクトでなければなりません。



- **`type`**

  拡張機能のnameパラメータにマッチする文字列。

- **`raw`**

  このトークンがソースから消費したすべてのテキストを含む文字列です。

- **`tokens[optional]`**

  walkTokens関数がデフォルトで通過させる子トークンの配列です。

返されたトークンには、カスタムレンダラーがアクセスする必要があるその他のカスタムパラメータを含めることができます。

これは、文字列の内部セクションをさらに解析する必要がある場合に使用できます。例えば、ブロックトークン内のテキストのインライン構文を処理する場合などに使用できます。便利な主な機能は以下のとおりです。

- **`this.blockTokens(string text)`**

  指定されたテキストに対してブロックトークナイザー関数（拡張機能を含む）を実行し、トークンのネストされたツリーを含む配列を返します。

- **`this.inlineTokens(string text)`**

  指定されたテキストに対してインラインのトークナイザー関数（拡張機能を含む）を実行し、トークンのネストしたツリーを含む配列を返します。これを使ってtokensパラメータを生成することができます。

**`renderer(object token)`**

トークンを読み込んで、生成された HTML 出力文字列を返す関数です。
トークンの一部（子トークンなど）をさらに解析する必要がある場合は、このオブジェクト内のパーサーにアクセスできます。便利な主な機能は次のとおりです。

- **`this.parse(array tokens)`**

  与えられたトークンの配列に対して、ブロックレンダラ関数（拡張機能を含む）を実行し、結果としてのHTML文字列出力を返します。

- **`this.parseInline(array tokens)`**

  指定されたトークンの配列に対して、インラインのレンダラー関数（拡張機能を含む）を実行し、その結果としてのHTML文字列出力を返します。これは、例えば、任意の子トークンからテキストを生成するために使用することができます。



**`childTokens [optional]`**

walkTokens 関数で走査する必要のあるトークンパラメータの名前に一致する文字列の配列です。たとえば、トークンに加えて子トークンを含む 2 番目のカスタムパラメータを使用したい場合は、ここにリストアップすることができます。childTokens が指定された場合、そのトークンが childTokens 配列にも含まれていない限り、デフォルトではトークン配列は走査されません。



例 <dl>記述リストを生成するカスタム構文を追加する。

```js
const descriptionlist = {
  name: 'descriptionList',
  level: 'block',                                     // Is this a block-level or inline-level tokenizer?
  start(src) { return src.match(/:[^:\n]/)?.index; }, // Hint to Marked.js to stop and check for a match
  tokenizer(src, tokens) {
    const rule = /^(?::[^:\n]+:[^:\n]*(?:\n|$))+/;    // Regex for the complete token
    const match = rule.exec(src);
    if (match) {
      return {                                        // Token to generate
        type: 'descriptionList',                      // Should match "name" above
        raw: match[0],                                // Text to consume from the source
        text: match[0].trim(),                        // Additional custom properties
        tokens: this.inlineTokens(match[0].trim())    // inlineTokens to process **bold**, *italics*, etc.
      };
    }
  },
  renderer(token) {
    return `<dl>${this.parseInline(token.tokens)}\n</dl>`; // parseInline to turn child tokens into HTML
  }
};

const description = {
  name: 'description',
  level: 'inline',                                 // Is this a block-level or inline-level tokenizer?
  start(src) { return src.match(/:/)?.index; },    // Hint to Marked.js to stop and check for a match
  tokenizer(src, tokens) {
    const rule = /^:([^:\n]+):([^:\n]*)(?:\n|$)/;  // Regex for the complete token
    const match = rule.exec(src);
    if (match) {
      return {                                     // Token to generate
        type: 'description',                       // Should match "name" above
        raw: match[0],                             // Text to consume from the source
        dt: this.inlineTokens(match[1].trim()),    // Additional custom properties
        dd: this.inlineTokens(match[2].trim())
      };
    }
  },
  renderer(token) {
    return `\n<dt>${this.parseInline(token.dt)}</dt><dd>${this.parseInline(token.dd)}</dd>`;
  },
  childTokens: ['dt', 'dd'],                 // Any child tokens to be visited by walkTokens
  walkTokens(token) {                        // Post-processing on the completed token tree
    if (token.type === 'strong') {
      token.text += ' walked';
    }
  }
};

marked.use({ extensions: [descriptionlist, description] });

\\ EQUIVALENT TO:

marked.use({extensions: [descriptionList] });
marked.use({extensions: [description]     });

console.log(marked('A Description List:\n'
                 + ':   Topic 1   :  Description 1\n'
                 + ': **Topic 2** : *Description 2*'));
```

**Output**

```bash
<p>A Description List:</p>
<dl>
<dt>Topic 1</dt><dd>Description 1</dd>
<dt><strong>Topic 2 walked</strong></dt><dd><em>Description 2</em></dd>
</dl>
```



## The Lexer

lexerはmarkdown文字列を受け取り、tokenizer関数を呼び出します。



## The Parser

パーサーは、トークンを入力として受け取り、レンダラー関数を呼び出します。



## Access to Lexer and Parser

また、必要に応じてレキサーやパーサーに直接アクセスすることもできます。

```js
const tokens = marked.lexer(markdown, options);
console.log(marked.parser(tokens, options));
```

```js
const lexer = new marked.Lexer(options);
const tokens = lexer.lex(markdown);
console.log(tokens);
console.log(lexer.tokenizer.rules.block); // block level rules used
console.log(lexer.tokenizer.rules.inline); // inline level rules used
console.log(marked.Lexer.rules.block); // all block level rules
console.log(marked.Lexer.rules.inline); // all inline level rules
```

```bash
$ node
> require('marked').lexer('> I am using marked.')
[
  {
    type: "blockquote",
    raw: "> I am using marked.",
    tokens: [
      {
        type: "paragraph",
        raw: "I am using marked.",
        text: "I am using marked.",
        tokens: [
          {
            type: "text",
            raw: "I am using marked.",
            text: "I am using marked."
          }
        ]
      }
    ]
  },
  links: {}
]
```

レキサーはトークンの配列を構築し、それをパーサーに渡します。パーサーは、トークン配列の各トークンを処理します。

```js
const marked = require('marked');

const md = `
  # heading

  [link][1]

  [1]: #heading "heading"
`;

const tokens = marked.lexer(md);
console.log(tokens);

const html = marked.parser(tokens);
console.log(html);
```

```bash
[
  {
    type: "heading",
    raw: "  # heading\n\n",
    depth: 1,
    text: "heading",
    tokens: [
      {
        type: "text",
        raw: "heading",
        text: "heading"
      }
    ]
  },
  {
    type: "paragraph",
    raw: "  [link][1]",
    text: "  [link][1]",
    tokens: [
      {
        type: "text",
        raw: "  ",
        text: "  "
      },
      {
        type: "link",
        raw: "[link][1]",
        text: "link",
        href: "#heading",
        title: "heading",
        tokens: [
          {
            type: "text",
            raw: "link",
            text: "link"
          }
        ]
      }
    ]
  },
  {
    type: "space",
    raw: "\n\n"
  },
  links: {
    "1": {
      href: "#heading",
      title: "heading"
    }
  }
]
<h1 id="heading">heading</h1>
<p>  <a href="#heading" title="heading">link</a></p>
```
