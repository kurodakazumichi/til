# トラブルシューティング

WSL2 + Docker for Windows

Docker ホストはUbuntu



## Win⇔コンテナ間のファイル共有は重い

1ファイルくらいの共有であれば気にならないが、開発してるプログラム一式などをWindows側に置いておいて、コンテナにマウントするという手法はかなり遅い。

基本はDockerホスト上にファイルを配置しておくのが推奨。

問題となるのはファイルの編集はWindows側でしたいが、肝心のファイルがUbuntuにあるということ。

ここでVSCodeの拡張である「Remote WSL」を使う。

この拡張を入れた状態でUbuntu上からVSCodeで開きたいディレクトリ移動して、以下のコマンドよりVS Codeを起動する。

```
code .
```

こうすると、Windows上でVS Codeが起動し、普段通りにファイル編集が可能。

この作業は初回だけでいいが、一度DockerホストからVSCodeを起動するのが大事らしい。

次回以降は普通にVSCodeを開いて、F1を押すと、検索フォームが出るのでUbuntuなど実行した環境を検索して実行する。

https://qiita.com/_masa_u/items/d3c1fa7898b0783bc3ed



## ホストとコンテナでユーザID、グループIDが異なる

Dockerでコンテナを起動すると、そのコンテナはrootユーザで動いていたりする。

コンテナ内でファイルを作成したりすると、ファイルの所有権がルートになり、Dockerホスト側から操作できなくなるなどがおこる。



そういう場合は、コンテナのユーザとホストのユーザが一致するようにしたい。

その方法の１つとして、コンテナ起動時に`-u`オプションを付けるとコンテナのユーザやグループを指定してコンテナを起動できる。



ただ、コンテナ側に存在しないユーザやグループだったりするので

ホスト側の`/etc/passwd`、`/etc/group`をコンテナにマウントしておく。



今回は`docker compose`で起動していたので、`docker-compose.yml`にユーザやマウントの設定を記述する方法をとった。



```
  app:
    build: ./infra/php
    user: "${UID}:${GID}"
    volumes:
      - ./backend:/work
      - /etc/passwd:/etc/passwd:ro
      - /etc/group:/etc/group:ro
```

`:ro`はリードオンリーの指定

また${UID}とかは環境変数を参照している。



`docker compose up -d`をする前に、UID、GIDにユーザIDとグループIDを設定してから起動する感じになる。

```
export UID=$(id -u)
export GID=$(id -g)
docker compose up -d
```



しかし無理やり`/etc/passwd`とかをマウントしてるだけだから、コンテナ起動時にホストと同じユーザを追加する方が、いいのかもしれないな。