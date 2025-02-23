<?php

use Illuminate\Support\Facades\Route;
use Modules\Products\Http\Controllers\ProductsController;

/*
 *--------------------------------------------------------------------------
 * API Routes
 *--------------------------------------------------------------------------
 *
 * Here is where you can register API routes for your application. These
 * routes are loaded by the RouteServiceProvider within a group which
 * is assigned the "api" middleware group. Enjoy building your API!
 *
*/

Route::group(['prefix' => 'v1/products'], function () {
    Route::get('', [ProductsController::class, 'index']);
    Route::post('', [ProductsController::class, 'store']);
    Route::get('/{id}', [ProductsController::class, 'show']);
    Route::put('/{id}', [ProductsController::class, 'update']);
    Route::delete('/{id}', [ProductsController::class, 'destroy']);
    Route::put('/{id}/active', [ProductsController::class, 'switchStatus']);
});
