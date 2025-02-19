<?php

use Illuminate\Support\Facades\Route;
use Modules\Categories\Http\Controllers\CategoriesController;

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

Route::group(['prefix' => 'v1/categories'], function () {
    Route::get('', [CategoriesController::class, 'index']);
    Route::post('', [CategoriesController::class, 'store']);
    Route::get('/{id}', [CategoriesController::class, 'show']);
    Route::put('/{id}', [CategoriesController::class, 'update']);
    Route::delete('/{id}', [CategoriesController::class, 'destroy']);
    Route::put('/{id}/active', [CategoriesController::class, 'switchStatus']);
});
