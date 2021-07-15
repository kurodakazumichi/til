# Next.js

さっくりまとめ

## システム要件

- Node.js 12.0以上
- Mac, Windows, Linux

ようするに、Node.js 12以上をインストールしておけばOK



## Setup

**jsで開発するなら**

```bash
npx create-next-app
# or
yarn create next-app
```

**typescriptで開発するなら**

```bash
npx create-next-app --typescript
# or
yarn create next-app --typescript
```



例：typescriptでプロジェクトを作る(typescriptでmyAppというプロジェクトを作成)

```bash
yarn create next-app myApp --typescript
```



## Folder構成

```
myApp
┣ node_modules
┣ public
┣ pages
┃ ┣ api
┃ ┃ ┗ hello.ts
┃ ┣ _app.tsx
┃ ┗ index.tsx
┣ styles
┣ .eslintrc
┣ .gitignore
┣ next-env.d.ts
┣ next.config.js
┣ package.json
┣ README.md
┗ tsconfig.json
```



### とりあえず主要なフォルダは3つ

```
myApp
┣ public
┣ pages
┗ styles
```

#### public

urlの`/`にマッピングされる、名前を変えてはいけない。静的なファイルはここに入れる。

#### pages

ここに`.tsx`ファイルを作成するとそれがページになる。例えば`about.tsx`を作成すると、`/about`でアクセスできるページになる。

#### styles

cssなどのスタイルを入れておくフォルダ。このフォルダに入れないと動かないという制約があるわけでもない。



### pagesとstylesは移動しても問題ない

```
myApp
┣ public
┗ src
  ┣ pages
  ┗ styles
```

`public`は動かせないが、`pages`や`styles`フォルダは動かしても大丈夫。