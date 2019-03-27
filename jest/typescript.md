# TypeScriptでjestを使用する方法

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




