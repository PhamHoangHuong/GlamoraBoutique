<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\RedirectIfAuthenticated;
use Modules\Customer\Http\Controllers\CustomerController;
use Modules\Customer\Http\Controllers\AuthCustommerController;

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
Route::group(['prefix' => 'v1/customers'], function () {
    Route::get('', [CustomerController::class, 'index']);
    Route::post('', [CustomerController::class, 'store']);
    Route::put('/{id}', [CustomerController::class, 'update']);
    Route::put('/{id}/active', [CustomerController::class, 'switchStatus']);
    Route::delete('/{id}', [CustomerController::class, 'destroy']);
});
// Auth
Route::group(['prefix' => 'v1/customers'], function () {
    // Nếu đã đăng nhập thì không cho phép login & register
    Route::middleware([RedirectIfAuthenticated::class . ':customer'])->group(function () {
        Route::post('login', [AuthCustommerController::class, 'login']);
        Route::post('register', [AuthCustommerController::class, 'register']);
    });

    // Các API yêu cầu token để truy cập
    Route::middleware('auth:customer')->group(function () {
        Route::get('profile', [AuthCustommerController::class, 'profile']);
        Route::post('logout', [AuthCustommerController::class, 'logout']);
        Route::post('refresh', [AuthCustommerController::class, 'refresh']);
    });
});



