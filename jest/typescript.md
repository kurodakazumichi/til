# TypeScriptでjestを使用する方法

## 基本的なこと



## Parcel環境での設定

*parcel環境で確認*

```shell
yarn add -D typescript jest ts-jest @types/jest
```

package.jsonに以下の設定を加える
```json:package.json
  "jest": {
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  }
```

tsconfig.jsonの`compileOptions.types`に`jest`を加える
```
{
  "compilerOptions": {
    ...
    "types": ["node", "jest"]
    ...
  }
}
```

`__tests__`という名前のフォルダを作成する

`index.ts`を作成し下記のコードをかく:

```
describe('StepCode/Core', () => {
  it('test', () => {
    expect('1').toBe('1');
  })
});
```

terminalにて`jest`を実行する。
問題がなければテストが動く。


`tsconfig.json`に`__tests__`フォルダのパスを通しておかないと
インテリセンスでエラーが大量に出る。

```diff
{
  "compilerOptions": {
    ...
  },
  "include": [
    "src/**/*",
+   "__tests__/**/*"
  ],
  "exclude": [
    "node_modules",
  ]
}
```

## jest.config.jsとpackage.jsonに定義したjestのconfig
package.jsonに設定を書いてしまうと
jest.config.jsの内容が無視されるっぽい？

## jest.config.jsの反映タイミング
--watchなどで起動している間は設定を書き換えても反映され無い
一度終了して再度jestを実行する必要がある


`yarn jest --coverage`
これでカバレッジが表示される

`yarn jest --watch`
これでwatch状態になる

`yarn jest hoge`
パスにhogeという文字列が含まれるテストが対象になる

# スニペット

## 単一のテスト
```ts
describe('テストの説明', () => {

  it('検証する具体的な内容', () => {
    expect('検証する値').toBe('想定する値')
  });

});
```

## テスト前に共通の処理を実行させる
const hoge:any;

```ts
describe('テストの説明', () => {

  beforeEach(() => {
    hoge = {};
  });

  it('検証する具体的な内容', () => {
    expect('検証する値').toBe('想定する値')
  });
  
  it('検証する具体的な内容', () => {
    expect('検証する値').toBe('想定する値')
  });
});
```

## describeはネスト可

```ts
describe('テストの大項目', () => {
  describe('テストの中項目', () => {
  
    it('テスト内容', () => {
      // 何かテスト
    });
  
  });
});
```

## describe.eachでテストケースを網羅する

```ts
describe.each`
  v1         | v2         | result
  ${-1}      | ${-1}      | ${-2}
  ${0}       | ${0}       | ${0}
  ${1}       | ${1}       | ${2}
`('sum', ({v1, v2, result}) => {


  it(`sum(${v1}, ${v2}) = ${result}`, () => {
    expect(sum(v1, v2)).toBe(result);
  });
});
```
