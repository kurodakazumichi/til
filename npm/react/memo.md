# React

## TypeScript 型定義

### onInputなどのコールバックで受け取るeventの型

ReactでonXXXなどに渡すコールバックを定義し、引数でeventをもらう場合
そのeventの型は`React.FormEvent<T>`を使う

```js:sample.js
class MyComponent extends React.Component {
  render () {
    return <input type="range" onInput={ this.onInput.bind(this); } />
  }
  onInput(e:React.FormEvent<HTMLInputElement>) {
    console.log(e);
  }
}
```
