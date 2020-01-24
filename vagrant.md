- vagrantでVirtualBoxを制御して仮想環境を作り上げる。
- 仮想環境１つにつき、フォルダが１つ必要になる。
- `~/vagrant`というフォルダを作成して、仮想環境はそこにいれていくことにする。

# 仮想環境を立ち上げる

```bash
# 仮想環境用のフォルダを作成しそこへ移動する
cd ~/vagrant
mkdir MyCentOS
cd MyCentOS

# vagrantfileを作成する
vagrant init bento/centos-6.8

# Vagrantfileを編集して仮想マシンのIPアドレスを192.168.33.10にする
sed -i '' -e 's/# config.vm.network "private_network", ip: "192.168.33.10"/config.vm.network "private_network", ip: "192.168.33.10"/' Vagrantfile

# 仮想マシンを起動する
vagrant up

# 仮想マシンの状態を確認する
vagrant status
```

# 仮想マシンを設定する

```bash
# 起動した仮想環境に接続
vagrant ssh

# 仮想環境のOSを最新に更新
sudo yum -y update

# スクリプトを入手するためにgitをインストール
sudo yum -y install git

# gitを使ってアプリケーション設定用のスクリプトをダウンロード
git clone https://github.com/dotinstallres/centos6.git

# centos6フォルダができるのでそちらに移動
cd centos6

# スクリプトを実行（時間かかります）
./run.sh

# もろもろの設定を反映
exec $SHELL -l
```
