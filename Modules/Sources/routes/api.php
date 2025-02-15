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

Route::apiResource('/v1/sources', SourcesController::class);
Route::apiResource('/v1/source-products', SourceProductsController::class);
