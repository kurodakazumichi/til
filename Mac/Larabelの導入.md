# Composerの準備

LaravelはComposerを使ってインストールするので
まずComposerを使えるようにしておく。

[composerの導入はこちら](https://github.com/kurodakazumichi/til/blob/master/Mac/composer%E3%81%AE%E5%B0%8E%E5%85%A5.md)

# Laravelインストーラーの入手

以下を実行
```bash
composer global require laravel/installer
```

> Changed current directory to /Users/puyan/.composer
> Using version ^3.0 for laravel/installer
> ./composer.json has been created
> Loading composer repositories with package information
> Updating dependencies (including require-dev)
> Your requirements could not be resolved to an installable set of packages.
> 
>   Problem 1
>     - laravel/installer v3.0.1 requires ext-zip * -> the requested PHP extension zip is missing from your system.
>     - laravel/installer v3.0.0 requires ext-zip * -> the requested PHP extension zip is missing from your system.
>     - Installation request for laravel/installer ^3.0 -> satisfiable by laravel/installer[v3.0.0, v3.0.1].
> 
> 
> Installation failed, deleting ./composer.json.

なんかエラーでちゃった。
PHP拡張の`ext-zip`が入ってないとのこと。
いれよう。

`ext-zip`は`brew`でいれるのが主流っぽいが
PHPはmacのデフォルトのやつなのでなんか気持ち悪い。

まずは`brew`でPHPを入れ直そう。  
[PHPの入れ直しはこちら](https://github.com/kurodakazumichi/til/blob/master/Mac/php%E3%81%AE%E5%B0%8E%E5%85%A5.md)

無理だろうけど、一応もう一度Laravelインストーラーの入手にチャレンジ

以下を実行
```bash
composer global require laravel/installer
```

あれ、インストールできちゃった。
(PHP@7.3を入れただけだけど、拡張も含まれてたんかな？)

わからない、まだ油断は禁物

# larabelインストーラーにパスを通す

`~/.composer/vender`に各種パッケージが入ってるのでここにパスを通す
`echo 'export PATH=$PATH:$HOME/.composer/vendor/bin' >> ~/.bash_profile`

# 試しにLaravel

```bash
cd ~/
laravel new blog
cd blog

# 開発サーバー起動
php artisan serve
```
