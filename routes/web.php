<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Trang chủ chính
Route::get('/', function () {
    return Inertia::render('Index');
})->name('index');

// Trang Home
Route::get('/home', function () {
    return Inertia::render('Home/Index');
})->name('home');

// Trang Giới thiệu
Route::get('/about', function () {
    return Inertia::render('About/Index');
})->name('about');

// Trang Sản phẩm
Route::get('/products', function () {
    return Inertia::render('Products/Index');
})->name('products');

// Auth routes
require __DIR__.'/auth.php';
