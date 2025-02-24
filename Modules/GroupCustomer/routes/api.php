<?php

use Illuminate\Support\Facades\Route;
use Modules\GroupCustomer\Http\Controllers\GroupCustomerController;

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

Route::group(['prefix' => 'v1/group-customers'], function () {
    Route::get('/', [GroupCustomerController::class, 'index']);
    Route::post('/', [GroupCustomerController::class, 'store']);
    Route::get('/{id}', [GroupCustomerController::class, 'show']);
    Route::put('/{id}', [GroupCustomerController::class, 'update']);
    Route::delete('/{id}', [GroupCustomerController::class, 'destroy']);
    Route::put('group-customers/{id}/active', [GroupCustomerController::class, 'switchStatus']);
});
