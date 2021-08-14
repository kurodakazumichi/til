# Hello World

これは伝統的なHello Worldプログラムのソースコードです

```rust
// This is a comment, and is ignored by the compiler
// You can test this code by clicking the "Run" button over there ->
// or if you prefer to use your keyboard, you can use the "Ctrl + Enter" shortcut

// This code is editable, feel free to hack it!
// You can always return to the original code by clicking the "Reset" button ->

// This is the main function
fn main() {
    // Statements here are executed when the compiled binary is called

    // Print text to the console
    println!("Hello World!");
}
```

`println!`はコンソールに文字を表示するマクロです。

Rustコンパイラを使ってバイナリを作成する事ができます。

```
rustc hello.rs
```

`rustc`は実行可能なHelloバイナリを生成します。

```bash
$./hello
Hello World!
```



## コメント

どんなプログラムでもコメントが必要ですが、Rustはいくつかの種類をサポートしています。

- 一般的なコメント、コンパイラーによって無視されます
  - // 行コメント、行末までコメント
  - /* ブロックコメント、閉じ区切る文字までコメント */
- [HTMLライブラリのドキュメント](https://doc.rust-lang.org/stable/rust-by-example/meta/doc.html)に解析されるDocコメント
  - /// 次の項目のライブラリドキュメントを生成します。
  - //! 囲んでいるアイテムのライブラリ・ドキュメントを生成します。



## Formatted print

