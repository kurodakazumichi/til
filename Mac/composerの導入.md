# イントロダクション
ComposerはPHPの依存関係を管理するためのツール。
プロジェクトで使用するライブラリを定義しておき、それらをインストールしたりアップデートしたりします。

# 依存関係管理
Composerは、yumやAptと同じ類のものではなくて
パッケージやライブラリをプロジェクト毎のディレクトリにインストールする。

基本的にグローバルな場所に何かをインストールしたりはしない。
(一応グローバルコマンドを使ってグローバル的な扱いもできるけどね)

Nodeのnpmとかに影響されてます。


# システム要件

- PHP5.3.2以降が必要

# インストール

さくっと現在のフォルダにインストールするなら、ターミナルでこのスクリプト打ちましょう。
そうでないならスクリプト打つ前にこのページを最後まで読みましょう。

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'c5b9b6d368201a9db6f74e2611495f369991b72d9c8cbd3ffbc63edff210eb73d46ffbfce88669ad33695ef77dc76976') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

1. このスクリプトはいくつか、`php.ini`の設定をチェックし、正しくない場合は警告がでる。
2. そして現在のディレクトリに最新の`composer.phar`をダウンロードする。

やってることは以下の4つ

- インストーラーを現在のディレクトリにダウンロードする
- SHA-384によるチェック。
- インストーラー実行
- インストーラー削除

# インストーラーオプション

## インストール先

`--install-dir`オプションを使用してターゲットディレクトリを提供することにより、composerを特定のディレクトリにインストールできる。

etc:`php composer-setup.php --install-dir=bin`

## インストーラーファイル名の指定

`--filename`オプションをしていしてファイル名を指定することができる。
`php composer-setup.php --filename=composer`

## バージョンを指定する

`--version`オプションを使用して、特定バージョンのComposerをインストールできる。
`php composer-setup.php --version=1.0.0-alpha8`



デフォルトでは、インストーラー(もしくは`composer self-update`した場合)は安定バージョンのみをダウンロードします。
プレリリースバージョンのテストを支援する場合は、インストーラーまたは`self-update`のいずれかで `--preview`フラグを使用できます。
最新のComposerコミットから実行されるスナップショットビルドには、`--snapshot`フラグを使用できます。


# `/usr/local/bin`に配置したかったらこうする

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'c5b9b6d368201a9db6f74e2611495f369991b72d9c8cbd3ffbc63edff210eb73d46ffbfce88669ad33695ef77dc76976') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"

# /usr/local/bin に composer.phar を移動(& リネーム)
sudo mv composer.phar /usr/local/bin/composer
```

ちゃんとできたか確認

```bash
composer --version
```
> Composer version 1.9.2 2020-01-14 16:30:31

OKっぽい


