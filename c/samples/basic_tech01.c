// 入力を受け取って処理を振り分けるシンプルなテクニック
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

// コンパイラにC6031の警告を無視するように伝えるプリプロセッサ
// scanfには戻り値があるが、特に戻り値を使っていないためC6031の警告がでる。
// 放置してもいいが、警告出てるのも気になるので今回は無視することにした。
#pragma warning (disable: 6031)

//-----------------------------------------------------------------------------
// 関数プロトタイプ宣言
void test1(void);
void test2(void);
void test3(void);

// エントリーポイント(プログラムの入り口)
int main(void)
{
    // 選択されたメニュー番号を保持するための変数
    int selectedMenuNo = 0;

    // ループフラグ、0にするとループを抜ける
    int isLoop = 1;

    while (isLoop)
    {
        printf("----------------------------------------------------------\n");
        printf("メニュー番号を入力しEnterを押してください。\n");
        printf("1:テスト1\n");
        printf("2:テスト2\n");
        printf("3:テスト3\n");

        scanf("%d", &selectedMenuNo);

        // 余白を空けたいので改行
        printf("\n");

        switch (selectedMenuNo) 
        {
            // 選択された番号によって呼ぶ処理を変える。
            case 1: test1(); break;
            case 2: test2(); break;
            case 3: test3(); break;

            // 想定外の内容だったらループを終了する
            default: isLoop = 0; break;
        }

        // 余白を空けたいので改行
        printf("\n");
    }

    return 0;
}

void test1(void) {
    printf("Test1の処理です\n");
}

void test2(void) {
    printf("Test2の処理です\n");
}

void test3(void) {
    printf("Test3の処理です\n");
}
