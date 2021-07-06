# Static File Serving

Next.jsでは、画像などの静的なファイルを、ルートディレクトリ内のpublicというフォルダに格納して提供することができます。public内のファイルは、ベースURL（/）を起点にコードから参照することができます。

例えば、public/me.pngに画像を追加した場合、次のようなコードで画像にアクセスできます。

```jsx
import Image from 'next/image'

function Avatar() {
  return <Image src="/me.png" alt="me" width="64" height="64" />
}

export default Avatar
```

> 注：next/imageにはNext.js 10以降が必要です。

このフォルダは、robots.txt、favicon.ico、Google Site Verification、およびその他の静的ファイル（.htmlを含む）にも便利です。



> 注：パブリック・ディレクトリには他の名前を付けないでください。この名前は変更することができず、静的資産を提供するための唯一のディレクトリとなります。



> 注意：pages/ディレクトリにあるファイルと同じ名前のスタティックファイルを作らないように注意してください（エラーになります）。
>
> 続きを読む: https://nextjs.org/docs/messages/conflicting-public-file-page



> 注意：Next.jsが提供するのは、ビルド時に公開ディレクトリにあるアセットのみです。ランタイムに追加されたファイルは利用できません。ファイルの永続的な保存には、AWS S3などのサードパーティのサービスを利用することをお勧めします。

