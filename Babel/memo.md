# 基本的なJavaScriptの環境

### install

```js
yarn add -D @babel/core @babel/cli
yarn add -D @babel/preset-env
yarn add core-js@3
```

### `babel.config.json`

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3"
      }
    ],
  ]
}

```

### cli

srcディレクトリの中身を全てコンパイルしてlibに出力

```bash
npx babel src --out-dir lib
```

## クラスプロパティを有効にする

### install

```bash
yarn add -D @babel/plugin-proposal-class-properties
```

### `babel.config.json`

```diff
{
+ "plugins": [
+   "@babel/plugin-proposal-class-properties"
+ ],
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3"
      }
    ]
  ]
}

## TypeScriptを有効にする

### install

```bash
yarn add -D @babel/preset-typescript
```

### `babel.config.json`

```diff
{
  "plugins": [
    "@babel/plugin-proposal-class-properties"
  ],
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3"
      }
    ],
+   "@babel/preset-typescript"
  ]
}
```

### cli

TypeScriptの場合は`--extensions`オプションを指定する

```bash
babel src --out-dir lib --extensions .ts
```
