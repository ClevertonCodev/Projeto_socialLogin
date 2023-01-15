<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->middleware('auth:api')->group(function () {

    Route::apiResource('produtos', 'App\Http\Controllers\ProdutosController');
    Route::apiResource('user', 'App\Http\Controllers\UserController');
    Route::get('me', 'App\Http\Controllers\AuthController@me');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
});


Route::post('resister', 'App\Http\Controllers\UserController@store');
