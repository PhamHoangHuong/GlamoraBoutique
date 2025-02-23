<?php

use Illuminate\Support\Facades\Route;
use Modules\Collections\Http\Controllers\CollectionsController;

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

Route::group(['prefix' => 'v1/collections'], function () {
    Route::get('', [CollectionsController::class, 'index']);
    Route::post('', [CollectionsController::class, 'store']);
    Route::get('/{id}', [CollectionsController::class, 'show']);
    Route::put('/{id}', [CollectionsController::class, 'update']);
    Route::delete('/{id}', [CollectionsController::class, 'destroy']);
    Route::put('/{id}/active', [CollectionsController::class, 'switchStatus']);
});
