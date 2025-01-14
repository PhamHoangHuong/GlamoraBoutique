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

// Trang Chi tiết sản phẩm
Route::get('/products/{id}', function ($id) {
    return Inertia::render('Products/Show', [
        'id' => $id
    ]);
})->name('products.show');

// Trang Liên hệ
Route::get('/contact', function () {
    return Inertia::render('Contact/Index');
})->name('contact');

// Auth routes
require __DIR__.'/auth.php';
