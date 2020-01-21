MacにはデフォルトのPHPが入っているが
それだといろいろ都合が悪いので`brew`で新しく入れ直す。


```
$ brew install php@7.3
```

しばらくインストール待ち

- `/usr/local/Celler`にもろもろ入る
- `/usr/local/opt`から`/usr/local/Celler`にシンボリックリンクはってある。

以下、インストール後のログに書いてあったこと。

# ApacheでPHPを有効にするなら

`httpd.conf`に以下の内容を書いて、Apacheを再起動せよ。

```
LoadModule php7_module /usr/local/opt/php@7.3/lib/httpd/modules/libphp7.so

<FilesMatch \.php$>
    SetHandler application/x-httpd-php
</FilesMatch>
```

そして

DirectoryIndexの項目に`index.php`が含まれてることをチェック
`DirectoryIndex index.php index.html`

# php.iniはここ
`/usr/local/etc/php/7.3/`

# インストールしたPHPにパスを通してね
PHPはkeg(樽)に入ってるだけで、まだパスは通ってないので以下のコマンドでパスを設定してね

```
echo 'export PATH="/usr/local/opt/php@7.3/bin:$PATH"' >> ~/.bash_profile
echo 'export PATH="/usr/local/opt/php@7.3/sbin:$PATH"' >> ~/.bash_profile
```
  
コンパイラがphp@7.3を見つけるには以下の設定が必要になるかも
 
```
export LDFLAGS="-L/usr/local/opt/php@7.3/lib"
export CPPFLAGS="-I/usr/local/opt/php@7.3/include"
```

# PHPをバックグラウンド起動するなら
`brew services start php@7.3`して、ワイ起動せよ。
バックグラウンドで動かす必要がないなら`php-fpm`コマンドを実行すればよし
