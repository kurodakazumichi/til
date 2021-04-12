//-----------------------------------------------------------------------------
// じゃんけんゲーム
// ゲームの基本は入力を受け取り、入力を元に演算をし、その結果を表示すること
//
// 1. プレイヤーの入力を受け取る
// 2. コンピュータの手(グー、チョキ、パー)をランダムに決める
// 3. 勝敗判定
// 4. 勝敗を表示
// 5. リトライ処理
//-----------------------------------------------------------------------------
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// コンパイラにC6031の警告を無視するように伝えるプリプロセッサ
// scanfには戻り値があるが、特に戻り値を使っていないためC6031の警告がでる。
// 放置してもいいが、警告出てるのも気になるので今回は無視することにした。
#pragma warning (disable: 6031)

//-----------------------------------------------------------------------------
// 関数プロトタイプ宣言

// じゃんけんの手が正しいかチェックする関数
int isRightHand(int type);

// ランダムでじゃんけんの手を取得する関数
int getRandomHand(void);

// じゃんけんの勝敗を判定する関数
int getResult(int playerHand, int cpuHand);

// じゃんけんの勝敗を表示する関数
void showResult(int result);

// 改行するだけの関数
void breakLine();

// エントリーポイント(プログラムの入り口)
int main(void)
{
	// ゲームの初期化
	// コンピューターの乱数(ランダムな数)は疑似乱数といって、本当のランダムではない。
	// ランダムシートと呼ばれる、乱数の種を決める事で、その種を基準にランダムっぽい数を生成している。
	// 以下のsrandはランダムシードを設定する処理で、time(NULL)というのは現在時刻の数値を取得している。
	// 現在時刻は常に変化するため、ランダムシードに現在時刻を設定すると実質ランダムとなるため
	// 乱数を扱う場合は、プログラムの最初で以下の処理を書く事が多い。
	srand((unsigned int)time(NULL));

	printf("----------------------------------------------------------\n");
	printf("じゃんけんゲーム\n");
	printf("----------------------------------------------------------\n");

	// ゲームループ
	while (1)
	{
		printf("何を出しますか？\n");
		printf("0:グー\n");
		printf("1:チョキ\n");
		printf("2:パー\n");

		// 1. プレイヤーの入力
		// プレイヤーのじゃんけんの手(0:グー、1:チョキ、2:パー)とする
		int playerHand = 0;
		scanf("%d", &playerHand);
		breakLine();

		// 入力内容が正しいかどうかをチェック
		if (!isRightHand(playerHand)) {
			printf("グー、チョキ、パーから選んでください。\n");
			continue;
		}

		// 2. コンピューターの手を決める
		int cpuHand = getRandomHand();

		// 3. 勝敗判定
		int result = getResult(playerHand, cpuHand);

		// 4. 結果を表示
		showResult(result);

		// リトライ？
		printf("もう一度勝負しますか？\n");
		printf("0: いいえ\n");
		printf("1: はい\n");

		// 入力番号を受け取る
		int no = 0;
		scanf("%d", &no);
		breakLine();

		// はいが選ばれたらまたループの最初へ戻る
		if (no == 1) {
			continue;
		}

		// はい以外が選ばれていたらループ終了
		break;
	}

	printf("ゲームを終了しました。");

	return 0;
}

// 引数に渡されたじゃんけんの手が正しいかどうか(グー、チョキ、パーか？)をチェックする関数
// 正しければ1を、正しくなければ0を返す。
int isRightHand(int type)
{
	// typeが0～2だったら正しい
	return (0 <= type && type <= 2) ? 1 : 0;
}

// じゃんけんの手をランダムで取得する
int getRandomHand(void) {
	// 3で割った余りは0～2になる
	return rand() % 3;
}

// プレイヤーとコンピュータの手から勝敗を判定し、結果を返す。
// 0: プレイヤーの負け
// 1: プレイヤーの勝ち
// 2: あいこ
int getResult(int playerHand, int cpuHand)
{
	// 手が同じならあいこ
	if (playerHand == cpuHand) return 2;

	// プレイヤーがグーの場合
	if (playerHand == 0)
	{
		// CPUがチョキならプレイヤーの勝ち
		if (cpuHand == 1) return 1;
		// CPUがパーならプレイヤーの負け
		if (cpuHand == 2) return 0;
	}

	// プレイヤーがチョキの場合
	if (playerHand == 1) {
		// CPUがグーならプレイヤーの負け
		if (cpuHand == 0) return 0;
		// CPUがパーならプレイヤーの勝ち
		if (cpuHand == 2) return 1;
	}

	// プレイヤーがパーの場合
	if (playerHand == 2) {
		// CPUがグーならプレイヤーの勝ち
		if (cpuHand == 0) return 1;
		// CPUがチョキならプレイヤーの負け
		if (cpuHand == 1) return 0;
	}
}

// じゃんけんの勝敗を表示する関数
void showResult(int result) 
{
	switch (result) {
		case 0: printf("あなたの負け\n"); break;
		case 1: printf("あなたの勝ち\n"); break;
		case 2: printf("あいこでした\n"); break;
		default: printf("想定しない結果でした"); break;
	}
	breakLine();
}

// 改行するだけの処理
void breakLine() {
	printf("\n");
}
