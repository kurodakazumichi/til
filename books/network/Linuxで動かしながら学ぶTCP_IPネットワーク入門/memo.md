# Linuxで動かしながら学ぶTCP/IPネットワーク入門

## 環境

- Windows 10
- vagrant 2.1.5
- virtual box 5.2.8r121009 → 6.1.22 (のちにUpdateした)

なんかバージョン次第ではうまく動かないらしいけど、とりあえずこの組み合わせは動いた

vagrant 2.0.xだとvagrant sshでずっとpermision deniedがでていた。ファイルの権限だとかVagrantfileの設定だとかいろいろ情報はあったがvagrantをアンインストールしてバージョン上げるだけでいけた。



### トラブル

Docker for Windowsを入れたらVirtual boxのUbuntuが起動しなくなった。



#### 調査

Virtual Boxは仮想化技術 Hyper-Vが有効化された状態だと仮想マシンを起動できない。

Docker入れた時にHyper-Vが有効になったので、Hyper-V無効にすればいいらしい



#### 実行

いろいろ試したけどうまくいかず、VirtualBoxを最新にしたらそれだけでいけた。



## 環境構築

Ubuntu 20.04 LTSの環境構築

```bash
# boxファイル取得
vagrant box add ubuntu/focal64

#適当に作業ディレクトリ作る
mkdir /work
cd work

# 設定ファイル作る
vagrant init ubuntu/focal64

# 仮想マシン起動
vagrant up

# sshでログイン
vagrant ssh
```



## トラブルシューティング

Windowsで

```
tracert 8.8.8.8
```

をするとちゃんと出るのに

virtual box上のubuntuで

```
traceroute 8.8.8.8
```

すると

```
* * *
```

ばっかりになる問題について

https://milestone-of-se.nesuke.com/nw-basic/ip/traceroute/

> 送信に使うプロトコルは ICMP Echo Request ではなく UDP のハイヤーポート 33434 から送信のたびに 1 ずつ増やしていきます。なので FW 上で ICMP を空けている場合、Windows の tracert はできても Linux の traceroute はできない、という状態になります。

FireWallではじいてしまってるっぽい。

`traceroute -I 8.8.8.8`と`-I`つければいける。





## Network Namespace

```bash
# Network Namespaceを追加する
sudo ip netns add [namespace]

# Network Namespaceのリストを表示
ip netns list

# Network Namespace環境でコマンドを実行
sudo ip netns exec [namespace] [command]

# Network Namespaceを削除
sudo ip netns delete [namespace]

# Network Namespaceの環境でシェルを起動
sudo ip netns exec [namespace] bash

# 仮想的なネットワークインターフェース(veth:Virtual Ethernet Device)を作る
sudo ip link add ns1-veth0 type veth peer name ns2-veth0

# ネットワークインターフェイスのリストを表示
ip link show

# vethをNetwork Namespaceと関連付ける
sudo ip link set ns1-veth0 netns ns1
sudo ip link set ns2-veth0 netns ns2

# ネットワークインターフェースにIPアドレスを設定する
sudo ip netns exec ns1 ip address add 192.0.2.1/24 dev ns1-veth0
sudo ip netns exec ns2 ip address add 192.0.2.2/24 dev ns2-veth0

# ネットワークインターフェースを有効にする
sudo ip netns exec ns1 ip link set ns1-veth0 up
sudo ip netns exec ns2 ip link set ns2-veth0 up

# namespaceを削除する(全て)
sudo ip --all netns delete

# namespaceを削除する(単体)
sudo ip netns delete ns1
sudo ip netns delete ns2
```



## シンプルなネットワーク環境を作る

2つのノードを繋げるだけのシンプルな構成を用意する。

### 構成図

```
ns1 --- ns2
```



### 設定

| Namespace | Network Interface | IP           |
| --------- | ----------------- | ------------ |
| ns1       | ns1-veth0         | 192.0.2.1/24 |
| ns2       | ns2-veth0         | 192.0.2.2/24 |



### コマンド

```
# Namespaceを追加
sudo ip netns add ns1
sudo ip netns add ns2

# NIを追加
# ns1-veth0とns2-veth0というLANカードを2つ用意して、LANケーブルでつなぐイメージ
sudo ip link add ns1-veth0 type veth peer name ns2-veth0

# NIとNamespaceの紐づけ
sudo ip link set ns1-veth0 netns ns1
sudo ip link set ns2-veth0 netns ns2

# NIにIPアドレスを付与する
sudo ip netns exec ns1 ip address add 192.0.2.1/24 dev ns1-veth0
sudo ip netns exec ns2 ip address add 192.0.2.2/24 dev ns2-veth0

# NIを有効にする
sudo ip netns exec ns1 ip link set ns1-veth0 up
sudo ip netns exec ns2 ip link set ns2-veth0 up
```



```
# 疎通確認
sudo ip netns exec ns1 ping -c 3 192.0.2.2
```



## ルータを介したネットワーク構成を作る

### 構成図

```
--+------------------+---------------------------- 192.0.2.0/24
  |                  |
  | ns1-veth0        | gw-veth0
  | 192.0.2.1        | 192.0.2.254
 ns1               router
                     | gw-veth1
                     | 198.51.100.254
                     |
--+------------------+---------------------------- 198.51.100.0/24
  |
  | ns2-veth1
  | 198.51.100.1
 ns2
```



### 設定

| Namespace | Network Interface | IP                |
| --------- | ----------------- | ----------------- |
| ns1       | ns1-veth0         | 192.0.2.1/24      |
| ns2       | ns2-veth0         | 198.51.100.1/24   |
| router    | gw-veth0          | 192.0.2.254/24    |
| router    | gw-veth1          | 198.51.100.254/24 |



### コマンド

```
# namespaceを作成
sudo ip netns add ns1
sudo ip netns add ns2
sudo ip netns add router

# NIを作成
sudo ip link add ns1-veth0 type veth peer name gw-veth0
sudo ip link add ns2-veth0 type veth peer name gw-veth1

# NIをNamespaceと紐づける
sudo ip link set ns1-veth0 netns ns1
sudo ip link set ns2-veth0 netns ns2
sudo ip link set gw-veth0 netns router
sudo ip link set gw-veth1 netns router

# NIにIPアドレスを割り当てる
sudo ip netns exec ns1 ip address add 192.0.2.1/24 dev ns1-veth0
sudo ip netns exec ns2 ip address add 198.51.100.1/24 dev ns2-veth0
sudo ip netns exec router ip address add 192.0.2.254/24 dev gw-veth0
sudo ip netns exec router ip address add 198.51.100.254/24 dev gw-veth1

# NIを有効にする
sudo ip netns exec ns1 ip link set ns1-veth0 up
sudo ip netns exec ns2 ip link set ns2-veth0 up
sudo ip netns exec router ip link set gw-veth0 up
sudo ip netns exec router ip link set gw-veth1 up

# ns1のルーティングテーブルにデフォルトルートを追加する
sudo ip netns exec ns1 ip route add default via 192.0.2.254

# ns2のルーティングテーブルにデフォルトルートを追加する
sudo ip netns exec ns2 ip route add default via 198.51.100.254

# routerをルータとして動作するように設定する
sudo ip netns exec router sysctl net.ipv4.ip_forward=1
```



### 疎通確認

```
sudo ip netns exec ns1 ping -c 3 198.51.100.1
```



## もう少し複雑なネットワーク構成

### 構成図

```
--+------------------+---------------------------- 192.0.2.0/24
  |                  |
  | ns1-veth0        | gw1-veth0
  | 192.0.2.1        | 192.0.2.254
 ns1               router1
                     | gw1-veth1
                     | 203.0.113.1
                     |
--+------------------+---------------------------- 203.0.113.0/24
  |
  | gw2-veth0
  | 203.0.113.2
router2
  | gw2-veth1
  | 198.51.100.254
  |
--+------------------+---------------------------- 198.51.100.0/24
                     |
                     | ns2-veth1
                     | 198.51.100.1
                    ns2
```



### 設定

| Namespace | Network Interface | IP                |
| --------- | ----------------- | ----------------- |
| ns1       | ns1-veth0         | 192.0.2.1/24      |
| router1   | gw1-veth0         | 192.0.2.254/24    |
| router1   | gw1-veth1         | 203.0.113.1/24    |
| router2   | gw2-veth0         | 203.0.113.2/24    |
| router2   | gw2-veth1         | 198.51.100.254/24 |
| ns2       | ns2-veth0         | 198.51.100.1/24   |



### コマンド

```
# 設定をクリア
sudo ip -all netns delete

# Namespaceを追加
sudo ip netns add ns1
sudo ip netns add ns2
sudo ip netns add router1
sudo ip netns add router2

# NIを生成
sudo ip link add ns1-veth0 type veth peer name gw1-veth0
sudo ip link add gw1-veth1 type veth peer name gw2-veth0
sudo ip link add ns2-veth0 type veth peer name gw2-veth1

# NIをNamespaceに割り当てる
sudo ip link set ns1-veth0 netns ns1
sudo ip link set gw1-veth0 netns router1
sudo ip link set gw1-veth1 netns router1
sudo ip link set gw2-veth0 netns router2
sudo ip link set gw2-veth1 netns router2
sudo ip link set ns2-veth0 netns ns2

# NIを有効にする
sudo ip netns exec ns1 ip link set ns1-veth0 up
sudo ip netns exec router1 ip link set gw1-veth0 up
sudo ip netns exec router1 ip link set gw1-veth1 up
sudo ip netns exec router2 ip link set gw2-veth0 up
sudo ip netns exec router2 ip link set gw2-veth1 up
sudo ip netns exec ns2 ip link set ns2-veth0 up

# NIにIPアドレスを割り当てる
sudo ip netns exec ns1 ip address add 192.0.2.1/24 dev ns1-veth0
sudo ip netns exec router1 ip address add 192.0.2.254/24 dev gw1-veth0
sudo ip netns exec router1 ip address add 203.0.113.1/24 dev gw1-veth1
sudo ip netns exec router2 ip address add 203.0.113.2/24 dev gw2-veth0
sudo ip netns exec router2 ip address add 198.51.100.254/24 dev gw2-veth1
sudo ip netns exec ns2 ip address add 198.51.100.1/24 dev ns2-veth0

# ns1, ns2のデフォルトルートを設定する
sudo ip netns exec ns1 ip route add default via 192.0.2.254
sudo ip netns exec ns2 ip route add default via 198.51.100.254

# router1,2をルータとして有効にする
sudo ip netns exec router1 sysctl net.ipv4.ip_forward=1
sudo ip netns exec router2 sysctl net.ipv4.ip_forward=1

# router1,2のルーティングテーブルを設定
sudo ip netns exec router1 ip route add 198.51.100.0/24 via 203.0.113.2
sudo ip netns exec router2 ip route add 192.0.2.0/24 via 203.0.113.1
```





## イーサネット

セグメント1個

```
# Namespaceを追加
sudo ip netns add ns1
sudo ip netns add ns2

# NIを追加
# ns1-veth0とns2-veth0というLANカードを2つ用意して、LANケーブルでつなぐイメージ
sudo ip link add ns1-veth0 type veth peer name ns2-veth0

# NIとNamespaceの紐づけ
sudo ip link set ns1-veth0 netns ns1
sudo ip link set ns2-veth0 netns ns2

# NIにIPアドレスを付与する
sudo ip netns exec ns1 ip address add 192.0.2.1/24 dev ns1-veth0
sudo ip netns exec ns2 ip address add 192.0.2.2/24 dev ns2-veth0

# NIを有効にする
sudo ip netns exec ns1 ip link set ns1-veth0 up
sudo ip netns exec ns2 ip link set ns2-veth0 up

# MACアドレスを設定
sudo ip netns exec ns1 ip link set dev ns1-veth0 address 00:00:5E:00:53:01
sudo ip netns exec ns2 ip link set dev ns2-veth0 address 00:00:5E:00:53:02
```



セグメント2個の構成

```
# namespaceを作成
sudo ip netns add ns1
sudo ip netns add ns2
sudo ip netns add router

# NIを作成
sudo ip link add ns1-veth0 type veth peer name gw-veth0
sudo ip link add ns2-veth0 type veth peer name gw-veth1

# NIをNamespaceと紐づける
sudo ip link set ns1-veth0 netns ns1
sudo ip link set ns2-veth0 netns ns2
sudo ip link set gw-veth0 netns router
sudo ip link set gw-veth1 netns router

# NIにIPアドレスを割り当てる
sudo ip netns exec ns1 ip address add 192.0.2.1/24 dev ns1-veth0
sudo ip netns exec ns2 ip address add 198.51.100.1/24 dev ns2-veth0
sudo ip netns exec router ip address add 192.0.2.254/24 dev gw-veth0
sudo ip netns exec router ip address add 198.51.100.254/24 dev gw-veth1

# NIを有効にする
sudo ip netns exec ns1 ip link set ns1-veth0 up
sudo ip netns exec ns2 ip link set ns2-veth0 up
sudo ip netns exec router ip link set gw-veth0 up
sudo ip netns exec router ip link set gw-veth1 up

# ns1のルーティングテーブルにデフォルトルートを追加する
sudo ip netns exec ns1 ip route add default via 192.0.2.254

# ns2のルーティングテーブルにデフォルトルートを追加する
sudo ip netns exec ns2 ip route add default via 198.51.100.254

# routerをルータとして動作するように設定する
sudo ip netns exec router sysctl net.ipv4.ip_forward=1

# MACアドレスを設定
sudo ip netns exec ns1 ip link set dev ns1-veth0 address 00:00:5E:00:53:11
sudo ip netns exec router ip link set dev gw-veth0 address 00:00:5E:00:53:12
sudo ip netns exec router ip link set dev gw-veth1 address 00:00:5E:00:53:21
sudo ip netns exec ns2 ip link set dev ns2-veth0 address 00:00:5E:00:53:22


```



## ブリッジ

```
# nsを用意
sudo ip netns add ns1
sudo ip netns add ns2
sudo ip netns add ns3
sudo ip netns add bridge

# NIを用意
sudo ip link add ns1-veth0 type veth peer name ns1-br0
sudo ip link add ns2-veth0 type veth peer name ns2-br0
sudo ip link add ns3-veth0 type veth peer name ns3-br0

# NIをNSに割り当て
sudo ip link set ns1-veth0 netns ns1
sudo ip link set ns2-veth0 netns ns2
sudo ip link set ns3-veth0 netns ns3
sudo ip link set ns1-br0 netns bridge
sudo ip link set ns2-br0 netns bridge
sudo ip link set ns3-br0 netns bridge

# NIを有効化
sudo ip netns exec ns1 ip link set ns1-veth0 up
sudo ip netns exec ns2 ip link set ns2-veth0 up
sudo ip netns exec ns3 ip link set ns3-veth0 up
sudo ip netns exec bridge ip link set ns1-br0 up
sudo ip netns exec bridge ip link set ns2-br0 up
sudo ip netns exec bridge ip link set ns3-br0 up

# vethインターフェイスにIPアドレス、MACアドレスを付与
sudo ip netns exec ns1 ip address add 192.0.2.1/24 dev ns1-veth0
sudo ip netns exec ns2 ip address add 192.0.2.2/24 dev ns2-veth0
sudo ip netns exec ns3 ip address add 192.0.2.3/24 dev ns3-veth0
sudo ip netns exec ns1 ip link set dev ns1-veth0 address 00:00:5E:00:53:01
sudo ip netns exec ns2 ip link set dev ns2-veth0 address 00:00:5E:00:53:02
sudo ip netns exec ns3 ip link set dev ns3-veth0 a00:00:5E:00:53:03

# ブリッジを用意
sudo ip netns exec bridge ip link add dev br0 type bridge
sudo ip netns exec bridge ip link set br0 up

sudo ip netns exec bridge ip link set ns1-br0 master br0
sudo ip netns exec bridge ip link set ns2-br0 master br0
sudo ip netns exec bridge ip link set ns3-br0 master br0


```



出来ない人のためにドキュメントを用意してもなぁ

ドキュメント読まないから出来ない人なんだろっていうね



最近、ウェブサイトを見る機会がかなり減ってるので

「ウェブサイト離れブームくる」と無職が言ってた。

ウェブアプリとかツールは便利だけど



モダンな技術とか手法ってのは

それらを正しく扱う技術と、使いどころを見極める知識があって

初めて有効な手段になる。



OracleDB Bronzeの資格はもってないけど

なぜか資格をとるための講師を頼まれ

クライアントを合格させたことはある。

しかし、もう何を教えたのかさえ覚えていない。

