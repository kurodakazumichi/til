・ビンゴの数字配列を用意

・ビンゴの穴の開いている場所を記録する配列を用意



```php
$bingo = array();
$opened = array();

for ($y = 0; $y < 5; ++$y) {
    for($x = 0; $x < 5; ++$x) {
        $bingo[$y][$x]  = rand(1, 99);
        $opened[$y][$x] = false;
    }    
}


print_r($bingo);
print_r($opened);
```



・確認しやすいようにビンゴの内容や空いてるところの情報を表示する関数を用意

```php
function drawBingo($bingo) {
    for ($y = 0; $y < 5; ++$y) {
        for($x = 0; $x < 5; ++$x) {
            echo str_pad($bingo[$x][$y], 2, 0, STR_PAD_LEFT). " ";
        }
        echo "\n";
    }
}

function drawOpened($opened) {
    for ($y = 0; $y < 5; ++$y) {
        for($x = 0; $x < 5; ++$x) {
            echo ($opened[$x][$y])? "〇" : "×" . " ";
        }
        echo "\n";
    }
}
```



・穴をあける処理

・ビンゴしているかどうかの判定処理



```php
<?php
$bingo = array();
$opened = array();

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

initArray($bingo, $opened);
setupBingo($bingo);

openBingo($opened, 1, 0);
openBingo($opened, 1, 1);
openBingo($opened, 1, 2);
openBingo($opened, 1, 3);
openBingo($opened, 1, 4);

drawBingo($bingo);
drawOpened($opened);

echo isClear($opened)? "クリア":"クリアじゃない";

?>

```



```php
<?php
$bingo = array();
$opened = array();

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

initArray($bingo, $opened);
setupBingo($bingo);

openBingo($opened, 1, 0);
openBingo($opened, 1, 1);
openBingo($opened, 1, 2);
openBingo($opened, 1, 3);
openBingo($opened, 1, 4);

drawBingo($bingo);
drawOpened($opened);

echo isClear($opened)? "クリア":"クリアじゃない";

?>

```

