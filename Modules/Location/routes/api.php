<?php

use Illuminate\Support\Facades\Route;
use Modules\Location\Http\Controllers\Api\LocationController;

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

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('location', LocationController::class)->names('location');
});

Route::group(['prefix' => 'v1'], function () {
    Route::get('/regions', [LocationController::class, 'getRegions']);
    Route::get('/provinces/{regionId?}', [LocationController::class, 'getProvinces']);
    Route::get('/districts/{provinceCode}', [LocationController::class, 'getDistricts']);
    Route::get('/wards/{districtCode}', [LocationController::class, 'getWards']);
});
