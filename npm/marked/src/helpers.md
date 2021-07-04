# helpers.js

ヘルパー関数群



## 依存

なし



## consts

### escapeTest

`&,<,>,",'`のいずれか1文字を表す正規表現



### escapeReplace

`&,<,>,",'`のいずれか1文字を表す正規表現(gオプション付き)



### escapeTestNoEncode

### escapeReplaceNoEncode

### escapeReplacements

### unescapeTest

### caret

### nonWordAndColonTest

### originIndependentUrl

### baseUrls

### justDomain

### protocol

### domain



## functions

### getEscapeReplacement(ch:string):string

### escape(html:string, encode:string):string

### unescape(html:string):string

### edit(regex, opt)

### cleanUrl(sanitize, base, href)

### resolveUrl

### merge

### splitCells

### rtrim

### findClosingBracket

### checkSanitizeDeprecation

### repeatString