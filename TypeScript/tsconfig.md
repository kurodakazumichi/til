# tsconfig.json

`yarn tsc --init`によって生成された`tsconfig.json`
これをもとに各項目について調べる。

```js
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    // "lib": [],                             /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": "./",                        /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  }
}
```

# Compoiler Options

## Basic Options

### target

**概要**  

ECMAScriptのターゲットバージョンを指定します

**設定可能な値**

'ES3'（デフォルト）、 'ES5'、 'ES2015'、 'ES2016'、 'ES2017'、 'ES2018'または 'ESNEXT

**効能**

コンパイルで生成されるjsファイルの内容に影響を与える。

**サンプルコード**
```ts
let num = 0;
```

**"es5"を指定した場合**
```js
var num = 0;
```

**"es6"を指定した場合**
```js
let num = 0;
```

----------------------------------------------------------------------------------------

### module

**概要**  

モジュールコードの生成を指定します

**設定可能な値**

'none'、 'commonjs'、 'amd'、 'system'、 'umd'、 'es2015'、または 'ESNext'

**効能**


コンパイルで生成されるjsファイルの内容に影響を与えるには違いないが
このオプションはモジュールに関するコードをどうコンパイルするかという部分に影響する。
(モジュールに関してはcommonjs、esModuleあたりの歴史を学ばないと理解できないと思われ)

**サンプルコード**

```ts
import * as Config from './config';
```

**"es2015"を指定した場合**

```js
import * as Config from './config';
```

**"commonjs"を指定した場合**

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = require("./config");
```

やる意味はなさそうだけど`target`に`es5`を指定しつつ、`module`を`es2015`と指定する事もできた。
2019年の状況を考えると`target`と`module`のベストプラクティスは:

```
target:es5
module:commonjs
```

になるかなと思う。

----------------------------------------------------------------------------------------

### lib

#### 概要

コンパイルに含めるライブラリファイルを指定します。

#### 設定可能な値

- ES5
- ES6
- ES2015
- ES7
- ES2016
- ES2017
- DOM
- DOM.Iterable
- WebWorker
- ScriptHost
- ES2015.Core
- ES2015.Collection
- ES2015.Generator
- ES2015.Iterable
- ES2015.Promise
- ES2015.Proxy
- ES2015.Reflect
- ES2015.Symbol
- ES2015.Symbol.WellKnown
- ES2016.Array.Include
- ES2017.object
- ES2017.SharedMemory

#### 注意

libが指定されなかった場合は、下記のようにデフォルトのライブラリが注入されます。

**target ES5の場合**: 

- DOM
- ES5
- ScriptHost

**target ES6の場合**: 
- DOM
- ES6
- DOM.Iterable
- ScriptHost

#### 効能

今まではコンパイルで生成されるコードの結果に影響したけど
このオプションはコンパイルそのものに関係するオプション。
以下の例を見た方が早い


**サンプルコード**
```ts
console.log("Hello World");
```

**["dom"]を指定した場合**

問題なくコンパイルされる。

**["es5"]を指定した場合**

コードの`console`の部分に、`console`が見つからないと警告が出て、コンパイルができない。

`console`は`dom`に定義されている？ようでこれを`lib`に含めておかないと
コンパイラが`console`を認識できずにこける。

----------------------------------------------------------------------------------------

### allowJs

#### 概要

JavaScriptファイルをコンパイルできるようにします。

#### 設定可能な値

`true`(デフォルト)、`false`

#### 効能

拡張子が`.js`担っているファイルもコンパイルされる。


**サンプルケース**

`index.js`だけを用意しコンパイルを実行する

**arrowJs:trueを指定した場合**

> error TS5055: Cannot write file 'path/to/index.js' because it would overwrite input file.

`.js`のファイルをコンパイルしようとするけど、元のファイルを上書きすることになるから書き込めないとエラーになる。
このオプションを許可する場合は、出力先のフォルダも指定する必要がありそうだ。


**arrowJs:falseを指定した場合**

> error TS18003: No inputs were found in config file

コンパイル対象が何もない的なエラーがでて、コンパイル失敗。
ちなみに`.js`ファイルはコンパイルされないが、`.ts`の中で`.js`のファイルを`import`して使うのは問題ない。


----------------------------------------------------------------------------------------

### lib

#### 概要


#### 設定可能な値


#### 効能


**サンプルコード**

```ts
import * as Config from './config';
```

**"es2015"を指定した場合**


**"commonjs"を指定した場合**





