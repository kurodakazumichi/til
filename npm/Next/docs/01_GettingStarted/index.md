# Getting Started

Next.jsのドキュメントへようこそ。



Next.jsを初めてお使いになる方は、[学習コース](https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=nav-cta&utm_campaign=next-website)から始めることをお勧めします。

クイズを交えたインタラクティブなコースで、Next.jsを使うために必要な知識をすべて学ぶことができます。

Next.jsに関する質問がある場合は、[GitHub Discussions](https://github.com/vercel/next.js/discussions)のコミュニティにいつでもお問い合わせください。



**システム要件**

- Node.js 12.0 以上
- MacOS, Windows (including WSL), Linux



## Setup

新規のNext.jsアプリを作成する際には、すべてを自動的に設定してくれるcreate-next-appを使うことをお勧めします。プロジェクトを作成するには、次のように実行します。

```bash
npx create-next-app
# or
yarn create next-app
```

TypeScriptプロジェクトで開始したい場合は、`--typescript`フラグを使用できます。

```bash
npx create-next-app --typescript
# or
yarn create next-app --typescript
```

インストールが完了したら、指示に従って開発サーバーを起動します。`pages/index.js`を編集してみて、ブラウザで結果を確認します。

create-next-appの使い方の詳細については、[create-next-app](https://nextjs.org/docs/api-reference/create-next-app)のドキュメントをご覧ください。



## Manual Setup

`next`,`react`,`react-dom`をプロジェクトにインストールします。

```bash
npm install next react react-dom
# or
yarn add next react react-dom
```

package.jsonを開き、以下のスクリプトを追加します。

```js
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

これらのスクリプトは、アプリケーションの開発段階に応じて参照されます。

- `dev` - Next.jsを開発モードで起動するnext devを実行します。
- `build` - 本番環境用のアプリケーションを構築する次のビルドを実行する。
- `start` - Next.jsの本番サーバーを起動するnext startを実行します。
- `lint` - Next.jsに内蔵されているESLintの設定を行うnext lintを実行します。



Next.jsは、ページという概念で作られています。ページとは、pagesディレクトリにある.js、.jsx、.ts、.tsxファイルからエクスポートされたReact Componentのことです。

ページは、そのファイル名に基づいてルートに関連付けられます。例えば、pages/about.jsは/aboutにマッピングされます。ファイル名を使って動的なルートパラメータを追加することもできます。

プロジェクト内にpagesディレクトリを作成します。

./pages/index.jsに以下の内容を入力します。

```jsx
function HomePage() {
  return <div>Welcome to Next.js!</div>
}

export default HomePage
```

アプリケーションの開発を開始するには、npm run dev または yarn dev を実行します。これにより、http://localhost:3000 の開発サーバーが起動します。

http://localhost:3000 にアクセスしてください。

ここまでで、私たちは

- 自動コンパイル、自動バンドル（webpackとbabelを使用)
- React Fast Refresh（リアクト・ファスト・リフレッシュ)
- ./pages/の静的生成とサーバーサイドレンダリング
- 静的ファイルの提供。./public/は/にマッピングされます。

さらに、Next.jsのアプリケーションは最初から本番環境に対応しています。詳しくは[Deploymentドキュメント](https://nextjs.org/docs/deployment)をご覧ください。

