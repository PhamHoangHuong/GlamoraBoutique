<?php

use Illuminate\Support\Facades\Route;
use Modules\CartPriceRules\Http\Controllers\CartPriceRulesController;

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

Route::group(['prefix' => 'v1'], function () {
    Route::apiResource('cartpricerules', CartPriceRulesController::class);
});
