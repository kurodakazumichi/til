# Best practices for writing Dockerfile

https://docs.docker.com/develop/develop-images/dockerfile_best-practices/

このドキュメントでは、効率的なDockerイメージを構築するために推奨されるベストプラクティスとその方法を説明しています。



Dockerは、Dockerfileの内容を読み込んでイメージを自動的に構築します。

Dockerfileは、指定されたイメージを構築するために必要なすべてのコマンドを順番に記述したテキストファイルです。

Dockerfileは、Dockerfileリファレンスに記載されている特定のフォーマットと命令セットに従っています。



Dockerイメージは、それぞれがDockerfile命令を表す読み取り専用のレイヤーで構成されています。



レイヤーは積み重ねられ、それぞれのレイヤーは前のレイヤーからの変更の差分となります。このDockerfileを考えてみましょう。



```
# syntax=docker/dockerfile:1
FROM ubuntu:18.04
COPY . /app
RUN make /app
CMD python /app/app.py
```



1つの命令で1つのレイヤーを作ります

- `FROM` `ubuntu:18.04`のDockerイメージからレイヤーを作成します。
- `COPY` adds files from your Docker client’s current directory.
- `RUN` builds your application with `make`.
- `CMD` specifies what command to run within the container.



イメージを実行してコンテナを生成すると、下層のレイヤーの上に新しい書き込み可能なレイヤー（「コンテナレイヤー」）が追加されます。新しいファイルの書き込み、既存のファイルの修正、ファイルの削除など、実行中のコンテナに加えられたすべての変更は、この書き込み可能なコンテナレイヤーに書き込まれます。

イメージレイヤー（およびDockerがイメージを構築・保存する方法）の詳細については、「ストレージドライバーについて」を参照してください。



## 一般的なガイドラインと推奨事項

### 使い捨てコンテナの作成

### ビルド・コンテキストの理解

### Dockerfileを標準入力でパイプする

### 標準入力からDockerfileを使用して、ビルドコンテキストを送信せずにイメージをビルドする

### 標準入力のDockerfileを使って、ローカルのビルドコンテキストからビルドする

### 標準入力のDockerfileを使用したリモートビルドコンテキストからのビルド

### .dockerignoreで除外します。

### マルチステージでの構築

### 不要なパッケージをインストールしない

### デカップリングアプリケーション

### レイヤー数の最小化

### 複数行引数のソート

### ビルドキャッシュの活用



## ドッカーファイルの説明

### FROM

### LABEL

### RUN

#### apt-get

### Using pipes

### CMD

### EXPOSE

### ENV

### ADD or COPY

### ENTRYPOINT

### VOLUME

### USER

### WORKDIR

### ONBUILD

## Examples for Official Images

## Additional resources



散歩したり、縄跳びしたり

最近は熱さで食欲も落ちている。

Why did I gain weight?



