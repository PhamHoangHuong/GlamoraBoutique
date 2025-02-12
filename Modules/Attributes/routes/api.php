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

Route::apiResource('/v1/attributes', AttributesController::class);
Route::apiResource('/v1/attribute-values', AttributeValuesController::class);
