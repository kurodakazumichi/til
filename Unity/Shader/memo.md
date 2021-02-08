# Unity シェーダー

Unityで使えるシェーダーは2種類+Shader Graph

- surfaceシェーダー
- 頂点・フラグメントシェーダー
- Shader Graph(ノードベース)



## サーフェイスシェーダー

Unityのサーフェイスシェーダーは以下の3つの工程で処理される。

- 頂点処理
- 色の処理
- ライティング



## リファレンス

- [サーフェイスシェーダーの記述](https://docs.unity3d.com/ja/current/Manual/SL-SurfaceShaders.html)

- [シェーダーのデータ型と精度](https://docs.unity3d.com/ja/2019.4/Manual/SL-DataTypesAndPrecision.html)
- [Build-in shader variables](https://docs.unity3d.com/Manual/SL-UnityShaderVariables.html)



## float half fixed

| 型    | 精度  | 用途                                                         |
| ----- | ----- | ------------------------------------------------------------ |
| float | 32bit | ワールド座標、テクスチャ座標、三角関数、累乗、べき乗など複雑な計算で精度が求められるケースで利用する |
| half  | 16bit | -60000~+60000、小数点以下は約3桁。方向、オブジェクト空間の位置、HDRカラーなど比較的精度が下がってもよいケースで利用する |
| fixed | 11bit | -2.0~+2.0の範囲で、1/256の精度。一般的に色(0 ~ 255)など、単純な数値でよいケースで利用する |



## 基本的な関数

| 関数名   | 例          | 説明               |
| -------- | ----------- | ------------------ |
| saturate | saturate(x) | xを0 ~ 1にクランプ |
| dot      | dot(v1, v2) | ベクトルの内積     |
| pow      | pow(x, n)   | xをn乗する         |

