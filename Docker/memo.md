# Docker メモ

## Dockerの主要な要素

| 要素           | 解説                                                         |
| -------------- | ------------------------------------------------------------ |
| コンテナ       | WebサーバーとかDBサーバーみたいな環境、コンテナ１つが1環境って感じ。 |
| イメージ       | コンテナの元になるもの                                       |
| ボリューム     | DockerEngine上に確保したストレージ領域のようなもの           |
| ネットワーク   | DockerEngineが管理するネットワーク                           |
| Docker Compose | 複数のコンテナを管理する仕組み                               |



## Docker Hub 主要イメージと起動コマンド

### httpd:2.4

```
docker run -dit \
--name [コンテナ名] \
-p 8080:80 \
-v [ホストディレクトリ]:/usr/local/apache2/htdocs \
httpd:2.4
```



### golang:1.13

```
# 指定したフォルダにあるgoのプログラムをビルドするだけ(ビルド後にコンテナは破棄)
docker run --rm \                     # 実行後に破棄
-v [ホストディレクトリ]:/usr/src/myapp \ # ビルドするプログラムのフォルダを指定
-w /usr/src/myapp golan:1.13 \        # 出力するコンテナのフォルダを指定
go build -v
```



### mysql:5.7.16

```
# mysqlを用意
docker run -dit \
--name [コンテナ名] \
-v [マウント元]:[マウント先] \
-e MYSQL_ROOT_PASSWORD=[your password] \
mysql:5.7.16
```



## container コマンド

docker containerに関するコマンド一覧

| 利用度 | コマンド | 解説                                                         |
| ------ | -------- | ------------------------------------------------------------ |
| ★      | ls       | コンテナのリスト                                             |
| ★      | run      | コマンドを新しいコンテナで実行                               |
| ★      | create   | 新しくコンテナを作成します。                                 |
| ★      | start    | 停止中の1つまたは複数のコンテナを起動                        |
| ★      | stop     | 実行中の1つまたは複数のコンテナを停止                        |
| ★      | rm       | 1つまたは複数のコンテナを削除する                            |
| ★      | exec     | 実行中のコンテナでコマンドを実行します。                     |
| ★      | cp       | コンテナとローカルファイルシステムの間でファイル/フォルダをコピーします。 |
|        | attach   | 実行中のコンテナにローカルの標準入力、出力、エラーストリームを取り付けます。 |
|        | commit   | コンテナの変更内容から新しいイメージを作成します。           |
|        | export   | コンテナのファイルシステムを tar アーカイブとしてエクスポートします。 |
|        | inspect  | 1つまたは複数のコンテナの詳細情報を表示します。              |
|        | logs     | コンテナのログを取得します。                                 |
|        | port     | コンテナのポートマッピングまたは特定のマッピングを一覧表示します。 |
|        | diff     | コンテナのファイルシステム上のファイルやディレクトリの変更を検査します。 |
|        | kill     | 1つまたは複数の実行中のコンテナをキルします。                |
|        | prune    | 停止しているコンテナを全て破棄する。                         |
|        | rename   | コンテナの名前を変更します。                                 |
|        | restart  | １つまたは複数のコンテナを再開します。                       |
|        | top      | コンテナの実行中のプロセスを表示                             |
|        | stats    | コンテナのリソース使用統計のライブストリームを表示           |
|        | pause    | 1つまたは複数のコンテナ内のすべてのプロセスを一時停止します。 |
|        | unpause  | 1つまたは複数のコンテナ内のすべてのプロセスを一時停止する    |
|        | update   | 1つまたは複数のコンテナの構成を更新                          |
|        | wait     | 1つまたは複数のコンテナが停止するまでブロックし、その終了コードを表示 |



```
# Docker Imageを取得、コンテナ作成・起動を1セットで行うコマンド
# -d バックグラウンド
# -p ポートマッピング
# -v バインドボリューム
# --name コンテナ名
docker container run -d -it --name [コンテナ名] -p [ホスト:コンテナ] -v [ホスト:コンテナ] [イメージ]

# docker container run -d -it --name [コンテナ名] -p [ホスト:コンテナ] -v [ホスト:コンテナ] [イメージ]
# ↓ 以下と同等
docker image pull [イメージ]
docker container create -dit [コンテナ名] -p [ホスト:コンテナ] -v [ホスト:コンテナ]
docker container start [コンテナ名]
```



```
# コンテナの一覧を表示する
# -a 実行されていないコンテナも含めて表示する
docker container ps -a
```



```
# コンテナを停止する
docker container stop [コンテナ名 or コンテナID]
```



```
# コンテナを再開する
docker continaer start [コンテナ名 or コンテナID]
```



```
# コンテナを削除する
docker container rm [コンテナ名 or コンテナID]
```



```
# コンテナの作成
# よくつけるオプションは以下
# --name コンテナ名
# -p ポートマッピング
# -v バインドボリューム
docker create [オプション] [イメージ名 or イメージID] [実行したいコマンド]
```



```
# コンテナに端末をアタッチする
docker container attach [コンテナ名 or コンテナID]
```



```
# コンテナ上でコマンドを実行する
docker container exec -it [コンテナ名 or コンテナID] [コマンド]
```



## Image コマンド

docker imageに関するコマンド

| 利用度 | コマンド | 解説                                                         |
| ------ | -------- | ------------------------------------------------------------ |
| ★      | ls       | イメージを一覧表示する。                                     |
| ★      | pull     | イメージやリポジトリをレジストリから引き出す。               |
| ★      | rm       | 1つまたは複数のイメージを削除する。                          |
|        | build    | Dockerfileからイメージを構築する。                           |
|        | history  | イメージの履歴を表示する。                                   |
|        | import   | tarからコンテンツをインポートしてファイルシステムイメージを作成する。 |
|        | inspect  | １つまたは複数のイメージの詳細情報を表示。                   |
|        | load     | tarアーカイブまたはstdinからイメージを読み込む               |
|        | prune    | 未使用のイメージを削除する。                                 |
|        | push     | イメージやリポジトリをレジストリにプッシュする。             |
|        | save     | 1つまたは複数のイメージをtarアーカイブに保存する(デフォルトではstdoutにストリームされる) |
|        | tag      | source imageを参照するタグ target imageを作成する。          |



```
# dockerイメージの一覧を表示
docker image ls
```



```
# docker イメージを取得する
docker pull [イメージ名 or イメージID]
```



```
# dockerイメージを破棄する
docker image rm [イメージ名 or イメージID]
```



## Volumeコマンド

| 利用度 | コマンド | 解説                                                   |
| ------ | -------- | ------------------------------------------------------ |
| ★      | create   | ボリュームを作成する                                   |
| ★      | inspect  | ボリュームの詳細情報を確認する                         |
| ★      | ls       | ボリューム一覧を参照する                               |
|        | prune    | コンテナからマウントされてないボリュームを全て削除する |
|        | rm       | ボリュームを削除する                                   |

```
# docker volumeの一覧を表示
docker volume ls
```



```
# docker volumeを作成する
docker volume create --name [ボリューム名]
```







## コンテナ作成時によく使うオプション -dit

- -d：デタッチモード、端末と切り離した状態でバックグラウンドで実行する。
- -i：インタラクティブモード。標準入出力、及び標準エラー出力をコンテナに連結する。
- -t：疑似端末(pseudo-tty)を割り当てる、カーソル移動や文字削除などを出来るようにことになるらしい。



## 省略コマンド

| 完全                   | 省略         |
| ---------------------- | ------------ |
| docker container run   | docker run   |
| docker container ps    | docker ps    |
| docker container start | docker start |
| docker container stop  | docker stop  |
| docker container logs  | docker logs  |
| docker image rm        | docker rmi   |





## データの永続化

### コピー

```
# ホスト→コンテナへのコピー
docker cp [オプション] [コピー元のパス] [コンテナ名:コピー先のパス]

# コンテナ→ホストへのコピー
docker cp [オプション] [コンテナ名:コピー元のパス] [コピー先のパス]

# -a ユーザID、グループIDを保ったままコピー
# -L コピー元のシンボリックリンクをたどる
```



### バインドマウント

```
# httpdを使う例
docker run -dit --name [コンテナ名] -v [マウント元のパス]:[マウント先のパス] httpd:2.4

# マウントは--mountで指定する事もできる
docker run -dit --name [コンテナ名] --mount type=bind,src[マウント元],dst=[マウント先]
```



### ボリュームマウント

```
# mysqlを使う例
docker run -dit --name [コンテナ名] -v [ボリューム名]:[マウント先のパス] -e MYSQL_ROOT_PASSWORD=root2 mysql:5.7

# マウントは--mountで指定する事もできる
docker run -dit --name [コンテナ名] --mount type=volume, src=マウント元, dst=マウント先
```



## Docker Compose

Docker ComposeはPython製のライブラリで、Docker Engineに含まれるものではない。

そのため別途インストールが必要。



> WSL2に入れたUbuntu18.xxだといろいろと足りてない状態だったようで色々と苦労した。
>
> まず最初に以下のコマンドを実行しておく。
>
> 
>
> apt update
>
> apt upgrade
>
> 
>
> package managerを更新しておかないと、もろもろエラーがでたりする。



```
# python3 と python3-pipを入れる
sudo apt install -y python3 python3-pip

# Docker Composeをインストールする
sudo pip3 install docker-compose
```



**docker-compose.yml**

```yaml
version: "3"

services:
  wordpress-db:
    image: mysql:5.7.16
    networks:
      - wordpressnet
    volumes:
      - /mnt/d/docker/wp/db:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: wordpressdb
      MYSQL_USER: wordpressuser
      MYSQL_PASSWORD: wordpresspass

  wordpress-app:
    depends_on:
      - wordpress-db
    image: wordpress
    networks:
      - wordpressnet
    ports:
      - 8080:80
    restart: always
    environment:
      WORDPRESS_DB_HOST: wordpress-db
      WORDPRESS_DB_NAME: wordpressdb
      WORDPRESS_DB_USER: wordpressuser
      WORDPRESS_DB_PASSWORD: wordpresspass

networks:

  wordpressnet:
```



## 試したやつ

### WindowsのディレクトリをマウントしたMySQL環境

1. Windowsに`/D/docker/db`を用意しておく
2. Ubuntuで以下のコマンドを実行する

```
# mysqlコンテナを起動(MYSQL_ROOT_PASSWORDはなんか効かないけど一応指定してる)
docker run -dit --name db01 --mount type=bind,src=/mnt/d/docker/db:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root mysql:5.7.16

# mysqlコンテナに入る
docker exit -it db01 /bin/bash

# mysqlに入る(passwordはroot)
mysql -p

# 適当なテーブル作って適当なデータを入れる例
CREATE DATABASE sample;
use sample;
CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY(id));
INSERT INTO users (name) VALUES ('user01');
INSERT INTO users (name) VALUES ('user02');
```



### WordPress

```
# ネットワークを用意
docker network create wordpressnet

# MySQLコンテナを作成
docker run --name wordpress-db -dit --mount type=bind,src=/mnt/d/docker/wp/db,dst=/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=wordpressdb -e MYSQL_USER=wpuser -e MYSQL_PASSWORD=wppass --net wordpressnet mysql:5.7.16

# WordPressコンテナを作成
docker run --name wordpress-app -dit -p 8080:80 -e WORDPRESS_DB_HOST=wordpress-db -e WORDPRESS_DB_NAME=wordpressdb -e WORDPRESS_DB_USER=wpuser -e WORDPRESS_DB_PASSWORD=wppass --net wordpressnet wordpress
```



## トラブルシューティング

・MySQLでWindowsのディレクトリをマウントしたらコンテナが起動しなかった

mysql:5.7をだとパーミッションの関係でうまくいかならしい、mysql:5.7.16ならうまくいくと情報を得たのでやってみたらうまくいった。



・imageとかvolumeのある`/var/lib/docker/overlay2`ってどこ？

Ubuntuにはそんなディレクトリが存在しなかったが、Twitterの神様からもらった記事にその答えは書いてあった。

https://note.com/w0o0ps/n/n9bc1bcd9fa59

詳細は記事読めって事にしておくけど、DockerはVM上で動作してて、imageとかはそのVM上のマシンの方にあるからそっち見ろやということらしい。

以下のコマンドは、そのVM上のコンテナ？マシン？環境に入るためのコンテナ導入して起動するスクリプト。

これやるとshellが起動するから、そこで`ls /var/lib/docker`して無事あった。

```
docker run -it --privileged --pid=host debian nsenter -t 1 -m -u -n -i sh
```



・mysql:5.7.16のDockerイメージ、環境変数MYQL_ROOT_PASSWORDが効いてない

どうも調べたら効いてないからDockerfileを編集しろってなってるくさいな。

しかしDockerfileどこよっていう、



