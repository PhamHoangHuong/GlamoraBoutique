<?php

use Illuminate\Support\Facades\Route;
use Modules\Sources\Http\Controllers\SourceProductsController;
use Modules\Sources\Http\Controllers\SourcesController;

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

Route::group(['prefix' => 'v1/sources'], function () {
    Route::get('/', [SourcesController::class, 'index']);
    Route::post('/', [SourcesController::class, 'store']);
    Route::get('/{id}', [SourcesController::class, 'show']);
    Route::put('/{id}', [SourcesController::class, 'update']);
    Route::delete('/{id}', [SourcesController::class, 'destroy']);
    Route::put('/{id}/active', [SourcesController::class, 'switchStatus']);
});

Route::group(['prefix' => 'v1/source-products'], function () {
    Route::get('/', [SourceProductsController::class, 'index']);
    Route::post('/', [SourceProductsController::class, 'store']);
    Route::get('/{id}', [SourceProductsController::class, 'show']);
    Route::put('/{id}', [SourceProductsController::class, 'update']);
    Route::delete('/{id}', [SourceProductsController::class, 'destroy']);
    Route::put('/{id}/active', [SourceProductsController::class, 'switchStatus']);
});
