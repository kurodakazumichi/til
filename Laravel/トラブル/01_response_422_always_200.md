## response()->json()

`response()->json()`で普通にレスポンスを返す限りは指定通りのレスポンスが返る。

全く問題なし。

```php
// 200 OK
public function update($id) {
  return response()->json([], 200);
}

// 201 Created
public function update($id) {
  return response()->json([], 201);
}

// 404 Not Found
public function update($id) {
  return response()->json([], 404);
}

// 422 Unprocessable Entity
public function update($id) {
  return response()->json([], 422);
}

// 500 Internal Server Error
public function update($id) {
  return response()->json([], 500);
}
```



## HttpException

`HttpException`を投げてみても、指定した通りのステータスが返却される。

全く問題なし。

```php
// 404 Not Found
public function update($id) {
  throw new HttpException(404, 'NotFoundHttpException');
}

// 422 Unprocessable Entity
public function update($id) {
  throw new HttpException(422, "Unprocessable Entity");
}
```



## XXXHttpException

`XXXHttpException`を投げてみても、想定通りのステータスが返却される。

全く問題なし。

```php
// 404 Not Found
public function update($id) {
  throw new NotFoundHttpException('Not Found');
}

// 422 Unprocessable Entity
public function update($id) {
  throw new UnprocessableEntityHttpException('UnprocessableEntityHttpException');
}
```



そもそも`NotFoundHttpException`とかは、`HttpException`を継承して、コンストラクタで初期値入れてるだけなので、そりゃそうでしょうって感じではある。



```php
/**
 * @author Steve Hutchins <hutchinsteve@gmail.com>
 */
class UnprocessableEntityHttpException extends HttpException
{
    /**
     * @param string|null     $message  The internal exception message
     * @param \Throwable|null $previous The previous exception
     * @param int             $code     The internal exception code
     */
    public function __construct(?string $message = '', \Throwable $previous = null, int $code = 0, array $headers = [])
    {
        if (null === $message) {
            trigger_deprecation('symfony/http-kernel', '5.3', 'Passing null as $message to "%s()" is deprecated, pass an empty string instead.', __METHOD__);

            $message = '';
        }

        logger("hogehoge");

        parent::__construct(422, $message, $previous, $headers, $code);
    }
}
```



## ValidationException

いつも`ValidationException`が発生すると常に`200 OK`が返ってくるので、こいつは`200`を返すはず！

と、思いきや普通に`422`が返ってきた...

```php
// 422 Unprocessable Entity
public function update(Request $request, $id) 
{
  // validation ruleはとりあえずなし
  $rule = [];
    
  $validator = Validator::make($request->all(), $rule);
  throw new ValidationException($validator);
}
```

**レスポンス**

```
{
  "message":"The given data was invalid."
}
```



### validation ruleを設定

ルール設定したら`200 OK`が返ってきた。`(^p^)`ｱｳｱｳｱｰ

なんでやねん(;´Д｀)

```php
// 200 OK
public function update(Request $request, $id) 
{
  // nameは必須
  $rule = ['name' => "required"];
    
  $validator = Validator::make($request->all(), $rule);
  throw new ValidationException($validator);
}
```



**レスポンス**

```
{
  "message":"The given data was invalid.",
  "errors":{"name":["\u540d\u524d\u306f\u5fc5\u9808\u3067\u3059\u3002"]}
}
```

レスポンスの中身はちゃんとValidateが動作して`errors`がある。

だのに、なぜに`200 OK`を返すのか...



## 実験

```php
  public function update(Request $request, $id) 
  {
    // nameは必須
    $rule = ['name' => "required"];
    
    $validator = Validator::make($request->all(), $rule);

    try {
      $validator->validate();
    } catch (ValidationException $e) {
        
      logger('pass catch ValidationException');
        
      // ※ここで422を指定しても200が返る
      return response()->json('Pass catch ValidationException', 422);
    }

    // status 299: これは間違いなく無職が指定したstatusです。
    return response()->json('Pass unknown status', 299);
  }
```



リクエストに何も指定せずアクセスすると、`200 OK`でレスポンスは:

```
"Pass catch ValidationException"
```



`$rule = []`にして、リクエストに何も指定せずアクセスすると、`299 unknown status`でレスポンスは:

```
"Pass unknown status"
```



例外をキャッチした後に自前でレスポンス作っても`200`が返る。

`$validtor->validate()`が例外を投げる時に、Laravelの状態がなんかおかしくなる？





## Validatorが作られる流れ

```php
$validator = Validator::make($request->all(), $rule);
```

この処理を追いかけてみたいので、`Validator::make`を見に行く



`Validator`は`vendor/laravel/framework/src/Illuminate/Support/Facades/Validator.php`にある。

```php
class Validator extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'validator';
    }
}
```



`make`はこのクラスに定義されてない、継承元の`Facade`か

`Facade`は`vendor/laravel/framework/src/Illuminate/Support/Facades/Facade.php`

しかし、このクラス内に`make`というメソッドは定義されておらず、マジックメソッドによって呼び出されていた。関連する処理は以下:



```php
    public static function __callStatic($method, $args)
    {
        $instance = static::getFacadeRoot();

        if (! $instance) {
            throw new RuntimeException('A facade root has not been set.');
        }

        return $instance->$method(...$args);
    }
```



`make`に限らずいろんなメソッドがここを通過するのでログを出してみる。

`logger($method)`したらこんな感じ

```
[2021-06-22 13:27:05] local.DEBUG: get  
[2021-06-22 13:27:05] local.DEBUG: get  
[2021-06-22 13:27:05] local.DEBUG: get  
[2021-06-22 13:27:05] local.DEBUG: prefix  
[2021-06-22 13:27:05] local.DEBUG: get  
[2021-06-22 13:27:05] local.DEBUG: get  
[2021-06-22 13:27:05] local.DEBUG: get  
[2021-06-22 13:27:05] local.DEBUG: get  
[2021-06-22 13:27:05] local.DEBUG: make
```



`$instance`の正体が知りたいので`logger(get_class($instance))`してみる。

```
[2021-06-22 13:28:46] local.DEBUG: Illuminate\Routing\Router  
[2021-06-22 13:28:46] local.DEBUG: Illuminate\Routing\Router  
[2021-06-22 13:28:46] local.DEBUG: Illuminate\Routing\Router  
[2021-06-22 13:28:46] local.DEBUG: Illuminate\Routing\Router  
[2021-06-22 13:28:46] local.DEBUG: Illuminate\Routing\Router  
[2021-06-22 13:28:46] local.DEBUG: Illuminate\Routing\Router  
[2021-06-22 13:28:46] local.DEBUG: Illuminate\Routing\Router  
[2021-06-22 13:28:46] local.DEBUG: Illuminate\Routing\Router  
[2021-06-22 13:28:46] local.DEBUG: Illuminate\Validation\Factory 
```

いたいた、`Validator::make`は実際は`Validation\Factory::make`らしい。



`Validation\Factory`は`vendor/laravel/framework/src/Illuminate/Validation/Factory.php`

```php
    /**
     * Create a new Validator instance.
     *
     * @param  array  $data
     * @param  array  $rules
     * @param  array  $messages
     * @param  array  $customAttributes
     * @return \Illuminate\Validation\Validator
     */
    public function make(array $data, array $rules, array $messages = [], array $customAttributes = [])
    {
        $validator = $this->resolve(
            $data, $rules, $messages, $customAttributes
        );

        // The presence verifier is responsible for checking the unique and exists data
        // for the validator. It is behind an interface so that multiple versions of
        // it may be written besides database. We'll inject it into the validator.
        if (! is_null($this->verifier)) {
            $validator->setPresenceVerifier($this->verifier);
        }

        // Next we'll set the IoC container instance of the validator, which is used to
        // resolve out class based validator extensions. If it is not set then these
        // types of extensions will not be possible on these validation instances.
        if (! is_null($this->container)) {
            $validator->setContainer($this->container);
        }

        $this->addExtensions($validator);

        return $validator;
    }
```





## Validateがあやしい？

`$validator->validate()`を呼ばなければそもそも発生しない事象だし、呼んだとしてもRequestが正しければエラーは発生しないので、`validate`の中を調査する価値あり。



`Validator`は`vendor/laravel/framework/src/Illuminate/Validation/Validator.php`

```php
    /**
     * Run the validator's rules against its data.
     *
     * @return array
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validate()
    {
      logger("pass1");
        if ($this->fails()) {
          logger("pass2");
            throw new ValidationException($this);
        }
        logger("pass3");
        return $this->validated();
    }
```



ログを仕込んでみた結果



エラーが発生する場合:

```
pass1
pass2
```

エラーが発生しない場合:

```
pass1
pass3
```



- `$this->fails()`が実行され、エラーがあると、それ以降何をしても`200`しか返らなくなる。



```
Validator->fails()
↓
Validator->passes()
↓
Validator->validateAttribute()
↓
Validator->addFailure()
↓
Validator->makeReplacements() と Validator->getMessage()
```



```
Validator->getMessage()
↓
Validator->getCustomMessageFromTranslator() // 行き着く先はTranslator->get();
Validator->replaceInputPlaceholder() // 行き着く先はTranslator->get();
```



```
Validator->makeReplacements()
↓
Validator-＞getDisplayableAttribute() // 行き着く先はTranslator->get();
```



```
Validator->replaceInputPlaceholder()
↓
Validator->getDisplValidator-＞();
↓
Validator->translator->get(); // Translator->get();
```



どうやら最終的に`Translator->get()`メソッドが原因になるらしい。



```
Translator->get();
↓
Translator->getLine();
↓
Translator->load();
↓
Illuminate\Translation\FileLoader->load()
↓
Illuminate\Translation\FileLoader->loadPath()
↓
Illuminate\Filesystem\Filesystem::getRequire->getRequire()
```

