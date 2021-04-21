```c
#define _CRT_SECURE_NO_WARNINGS

#include <stdio.h>
#include <io.h>
#include <Shlwapi.h>
#include <math.h>
#pragma comment(lib, "Shlwapi.lib")

#pragma warning (disable: 6031)

#define FILE_TYPE 0x4D42    /**< "BM"をリトルエンディアンで解釈した値 */
#define FILE_HEADER_SIZE 14 /**< BMPファイルヘッダサイズ */
#define INFO_HEADER_SIZE 40 /**< Windowsヘッダサイズ */
#define DEFAULT_HEADER_SIZE (FILE_HEADER_SIZE + INFO_HEADER_SIZE) /**< 標準のヘッダサイズ */

#pragma pack (push, 1)

typedef struct tagBITMAP_FILE_HEADER {
	unsigned short bfType;      /* ファイルタイプ */
	unsigned long  bfSize;      /* ファイルサイズ*/
	unsigned short bfReserved1; /* 予約領域1 */
	unsigned short bfReserved2; /* 予約領域2 */
	unsigned long  bfOffBits;   /* 先頭から画像データまでのオフセット */
} BITMAP_FILE_HEADER;

typedef struct tagBITMAP_INFO_HEADER {
	unsigned long  biSize;         /* ヘッダサイズ */
	long           biWidth;        /* 画像の幅(px)*/
	long           biHeight;       /* 画像の高さ(px) */
	unsigned short biPlanes;       /* プレーン数(常に1)*/
	unsigned short biBitCount;     /* 1画素あたりのデータサイズ */
	unsigned long  biCompression;  /* 圧縮形式*/
	unsigned long  biSizeImage;    /* 画像データ部のサイズ */
	long           biXPixPerMeter; /* 横横行解像度(dot/m) */
	long           biYPixPerMeter; /* 縦方向解像度(dot/m) */
	unsigned long  biClrUsed;      /* 格納されているパレット数(使用色数) */
	unsigned long  biClrImportant; /* 重要なパレットのインデックス */
} BITMAP_INFO_HEADER;

typedef unsigned char u8;
typedef int s32;
typedef unsigned int u32;

#pragma pack(pop)

s32 getFileSize(const char* fileName);
void write_bitmap(FILE* src, long long int size);

int main(void) {

	char filepath[255];

	printf("filepathを入力してください\n");
	scanf("%s", filepath);

	// ファイルサイズを取得
	int fileSize = getFileSize(filepath);

	if (fileSize < 0) {
		printf("%sが見つかりませんでした。\n", filepath);
		return 0;
	}

	FILE* fp = fopen(filepath, "rb");

	if (fp == NULL) {
		printf("%sの読み込みに失敗しました。", filepath);
		return 0;
	}

	write_bitmap(fp, fileSize);

	fclose(fp);


	return 0;
}

s32 getFileSize(const char* fileName)
{
	FILE* fp = fopen(fileName, "rb");
	if (fp == NULL) {
		return -1LL;
	}

	long long int fsize = _filelengthi64(_fileno(fp));

	fclose(fp);
	return (s32)fsize;
}

void write_bitmap(FILE* img, u32 size) {

	int width = sqrt(size/3);
	int height = width;

	u8 header_buffer[DEFAULT_HEADER_SIZE];
	BITMAP_FILE_HEADER* file = (BITMAP_FILE_HEADER*)header_buffer;
	BITMAP_INFO_HEADER* info = (BITMAP_INFO_HEADER*)(header_buffer + FILE_HEADER_SIZE);

	int stride = (width * 3 + 3) / 4 * 4;

	// ファイルヘッダ
	file->bfType = FILE_TYPE;
	file->bfSize = DEFAULT_HEADER_SIZE + stride * height;
	file->bfReserved1 = 0;
	file->bfReserved2 = 0;
	file->bfOffBits = DEFAULT_HEADER_SIZE;

	// ファイルインフォ
	info->biSize = INFO_HEADER_SIZE;
	info->biWidth = width;
	info->biHeight = height;
	info->biPlanes = 1;
	info->biBitCount = 24;
	info->biCompression = 0;
	info->biSizeImage = stride * height;
	info->biXPixPerMeter = 0;
	info->biYPixPerMeter = 0;
	info->biClrUsed = 0;
	info->biClrImportant = 0;

	FILE* fp = fopen("test.bmp", "wb");

	if (fp == NULL) {
		fputs("ファイルオープンに失敗しました。\n", stderr);
		exit(EXIT_FAILURE);
	}

	if (fwrite(header_buffer, DEFAULT_HEADER_SIZE, 1, fp) != 1) {
		fputs("ファイルへの書き込みに失敗しました。\n", stderr);
		exit(EXIT_FAILURE);
	}

	char* buffer;
	if ((buffer = malloc(stride)) == NULL) {
		return;
	}

	memset(buffer, 0, stride);

	for (int y = 0; y < height; ++y) {

		char* row = buffer;
		for (int x = 0; x < width; ++x) {
			if (fread(row++, 1, 1, img) < 1) {
				fputs("読み込み中にエラーが発生しました。\n", stderr);
				exit(EXIT_FAILURE);
			}
			if (fread(row++, 1, 1, img) < 1) {
				fputs("読み込み中にエラーが発生しました。\n", stderr);
				exit(EXIT_FAILURE);
			}
			if (fread(row++, 1, 1, img) < 1) {
				fputs("読み込み中にエラーが発生しました。\n", stderr);
				exit(EXIT_FAILURE);
			}
		}
		if (fwrite(buffer, stride, 1, fp) != 1) {
			return;
		}
	}

	free(buffer);

	if (fclose(fp) == EOF) {
		fputs("ファイルクローズに失敗しました。\n", stderr);
		exit(EXIT_FAILURE);
	}
}
```
