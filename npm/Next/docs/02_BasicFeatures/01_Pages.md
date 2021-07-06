# Pages

> このドキュメントは、Next.jsのバージョン9.3以降を対象としています。古いバージョンのNext.jsをお使いの方は、以前のドキュメントをご参照ください。

Next.jsでは、ページはpagesディレクトリにある.js、.jsx、.ts、.tsxファイルからエクスポートされたReact Componentです。各ページは、そのファイル名に基づいてルートに関連付けられています。

例を挙げます。以下のようなReactコンポーネントをエクスポートしたpages/about.jsを作成すると、/aboutでアクセスできるようになります。

```jsx
function About() {
  return <div>About</div>
}

export default About
```



## 動的ページ

Next.jsは、動的なルートを持つページに対応しています。例えば、pages/posts/[id].jsというファイルを作成した場合、posts/1、posts/2などでアクセス可能になります。

> ダイナミックルーティングの詳細については、[ダイナミックルーティングのドキュメント](https://nextjs.org/docs/routing/dynamic-routes)をご確認ください。



## Pre-rendering

デフォルトでは、Next.jsはすべてのページをプリレンダーします。これは、Next.jsが、クライアントサイドのJavaScriptですべてを処理するのではなく、あらかじめ各ページのHTMLを生成しておくということです。プリレンダリングを行うことで、パフォーマンスやSEOの向上につながります。

生成された各HTMLには、そのページに必要な最小限のJavaScriptコードが関連付けられています。ページがブラウザに読み込まれると、そのJavaScriptコードが実行され、ページが完全にインタラクティブになります。このプロセスはハイドレーションと呼ばれています）。



### プリレンダリングの2つの形態

Next.jsには、2つのプリレンダリングの形式があります。「Static Generation」と「Server-side Rendering」です。その違いは、ページのHTMLを生成するタイミングにあります。



- 静的生成（推奨）。HTMLはビルド時に生成され、各リクエストで再利用されます。

- サーバーサイド・レンダリング。リクエストごとにHTMLが生成される。



重要なのは、Next.jsでは、ページごとにどのプリレンダリングフォームを使用するかを選択できることです。ほとんどのページでは静的生成を使用し、その他のページではサーバーサイドレンダリングを使用することで、「ハイブリッド」なNext.jsアプリを作成することができます。

パフォーマンス上の理由から、サーバーサイドレンダリングよりも静的生成を使用することをお勧めします。静的生成されたページは、追加の設定をしなくてもCDNにキャッシュされ、パフォーマンスが向上します。ただし、場合によっては、サーバーサイドレンダリングが唯一の選択肢となることもあります。

静的生成やサーバーサイドレンダリングと同時に、クライアントサイドレンダリングを使用することもできます。つまり、ページの一部をクライアントサイドJavaScriptで完全にレンダリングすることができるのです。詳細については、データフェッチのドキュメントをご覧ください。



## Static Generation (オススメ)

- [WordPress Example](https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress) ([Demo](https://next-blog-wordpress.vercel.app/))
- [Blog Starter using markdown files](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) ([Demo](https://next-blog-starter.vercel.app/))
- [DatoCMS Example](https://github.com/vercel/next.js/tree/canary/examples/cms-datocms) ([Demo](https://next-blog-datocms.vercel.app/))
- [TakeShape Example](https://github.com/vercel/next.js/tree/canary/examples/cms-takeshape) ([Demo](https://next-blog-takeshape.vercel.app/))
- [Sanity Example](https://github.com/vercel/next.js/tree/canary/examples/cms-sanity) ([Demo](https://next-blog-sanity.vercel.app/))
- [Prismic Example](https://github.com/vercel/next.js/tree/canary/examples/cms-prismic) ([Demo](https://next-blog-prismic.vercel.app/))
- [Contentful Example](https://github.com/vercel/next.js/tree/canary/examples/cms-contentful) ([Demo](https://next-blog-contentful.vercel.app/))
- [Strapi Example](https://github.com/vercel/next.js/tree/canary/examples/cms-strapi) ([Demo](https://next-blog-strapi.vercel.app/))
- [Prepr Example](https://github.com/vercel/next.js/tree/canary/examples/cms-prepr) ([Demo](https://next-blog-prepr.vercel.app/))
- [Agility CMS Example](https://github.com/vercel/next.js/tree/canary/examples/cms-agilitycms) ([Demo](https://next-blog-agilitycms.vercel.app/))
- [Cosmic Example](https://github.com/vercel/next.js/tree/canary/examples/cms-cosmic) ([Demo](https://next-blog-cosmic.vercel.app/))
- [ButterCMS Example](https://github.com/vercel/next.js/tree/canary/examples/cms-buttercms) ([Demo](https://next-blog-buttercms.vercel.app/))
- [Storyblok Example](https://github.com/vercel/next.js/tree/canary/examples/cms-storyblok) ([Demo](https://next-blog-storyblok.vercel.app/))
- [GraphCMS Example](https://github.com/vercel/next.js/tree/canary/examples/cms-graphcms) ([Demo](https://next-blog-graphcms.vercel.app/))
- [Kontent Example](https://github.com/vercel/next.js/tree/canary/examples/cms-kontent) ([Demo](https://next-blog-kontent.vercel.app/))
- [Static Tweet Demo](https://static-tweet.vercel.app/)

ページが静的生成を使用している場合、ページのHTMLはビルド時に生成されます。つまり、本番環境では、次のビルドを実行したときにページのHTMLが生成されます。このHTMLは、各リクエストで再利用されます。また、CDNでキャッシュすることも可能です。

Next.jsでは、データを含むページも含まないページも静的に生成できます。それぞれのケースを見てみましょう。



### Static Generation without data

デフォルトでは、Next.jsはStatic Generationを使って、データを取得せずにページをプリレンダリングします。以下はその例です。

```jsx
function About() {
  return <div>About</div>
}

export default About
```

なお、このページではプリレンダリングのために外部データを取得する必要はありません。このような場合、Next.jsはビルド時に1ページにつき1つのHTMLファイルを生成します。



### Static Generation with data

一部のページでは、プリレンダリングのために外部データを取得する必要があります。これには2つのシナリオがあり、どちらか、あるいは両方が当てはまります。いずれの場合も、Next.jsが提供する特別な機能を使うことができます。

- ページのコンテンツが外部データに依存している。getStaticPropsを使用します。

- ページのパスが外部のデータに依存している場合。getStaticPathsを使います（通常はgetStaticPropsに加えて使います）。

  

#### シナリオ1：ページの内容が外部データに依存している場合

例 ブログページでは、CMS（コンテンツマネジメントシステム）からブログ記事の一覧を取得する必要があるかもしれません。

```jsx
// TODO: Need to fetch `posts` (by calling some API endpoint)
//       before this page can be pre-rendered.
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

export default Blog
```

プリレンダーでこのデータを取得するために、Next.jsでは同じファイルからgetStaticPropsという非同期関数をエクスポートすることができます。この関数はビルド時に呼び出され、取得したデータをプリレンダーのページのpropsに渡すことができます。

```jsx
function Blog({ posts }) {
  // Render posts...
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default Blog
```

getStaticPropsの仕組みについては、Data Fetchingのドキュメントをご覧ください。



#### シナリオ2：ページパスが外部データに依存している場合

Next.jsでは、動的なルートを持つページを作成することができます。たとえば、pages/posts/[id].jsというファイルを作成して、idに基づいて1つのブログ記事を表示することができます。これにより、posts/1にアクセスすると、id:1のブログ記事を表示することができます。

しかし、ビルド時にどのIDをプリレンダーにするかは、外部データに依存する場合があります。

例：データベースに1つのブログ記事（id:1）しか追加していないとします。この場合、構築時にはposts/1のみを事前にレンダリングしたいと思います。

その後、id:2の2つ目の記事を追加したとしたら、posts/2もプリレンダリングしたいと思います。

このように、プリレンダリングされたページパスは、外部データに依存しています。この問題を解決するために、Next.jsでは動的ページ（この例ではpages/posts/[id].js）からgetStaticPathsという非同期関数をエクスポートすることができます。この関数はビルド時に呼び出され、プリレンダリングを行いたいパスを指定できます。

```jsx
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
```



また、pages/posts/[id].jsでは、getStaticPropsをエクスポートする必要があります。これにより、このidを持つポストに関するデータを取得し、それを使ってページをプリレンダリングすることができます。

```jsx
function Post({ post }) {
  // Render post...
}

export async function getStaticPaths() {
  // ...
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}

export default Post
```



### Static Generationはどのような場合に使用するのですか？

ページを一度構築してCDNで配信することで、リクエストごとにサーバーがページをレンダリングするよりもはるかに高速になるため、可能な限りStatic Generation（データあり、データなし）を使用することをお勧めします。

Static Generationは、以下のような様々なタイプのページに使用できます。



- マーケティングページ
- ブログ記事
- Eコマースの製品リスト
- ヘルプとドキュメント



自分自身に問いかけてみてください。"ユーザーが要求する前に、このページを事前にレンダリングすることはできますか？" 答えがイエスであれば、Static Generationを選択すべきでしょう。

逆に、ユーザーの要求に先立ってページをプリレンダリングできない場合は、Static Generationは良いアイデアではありません。たとえば、頻繁に更新されるデータを表示するページでは、リクエストのたびにページの内容が変わります。

このような場合には、以下のいずれかの方法が考えられます。

- クライアントサイドレンダリングによる静的生成を使用する。ページの一部を事前にレンダリングせずに、クライアントサイドのJavaScriptを使って入力することができます。この方法の詳細については、Data Fetchingのドキュメントを参照してください。
- サーバーサイドのレンダリングを使用する。Next.jsは、リクエストごとにページをプリレンダリングします。CDNでページをキャッシュできないため、処理速度は遅くなりますが、プリレンダリングされたページは常に最新の状態に保たれます。この方法については後述します。



## Server-side Rendering

ページがサーバーサイドレンダリングを使用している場合は、リクエストごとにページのHTMLが生成されます。

ページにサーバーサイドレンダリングを使用するには、getServerSidePropsという非同期関数をエクスポートする必要があります。この関数は、リクエストごとにサーバーから呼び出されます。

例えば、頻繁に更新されるデータ（外部APIからフェッチされたもの）を事前にレンダリングする必要があるとします。以下のように、データを取得してページに渡すgetServerSidePropsを書くことができます。

```jsx
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page
```

ご覧の通り、getServerSidePropsはgetStaticPropsと似ていますが、getServerSidePropsはビルド時ではなく、すべてのリクエストに対して実行されるという違いがあります。

getServerSidePropsがどのように動作するかについての詳細は、Data Fetchingドキュメントをご覧ください。



## Summary

ここまで、Next.jsのプリレンダリングの2つの形態について説明してきました。

- 静的生成（推奨）。HTMLはビルド時に生成され、各リクエストで再利用されます。ページにStatic Generationを使用するには、ページコンポーネントをエクスポートするか、getStaticProps（および必要に応じてgetStaticPaths）をエクスポートします。この機能は、ユーザーのリクエストに先立ってプリレンダリングを行うページに最適です。また、クライアントサイドレンダリングと併用して、追加データを取り込むこともできます。
- サーバーサイド・レンダリング。リクエストごとにHTMLが生成されます。ページでサーバーサイドレンダリングを使用するには、getServerSidePropsをエクスポートします。Server-side RenderingはStatic Generationに比べてパフォーマンスが低下するため、絶対に必要な場合にのみ使用してください。

