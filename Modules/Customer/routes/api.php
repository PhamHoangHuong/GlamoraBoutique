<?php

use Illuminate\Support\Facades\Route;
use Modules\Customer\Http\Controllers\CustomerController;

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

//Route for admin
Route::group(['prefix'=>'v1/customers'],function(){
    Route::get('', [CustomerController::class,'index']);
    Route::post('', [CustomerController::class,'store']);
    Route::put('/{id}', [CustomerController::class,'update']);
    Route::put('/{id}/active', [CustomerController::class,'switchStatus']);
    Route::delete('/{id}', [CustomerController::class,'destroy']);
});
