# CSS設計完全ガイド

## 関連リンク

- [Specificity Calculator](https://specificity.keegan.st/)

  CSSセレクターの重要度、詳細度などの優先度を計算してくれるサイト

- [CSS Architecture](https://philipwalton.com/articles/css-architecture/)

  「よいCSS設計が目指す４つのゴール」について書かれたブログ

- [BootStrap](https://getbootstrap.com/docs/4.1/components/buttons/)

- [Material Design](https://material.io/design)

- [Lightning Design System](https://www.lightningdesignsystem.com/components/accordion/)

- http://oocss.org/

- https://www.slideshare.net/stubbornella/object-oriented-css/

- http://smacss.com/ja

- https://en.bem.info/

- https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/



## PRECSS

`{prefix}_{moduleName}_{child}__{modifyName}`



## テクニック

`currentColor`を指定すると現在指定されている`color`や親の`color`を参照する。

```css
.class {
    border-color: currentColor;
    color: #abcdef;
}
```