# constとletは怪しいので使わない方が良さそう

```js
const globalVar = "hoge";
```
グローバル領域でconstすると実行時に変数が再定義されたと怒られたり

```js
for(let i = 0; i < 10; ++i) {
   const data = fetchHogeAPI(i);
}
```
forの初期化子でletを使うとコンパイルエラーになったり  
forのなかでconstな変数に代入すると1回目のループで代入した値で固定されたり

どうにも挙動が怪しいので、レガシーだけど変数は`var`で宣言する方が吉。

# Activeなスプレッドシートを取得する

```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
```

# シート名を指定してシートを取得する
```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName('シート名');
```

1. スプレッドシートを取得
2. シートを取得

# シートの内容をクリアする

```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName('シート名');
sheet.clear();
```

# シートのセルに値を設定する

```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName('シート名');

var row = 1;
var col = 1;

sheet.getRange(row, col).setValue("値");
```

1. sheetの`getRange`を使う
2. 行、列は1から始まる、0スタートではないので注意
3. getRangeの戻り値がcell、`setValue`で好きな値をセット

# GASから外部APIを叩いてデータを扱う

```js
  const url = "https://hogehoge/api/items";
  const option = {
    headers: {
      '認証キーとか': 'hogehogehoge',
    },
    method: 'get'
  }
  
  const res = UrlFetchApp.fetch(url, option);
  const list = JSON.parse(res.getContentText());
```

1. APIコールは`UrlFetchApp.fetch(url, option)`を使う


