イケてるコードにする３つのポイント

- メモリを想像する
- CPUに無駄な事させない
- 変数のスコープ

何かしっくりこないコードだなと思ったらだいたいこの３つが問題。
この3つを上手い事なんとかするにはセオリーやノウハウ(引き出し)を増やす。

version 1.0

```c
#include <stdio.h>
int main(void){
    char str[1000];
    char num[100];
    int result = 0;

    int l;
    fgets(str, sizeof(str), stdin);
    sscanf(str,"%s",num);

    for(l = 0;num[l] != '\0';++l);

    for(int i = 0; i < l; ++i){
        for(int j = i+1 ; j < l ; ++j){
            if(num[i] == num[j]){
                result = 1;    
            }
        }
    }

    if(result == 0){
    printf("OK");
        }else{
            printf("NG");
        }
    return 0;
}
```

version 2.0

- str[1000]とnum[100]は中身が同じになってるのでnum[100]いらない。(メモリを想像している)
- 重複チェックの処理で、重複が見つかった瞬間、その後の処理いらない。(無駄な処理をCPUにさせたくないという思いやり)

```c
int main(void) {
  char str[1000];
  int result = 0;

  int l;
  fgets(str, sizeof(str), stdin);

  for (l = 0; str[l] != '\0'; ++l);

  for (int i = 0; i < l; ++i) {
    if (result == 1) break;
    
    for (int j = i + 1; j < l; ++j) {
      if (str[i] == str[j]) {
        result = 1;
	break;
      }
    }
  }

  if (result == 0) {
    printf("OK");
  }
  else {
    printf("NG");
  }
  return 0;
}
```

version 3.0

- 文字列のループは、文字列の長さがわからなくてもヌル文字`\0`で判定できるので除去(メモリ削減、CPUへの思いやり)
- 文字列をループする時はヌル文字使う事が多い(ノウハウ)

```c
int main(void) 
{
  char str[1000];
  int result = 0;

  fgets(str, sizeof(str), stdin);

  for (int i = 0; str[i] != '\0'; ++i) {
    for (int j = i + 1; str[j] != '\0'; ++j) {
      if (result == 1) break;
      
      if (str[i] == str[j]) {
        result = 1;
        break;
      }
    }
  }

  if (result == 0) {
    printf("OK");
  }
  else {
    printf("NG");
  }
  return 0;
}
```

version 4.0

- resultという変数のスコープが広いし、重複チェックは汎用的な機能なので関数に出来る(スコープを意識)
- 関数化は変数のスコープを狭くするシンプルな方法の１つ(ノウハウ)

```c
int isContainDeplicates(char* str) 
{
  int result = 0;

  for (int i = 0; str[i] != '\0'; ++i) {
    for (int j = i + 1; str[j] != '\0'; ++j) {
      if (str[i] == str[j]) {
        return 1;
      }
    }
  }

  return result;
}

int main(void)
{
  char str[1000];
  fgets(str, sizeof(str), stdin);

  // 重複なしなら"OK"、重複ありなら"NG"
  printf((isContainDeplicates(str) == 0)? "OK" : "NG");

  return 0;
}
```

version 5.0

```c
// 文字列に重複あるかチェックする関数
int isContainDeplicates(char* str);

int main(void)
{
  char str[1000];
  fgets(str, sizeof(str), stdin);

  // 重複なしなら"OK"、重複ありなら"NG"
  printf((isContainDeplicates(str) == 0)? "OK" : "NG");

  return 0;
}

int isContainDeplicates(char* str) 
{
  int result = 0;

  for (int i = 0; str[i] != '\0'; ++i) {
    for (int j = i + 1; str[j] != '\0'; ++j) {
      if (str[i] == str[j]) {
        return 1;
      }
    }
  }

  return result;
}
```
