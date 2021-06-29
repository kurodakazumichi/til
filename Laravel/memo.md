# Laravel 8.x

## ルーティング

https://readouble.com/laravel/8.x/ja/routing.html

ページに関するルーティングは`routes/web.php`に定義

```php
Route::get('greeting', function() 
{
  // シンプルに文字列返す
  // return 'Hello World';
    
  // viewを指定する(resources/views/welcome.blade.phpが使われる)
  // return view('welcome');
    
  // Controllerを指定する(HelloControllerのindexアクションの例)
  // use App\Http\Controllers\HelloController; // ←ファイル冒頭にこれいる
  // Route::get('/hello', [HelloController::class, 'index']);
  
});

// apiのルーティング
Route::apiResource('/categoreis', CategoryController::class);
```



## artisan

```
# コントローラを作る
php artisan make:controller HelloController

# apiコントローラを作る(サブフォルダ指定)
php artisan make:controller Api/CategoryController --api

# モデルを作る
php artisan make:model Book

# migrationを作る
php artisan make:migration create_groups_table

# migrationする
php artisan migrate

# migrationを元に戻す
php artisan migrate:rollback
```



## モデル定義

https://readouble.com/laravel/5.8/ja/eloquent-relationships.html

