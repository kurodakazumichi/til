## ビンゴの基本的な流れ
①ビンゴの数字配列を用意

②ビンゴの穴の開いている場所を記録する配列を用意

③特定の数字がビンゴの中にあるかどうかを調べる→該当する数字があれば、その場所を取得する

④↑の処理によって穴をあける場所がわかるので、その場所に穴をあける

⑤ビンゴしているかどうかの判定処理をする

## サンプルコード

```php
<?php
// ビンゴに必要な処理を関数として定義していきます！

function initArray(&$bingo, &$opened) {
    for ($y = 0; $y < 5; ++$y) {
        for($x = 0; $x < 5; ++$x) {
            $bingo[$y][$x]  = 0;
            $opened[$y][$x] = false;
        }    
    }
}

function setupBingo(&$bingo) {
    for ($y = 0; $y < 5; ++$y) {
        for($x = 0; $x < 5; ++$x) {
            // すでに存在する数字をはじく処理がいる。
            $bingo[$y][$x]  = rand(1, 99);
        }    
    }
}

function drawBingo($bingo) {
    for ($y = 0; $y < 5; ++$y) {
        for($x = 0; $x < 5; ++$x) {
            echo str_pad($bingo[$y][$x], 2, 0, STR_PAD_LEFT). " ";
        }
        echo "\n";
    }
}

function drawOpened($opened) {
    for ($y = 0; $y < 5; ++$y) {
        for($x = 0; $x < 5; ++$x) {
            echo ($opened[$y][$x])? "〇" : "×" . " ";
        }
        echo "\n";
    }
}

// 指定した数字がビンゴの中にあれば、その場所を返す。
function findNumber($bingo, $num) {
    for($y = 0; $y < 5; ++$y) {
        for($x = 0; $x < 5; ++$x) {
            if ($bingo[$y][$x] === $num) {
                return array($x, $y);
            }
        }
    }
    return NULL;
}

function openBingo(&$opened, $x, $y) {
    $opened[$y][$x] = true;
}

function isClear($opened) {
    // 横軸判定
    for($y = 0; $y < 5; ++$y) {
        for($x = 0; $x < 5; ++$x) {
            if (!$opened[$y][$x]) break;
            
            if ($x == 4) {
                return true;
            }
        }
    }
    
    // 縦軸判定
    for($x = 0; $x < 5; ++$x) {
        for($y = 0; $y < 5; ++$y) {
            if (!$opened[$y][$x]) break;
            if ($y == 4) {
                return true;
            }
        }
    }
    
    // 斜め判定①
    for($i = 0; $i < 5; ++$i) {
        if (!$opened[$i][$i]) continue;
        if ($i == 4) {
            return true;
        }
    }
    
    // 斜め判定②
    for($i = 0; $i < 5; ++$i) {
        if (!$opened[$i][4 - $i]) continue;
        if ($i == 4) {
            return true;
        }
    }    
    
    
    return false;
}

// 配列を用意
$bingo = array();
$opened = array();

// データを初期化
initArray($bingo, $opened);
setupBingo($bingo);

// ビンゴの中から数値を探す例
print_r(findNumber($bingo, 10));

// ビンゴに穴をあける例
openBingo($opened, 1, 0);
openBingo($opened, 1, 1);
openBingo($opened, 1, 2);
openBingo($opened, 1, 3);
openBingo($opened, 1, 4);

// デバッグ表示
drawBingo($bingo);
drawOpened($opened);

// ビンゴしているかの判定
echo isClear($opened)? "クリア":"クリアじゃない";
?>

```


ビンゴの中に同じ数字が入らないようにするには、setupBingoを以下のようにすればいけます(多分)

```php
<?php
function setupBingo(&$bingo) {
    for ($y = 0; $y < 5; ++$y) {
        for($x = 0; $x < 5; ++$x) {
            while(true) {
                $num = rand(1, 99);
                if (!findNumber($bingo, $num)){
                    $bingo[$y][$x] = $num;   
                    break;
                }
            }
        }    
    }
}
?>

```

## ランダムな文字列を作るサンプル

```php
// ランダムな半角英数字を1文字作る関数
function makeRandomChar() {
    $chars = array_merge(range('a','z'), range('0','9'),range('A','Z'));
    // 小文字アルファベットは26個 + 大文字アルファベット 26個 + 数値が10個
    // 合計で62個あるので、$chars[0] ~ $chars[61]のどれか1つをランダムに取得
    $index = rand(0, 61);
    return $chars[$index];
}

// ランダム桁数のランダム文字列を作る関数
function makeRandomWard() {
    $count = rand(1, 10); // 文字の桁数をランダムにきめる
    $word = "";
    for($i = 0; $i < $count; ++$i) {
        $word = $word . makeRandomChar(); // ランダムな1文字を連結する
    }
    return $word;
}

// この関数呼ぶだけでランダム文字列が取得できます
$word = makeRandomWord();
```
