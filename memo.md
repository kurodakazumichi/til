# 自分ルール

TIL全体を通して使っている自分ルール

- プロジェクトルートディレクトリを`root`と表記する


# markdown-itのrules一覧

https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.js

# 画像が読み込まれるのを待つ

Imageのonloadを使って画像の読み込みを判定する。

```js:sample.js
let isLoadedImage = false; // 画像が読み込まれたか？

const image = new Image();

// onloadを使って画像読み込みが終わったかどうかを判定
image.onload = function() {
  isLoadedImage = true;
}
```





# VS Code

## コマンドラインにパスを登録する

VSCodeを起動する
Commannd + Shift + P
Command Paletteで検索

Shell Command: Install 'code' command in PATHとあるので
これを実行するとVSCodeのパスが設定される

あとはターミナルで

```shell
code .
```
とかすればOK

# レスポンシブ対応

Chromeのモバイルエミュレーターでレスポンシブ(media query)が反応しない現象が起きた

- ブラウザ自体のサイズを変更する ＝　ちゃんとレスポンシブする
- ブラウザはフルスクリーンでモバイルエミュレーターでサイズを変える　＝　レスポンシブしない

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

これはmetaタグでviewportを指定することで解決した。









# yarn workspaceの罠

## yarn workspaceを使っている時のyarn addコマンド

プロジェクトのルートディレクトリのpackage.jsonにaddしたい場合は`-W`オプションが必要

```bash
yarn add -D [package-name] -W
```

## 特定のworkspaceを指定したい場合はこうなる:

```bash
yarn workspace [workspace-name] add [package-name] --dev
```

## `yarn`した時のworkspaceの扱い

workspaceを指定した状態で`yarn`を実行すると
`node_modules`にはworkspaceで指定したパッケージのシンボリックリンクが作られる。
公式には依存関係がない限り、`node_modules`にシンボリックリンクは作られないと書いてあったが
どうも仕様が変わったようだ。

まぁこれが問題になることは今の所ないので別にいい。


# 埋め込み型エディター Aceをnode.jsで使う

```bash
yarn add ace-builds
```

```typescript
import Ace from 'ace-builds';

const editor = Ace.edit(document.querySelector("selector string") as Element);

// githubのテーマ、javascriptモード
import ThemeGithub from 'ace-builds/src-noconflict/theme-github';
import { Mode as JavaScriptMode } from 'ace-builds/src-noconflict/mode-javascript';

// 設定はこうする
editor.getSession().setUseWorker(false);
editor.setTheme(ThemeGithub);
editor.getSession().setMode(new JavaScriptMode());
```


