# 試した事

Marked.jsに関して、実際に試してみたコードなどを残しておく。

※Markedをcdnで読み込み、ブラウザ上で動作させている。



## Rendererのoverride

Rendererを純粋にoverrideすると既存のrendererは上書きされ消えてしまう。

```js
const renderer = {}
marked.use({renderer});
```

このようにすればmarkedのrendererを上書きし、独自の処理を実装できる。しかしこれだと既存のrendererの処理も消えてしまい、全てを自分で実装する必要がでてくる。



以下のようにすると、既存のrendererを使いつつ、一部の処理だけ上書きできる。

```js
// 既存のrendererを作成する
const renderer = new marked.Renderer();

// renderer.options.rendererに、Block-Level及びInline-Levelのメソッドが格納されている。
// 必要なメソッドを上書きすれば、特定の要素について独自の処理を入れ込む事ができる。

// em要素のrendererをoverride
renderer.options.renderer.em = (text) => {
    console.log(text);
    return `<em>${text}</em>`;
}

// strong要素のrendererをoverride
renderer.options.renderer.strong = (text) => {
    console.log(text);
    return `<strong>${text}</strong>`;
}

// レンダラを適用
marked.use({renderer});

// markdownを変換
const htmlString = marked(markdownString);
```



## URLがtwitterだったら自動でTwitterの埋め込みにする

事前に次の`js`を読み込んでおく

```html
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
```



markedの元々の処理で`cleanUrl`と言うメソッドを使っていたが、これがブラウザ版だとexportされておらず使えない。

仕方ないのでmarkedのgithubから処理をまるっと持ってきてグローバルオブジェクト(StudyHub.helper)にぶち込む

```js
StudyHub.helper = {
    cleanUrl(sanitize, base, href) {
        if (sanitize) {
            let prot;
            try {
                prot = decodeURIComponent(unescape(href))
                    .replace(nonWordAndColonTest, '')
                    .toLowerCase();
            } catch (e) {
                return null;
            }
            if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
                return null;
            }
        }
        if (base && !originIndependentUrl.test(href)) {
            href = resolveUrl(base, href);
        }
        try {
            href = encodeURI(href).replace(/%25/g, '%');
        } catch (e) {
            return null;
        }
        return href;
    }
}
```



rendererのlinkメソッドをoverrideして、hrefが`https//twitter.com*`にマッチしたらTwitter埋め込みタグを出力。

またtwitterの`widgets.load`を呼ぶ必要がある。(通常はスクリプトロード時に自動で呼ばれるようだけどプレビューとかだと手動で呼ぶ必要がある)



```js
function my_marked(view, markdownString) 
{
  // Override renderer function
  const renderer = new marked.Renderer();

  // リンクのURLがTwitterだったらTwitterの埋め込みタグにする
  renderer.link = (href, title, text) => 
  {     
    href = StudyHub.helper.cleanUrl(renderer.options.sanitize, renderer.options.baseUrl, href);

    if (href === null) {
      return text;
    }

    if (href.match(/https:\/\/twitter.com*/)?.index === 0) {
      return `
      <blockquote class="twitter-tweet">
        (ツイート埋め込み処理中)
        <a href='${href}'>tweet</a>
      </blockquote>
      `;
    } else {
      let out = '<a href="' + escape(href) + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += '>' + text + '</a>';
      return out;
    }
  }    

  const option = {
    breaks: false,
    renderer,
  }

  // markdownを表示
  const md = marked(markdownString, option);
  $(view).html(md);

  if (typeof twttr !== "undefined") {
    twttr.widgets.load();
  }
}
```

