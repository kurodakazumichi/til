# Script Component

Next.js Scriptコンポーネントは、サードパーティ製スクリプトの読み込み優先度を設定することで、開発者の作業時間を短縮し、読み込みパフォーマンスを向上させることができます。

Webサイトでは、分析、広告、カスタマーサポートウィジェット、同意管理などのためにサードパーティを必要とすることがよくあります。しかし、これらのスクリプトは読み込みパフォーマンスが重くなりがちで、ユーザーエクスペリエンスを低下させる原因となります。開発者は、最適なロードを実現するために、アプリケーションのどこにこれらのスクリプトを配置すべきか、悩むことがよくあります。

next/scriptでは、strategyプロパティを定義すれば、Next.jsがスクリプトの読み込みを最適化します。



- beforeInteractive。ボット検出や同意管理など、ページがインタラクティブになる前にフェッチして実行する必要がある重要なスクリプトのためのものです。これらのスクリプトは、サーバーからの最初のHTMLに注入され、セルフバンドルされたJavaScriptが実行される前に実行されます。
- afterInteractive（デフォルト）。タグマネージャやアナリティクスなど、ページがインタラクティブになった後にフェッチして実行できるスクリプト用です。これらのスクリプトは、クライアントサイドに注入され、ハイドレーションの後に実行されます。
- lazyOnload チャットサポートやソーシャルメディアのウィジェットなど、アイドルタイムにロードを待つことができるスクリプト用。

> 注：これらの読み込み方法は、<Script>で囲まれたインラインスクリプトでも同じように動作します。以下のインラインスクリプトの例をご覧ください。



## Usage

これまでは、Next.jsのページのHead内にスクリプトタグを定義する必要がありました。



```jsx
// Before

// pages/index.js
import Head from 'next/head'

function Home() {
  return (
    <>
      <Head>
        <script async src="https://www.google-analytics.com/analytics.js" />
      </Head>
    </>
  )
}
```

next/scriptを使えば、スクリプトをnext/headで囲む必要はありません。また、next/scriptには、読み込み順を保証するクライアントサイドの機能があるため、pages/_document.jsでは使用しないようにしましょう。例えば、以下のようになります。

```jsx
// After

// pages/index.js
import Script from 'next/script'

function Home() {
  return (
    <>
      <Script src="https://www.google-analytics.com/analytics.js" />
    </>
  )
}
```



## Example

### Loading Polyfills

```jsx
import Script from 'next/script'
;<Script
  src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserverEntry%2CIntersectionObserver"
  strategy="beforeInteractive"
/>
```



### Lazy-Loading

```jsx
import Script from 'next/script'
;<Script
  src="https://connect.facebook.net/en_US/sdk.js"
  strategy="lazyOnload"
/>
```



### Executing Code After Loading(`onload`)

```jsx
import Script from 'next/script'
;<Script
  id="stripe-js"
  src="https://js.stripe.com/v3/"
  onLoad={() => {
    this.setState({ stripe: window.Stripe('pk_test_12345') })
  }}
/>
```



### Inline Scripts

```jsx
import Script from 'next/script'

<Script strategy="lazyOnload">
  {`document.getElementById('banner').removeClass('hidden')`}
</Script>

// or

<Script
  dangerouslySetInnerHTML={{
    __html: `document.getElementById('banner').removeClass('hidden')`
  }}
/>
```



### Forwarding Attributes

```jsx
import Script from 'next/script'
;<Script
  src="https://www.google-analytics.com/analytics.js"
  id="analytics"
  nonce="XUENAJFW"
  data-test="analytics"
/>
```

