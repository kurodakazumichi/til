# 環境構築メモ：webpack-ts-jest

言語は`ts`でテストは`jest`で、`webpack`でバンドルした`js`を`html`で読み込んで使うだけの環境構築メモ



## ディレクトリ構成

```
root
┣ src
┣ dist
┃ ┗ index.html
┣ package.json
┣ jest.config.js
┣ tsconfig.json
┗ webpack.config.js
```



## package.json

```json
{
  "name": "any name",
  "version": "1.0.0",
  "main": "index.js",
  "author": "kazumichi kuroda <kazumichi96@gmail.com>",
  "license": "MIT",
  "devDependencies": {
    "@types/jest": "^27.4.0",
    "@types/node": "^17.0.19",
    "jest": "^27.5.1",
    "ts-jest": "^27.1.3",
    "tsc": "^2.0.4",
    "typescript": "^4.5.5",
    "webpack": "^5.68.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4",
    "ts-loader": "^9.2.6"    
  },
  "scripts": {
    "start":"webpack serve --open",
    "build": "webpack",
    "test": "jest --watchAll",
    "cover": "jest --coverage"
  }  
}
```

`yarn init`で`package.json`を作って`devDependencies`と`srcript`の部分をコピペすればよし。

パッケージは`yarn add -D`で個別に入れてもいいけど。



## tsconfig.json

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,                         /* Enable incremental compilation */
    "target": "es5",                                /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', or 'ESNEXT'. */
    "module": "commonjs",                           /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    // "lib": [],                                   /* Specify library files to be included in the compilation. */
    // "allowJs": true,                             /* Allow javascript files to be compiled. */
    // "checkJs": true,                             /* Report errors in .js files. */
    // "jsx": "preserve",                           /* Specify JSX code generation: 'preserve', 'react-native', 'react', 'react-jsx' or 'react-jsxdev'. */
    // "declaration": true,                         /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                      /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                           /* Generates corresponding '.map' file. */
    // "outFile": "./",                             /* Concatenate and emit output to single file. */
    // "outDir": "./",                              /* Redirect output structure to the directory. */
    "rootDir": "./src",                             /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                           /* Enable project compilation */
    // "tsBuildInfoFile": "./",                     /* Specify file to store incremental compilation information */
    // "removeComments": true,                      /* Do not emit comments to output. */
    // "noEmit": true,                              /* Do not emit outputs. */
    // "importHelpers": true,                       /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,                  /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,                     /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                                 /* Enable all strict type-checking options. */
     "noImplicitAny": true,                       /* Raise error on expressions and declarations with an implied 'any' type. */
     "strictNullChecks": true,                    /* Enable strict null checks. */
     "strictFunctionTypes": true,                 /* Enable strict checking of function types. */
     "strictBindCallApply": true,                 /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
     "strictPropertyInitialization": true,        /* Enable strict checking of property initialization in classes. */
     "noImplicitThis": true,                      /* Raise error on 'this' expressions with an implied 'any' type. */
     "alwaysStrict": true,                        /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
     //"noUnusedLocals": true,                      /* Report errors on unused locals. */
     "noUnusedParameters": true,                  /* Report errors on unused parameters. */
     "noImplicitReturns": true,                   /* Report error when not all code paths in function return a value. */
     "noFallthroughCasesInSwitch": true,          /* Report errors for fallthrough cases in switch statement. */
     //"noUncheckedIndexedAccess": true,            /* Include 'undefined' in index signature results */
     "noImplicitOverride": true,                  /* Ensure overriding members in derived classes are marked with an 'override' modifier. */
     "noPropertyAccessFromIndexSignature": true,  /* Require undeclared properties from index signatures to use element accesses. */

    /* Module Resolution Options */
    // "moduleResolution": "node",                  /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                             /* Base directory to resolve non-absolute module names. */
    // "paths": {},                                 /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                              /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                             /* List of folders to include type definitions from. */
    // "types": [],                                 /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,        /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                        /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,                    /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,                /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                            /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                               /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                     /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                       /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,              /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,               /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "skipLibCheck": true,                           /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true        /* Disallow inconsistently-cased references to the same file. */
  }
}
```

内容はお好みで



## webpack.config.js

```js
	
// pathモジュールの読み込み
const path = require("path");
 
module.exports = {
  // モードを開発モードにする
  mode: "development",
  // 入力ファイル設定
  entry: [path.resolve(__dirname, "./src/index.ts")],
  // 出力ファイル設定
  output: {
    // 出力されるファイル名
    filename: "bundle.js",
    // 出力先ディレクトリ
    path: path.resolve(__dirname, "dist")
  },
 
  // モジュール設定
  module: {
    rules: [
      {
        // ts-loaderの設定
        test: /\.(js|ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
    ]
  },
  // モジュール解決
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
 
  // 開発モード設定
  devtool: "source-map",
  devServer: {
    static: "./dist"
  }
};
```

開発モードの内容だけだけど俺はこれでいい。無職だし。

とりあえず`ts`が使える、`./src/index.ts`がエントリポイント、ビルドしたら`./dist/bundle.js`ができる。それくらいの内容。



## jest.config.js

```js
module.exports = {
  // 使用するファイル拡張子のリスト、importする際に拡張子を省略した場合
  // このリストの左から順に拡張子が照合されるのでtypescriptを使う場合は
  // tsが先にくるように定義しなおすのが良い
  moduleFileExtensions: [
    "ts", "js", "json",
  ],

  // typescriptでjestを動作させるための設定
  transform: {
    "^.+\\.ts$": "ts-jest"
  },

  // 使用するtsconfig.jsonの指定
  globals: {
    'ts-jest': {
      "tsconfig": "tsconfig.json"
    }
  },

  // 拡張子が`.spec.ts`ってなってるファイルがテストファイルになる設定
  testRegex: "\\.spec\\.ts$",
}
```

`jest`の設定ファイル



### src

`ts`と`jest`の動作チェック用のファイルを用意

#### index.ts

```typescript
export function hello () {
  return "Hello World";
}

alert(hello());
```



#### index.spec.ts

```typescript
import * as Index from "./index";

describe("Test", () => {
  it("hello", () => {
    expect(Index.hello()).toBe("Hello World");
  })
})
```



### dist

`webpack`の動作確認用ファイルを用意

#### index.html

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample</title>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```



## 動作確認

### start

1. ターミナルで`yarn start`を実行
2. ブラウザが立ち上がる
3. `Hello World`とアラートがでる



### build

1. ターミナルで`yarn build`を実行
2. `./dist`に`bundle.js`ができる



### test

1. ターミナルで`yarn test`を実行
2. `jest`が起動しテスト結果が表示される



### cover

1. ターミナルで`yarn cover`を実行
2. `jest`が起動しテストカバレッジが表示される。