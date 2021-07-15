# Hooks

## Links

https://github.com/streamich/react-use

https://nikgraf.github.io/react-hooks/

https://usehooks.com/

https://qiita.com/takeyuichi/items/41776005061f1697d67d

## useEffect

```js
useEffect(func, array);
```



### レンダリングされる度に実行される

```js
// 第一引数のみ指定
useEffect(() => { console.log("effect!")});
```



### 依存する値に変更がある場合だけ実行される

```js
// 第二引数に変更を検知したい値を指定する
useEffect(() => { console.log(msg) }, [msg]);
```



### レンダリング後に一度だけ実行される

```js
// 第二引数に空配列を指定する
useEffect(() => { console.log("effect!"); }, []);
```



### クリーンアップを実行させる

コンポーネントがアンマウントされたときとか、副作用が再実行した時(再実行？)

```js
// 関数を返す関数を指定する
useEffect(() => { 
    return () => {
        console.log('cleanup');
    }
});
```



## 思った事

関数コンポーネントはレンダリングの度に呼び出されるただの関数なので、基本的に状態を持てない。

```jsx
function App() {
    
	let money = 10;
    
    return (<p>{money}</p>)
}
```

このコンポーネントの`money`は常に`10`である。



関数が呼ばれるときに、前回の値(状態)を覚えておく方法の１つが`useState`である。

```jsx
function App() {
  const [money, setMoney] = useState(10);

  return (
    <>
      <p>無職の所持金:{money}円</p>
      <button onClick={() => setMoney(money + 10)}>10円あげる</button>
      <button onClick={() => setMoney(money - 10)}>10円うばう</button>
    </>
  )
}
```

`useState(10)`は関数が動くたび、当然実行されるけど、おそらく内部的に`StateObject`的なモノをキャッシュしている。

ようするに巨大なグローバル変数がどっかに用意されてて、そこに保持しているというだけの話だろう。それを上手い事紐づけて管理してくれているのが`Hooks`と言えそう。

そしてReact的に`State`に変更があった場合は再レンダリング、つまりこの関数を再度呼び出すという仕組み。

1. 状態を変更する
2. 変更された状態に関連する関数コンポーネントを判定
3. 該当する関数を実行する
4. この時の`State`の値によって`JSXElement`が返される。

たぶんこれだけというシンプルな仕組みだ。