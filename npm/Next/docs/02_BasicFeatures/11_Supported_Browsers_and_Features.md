# Supported Browsers and Features

Next.jsは、IE11をはじめとするすべてのモダンブラウザ（Edge、Firefox、Chrome、Safari、Operaなど）に対応しており、設定は不要です。



## Polyfills

IE11との互換性に必要なポリフィルを透過的に注入します。さらに、以下のような広く使われているポリフィルも注入しています。



- fetch() - 置き換え：whatwg-fetchとunfetch。
- URL - 置換: url パッケージ (Node.js API).
- Object.assign() - 置き換え: object-assign, object.assign, and core-js/object/assign.



依存関係にこれらのポリフィルが含まれている場合、重複を避けるためにプロダクションビルドでは自動的に削除されます。

また、バンドルのサイズを小さくするために、Next.jsはこれらのポリフィルを必要とするブラウザにのみロードします。世界中のウェブトラフィックの大半は、これらのポリフィルをダウンロードしません。



### Server-Side Polyfills

Next.jsでは、クライアントサイドでのfetch()に加えて、Node.js環境でのfetch()もポリフィルしています。isomorphic-unfetchやnode-fetchなどのポリフィルを使わなくても、サーバーコード（getStaticPropsなど）でfetch()を使うことができます。



### Custom Polyfills

自身のコードや外部のnpm依存ファイルが、対象となるブラウザでサポートされていない機能を必要とする場合、自身でポリフィルを追加する必要があります。

この場合、Custom `<App>`または個々のコンポーネントで、必要な特定のポリフィルのトップレベルのインポートを追加する必要があります。



## JavaScript Language Features

Next.jsでは、最新のJavaScript機能をすぐに使うことができます。ES6の機能に加えて、Next.jsは以下もサポートしています。



- [Async/await](https://github.com/tc39/ecmascript-asyncawait) (ES2017)
- [Object Rest/Spread Properties](https://github.com/tc39/proposal-object-rest-spread) (ES2018)
- [Dynamic `import()`](https://github.com/tc39/proposal-dynamic-import) (ES2020)
- [Optional Chaining](https://github.com/tc39/proposal-optional-chaining) (ES2020)
- [Nullish Coalescing](https://github.com/tc39/proposal-nullish-coalescing) (ES2020)
- [Class Fields](https://github.com/tc39/proposal-class-fields) and [Static Properties](https://github.com/tc39/proposal-static-class-features) (part of stage 3 proposal)
- and more!



### TypeScript Features

Next.jsには、TypeScriptのサポートが組み込まれています。



### Customizing Babel Config (Advanced)

babelの設定をカスタマイズすることができます。