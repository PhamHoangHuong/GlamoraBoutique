<?php

use Illuminate\Support\Facades\Route;
use Modules\Attributes\Http\Controllers\AttributeValuesController;
use Modules\Attributes\Http\Controllers\AttributesController;

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

Route::prefix('v1/attributes')->group(function () {
    Route::get('/', [AttributesController::class, 'index']);
    Route::post('/', [AttributesController::class, 'store']);
    Route::get('/{id}', [AttributesController::class, 'show']);
    Route::put('/{id}', [AttributesController::class, 'update']);
    Route::delete('/{id}', [AttributesController::class, 'destroy']);
    Route::put('/{id}/active', [AttributesController::class, 'switchStatus']);
});

Route::prefix('v1/attribute-values')->group(function () {
    Route::get('/', [AttributeValuesController::class, 'index']);
    Route::post('/', [AttributeValuesController::class, 'store']);
    Route::get('/{id}', [AttributeValuesController::class, 'show']);
    Route::put('/{id}', [AttributeValuesController::class, 'update']);
    Route::delete('/{id}', [AttributeValuesController::class, 'destroy']);
});
