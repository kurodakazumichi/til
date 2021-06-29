## 概要

CSSのStyleGuideページを作成できるツール

[公式サイト](https://fractal.build/)



## インストール

```bash
yarn global add @frctl/fractal
```



## プロジェクトの作成

任意のディレクトリへ移動し以下のコマンドを実行する。

```bash
fractal new {project-name}
```



下記のように、ターミナル上でいくつか質問されるので、答えていく。

```
What's the title of your project? {project-name}
Where would you like to keep your components? src/components
Where would you like to keep your docs? src/docs
What would you like to call your public directory? public
Will you use Git for version control on this project? Yes
```

質問の入力が終わると、最初に指定した`project-name`のフォルダが作成され、その中にプロジェクトが構築される。



##  起動

```bash
yarn fractal:start
```

サーバが起動し、アクセス先のURLが表示される。

```bash
| Local URL:      http://localhost:3000    │
│ Network URL:    http://172.27.144.1:3000 │
│ BrowserSync UI: http://localhost:3002    | 
```



## コンポーネントを追加

`src/components`に`{component-name}.hbs`ファイルを追加する。

*hbsにはHTMLなどを記述する*



例えば、**heading-level1**というコンポーネントを追加する場合

`src/components/heading-level.hbs`を作成すると自動的に反映される。



またファイルはフォルダを分けて配置すると、自動的にフォルダ階層も反映してくれる。

例:`src/components/heading/level1/heading-level1.hbs`



### コンポーネントにAssetsを反映する

コンポーネントと同じディレクトリに`style.css`や`index.js`などを配置すると、自動的にAssetsタブが表示されるようになる。

ただし、ここに配置したファイルが実際に適用されるわけではなく、Assetsタブに内容が表示されるだけのようだ。



正攻法ではないかもしれないが、ここに配置したアセットは`/components/raw/{component-name}/{filename}`でアクセスできるため

各コンポーネントの`hbs`ファイル内で以下のように無理やり読み込むことは可能。



```html
<link rel="stylesheet" href="/components/raw/{component-name}/style.css">
<script src="/components/raw/{component-name}/index.js"></script>
```



### コンポーネントの解説を用意する

コンポーネントと同じディレクトリに`README.md`を作成すれば自動的に反映される。





## 静的アセットの配置

プロジェクトのディレクトリ直下にある`public`がドキュメントルートなので、静的アセットはこのフォルダに配置すればよい。



## Previewエリアをカスタマイズする

全体的に任意のCSSを読み込ませたい場合は、`src/components`直下に`_preview.hbs`を作成する。



`_preview.hbs`：リセットCSSを読み込む例

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/css-wipe@4.3.0/index.min.css">
    <title>Preview Layout</title>
  </head>
  <body>
    {{{ yield }}}
  </body>
</html>
```