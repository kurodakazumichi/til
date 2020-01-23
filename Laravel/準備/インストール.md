[Laravelの導入はこちら](https://github.com/kurodakazumichi/til/blob/master/Mac/Larabel%E3%81%AE%E5%B0%8E%E5%85%A5.md)

ここを見ながら進める。
https://readouble.com/laravel/6.x/ja/installation.html
導入したLaravelのバージョン：`6.12.0'

# Laravelプロジェクトを作成

Syntax:`laravel new プロジェクト名`

```bash
laravel new blog
```

`blog`ディレクトリに以下のファイルが作成される。

```
.
├── README.md
├── app
├── artisan
├── bootstrap
├── composer.json
├── composer.lock
├── config
├── database
├── package-lock.json
├── package.json
├── phpunit.xml
├── public
├── resources
├── routes
├── server.php
├── storage
├── tests
├── vendor
└── webpack.mix.js
```


# 開発サーバーを起動する

```bash
cd blog
php artisan serve
```

サーバーが立ち上がり、`http::localhost:8000`でアクセス可能になる。

# Publicディレクトリ
webルートが`public`になるようにとのことだが、開発サーバーなのでシカト

# 設定ファイル
必要になったら見る

# ディレクトリパーミッション
開発サーバーなので特に問題なし

# アプリケーションキー
`.env`にアプリケーションキーを設定する

が、これもLarabelインストーラーを使って構築した時点で自動で設定されてるのでOK

# 主要な設定項目を変更

`config/app.php`

```diff
- 'name' => env('APP_NAME', 'Laravel'),
+ 'name' => env('APP_NAME', 'Nekonecode'),

- 'timezone' => 'UTC',
+ 'timezone' => 'Asia/Tokyo',

- 'locale' => 'en',
+ 'locale' => 'ja',

- 'faker_locale' => 'en_US',
+ 'faker_locale' => 'ja_JP',
```

