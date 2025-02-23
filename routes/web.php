<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Trang chủ chính
Route::get('/', function () {
    return Inertia::render('Index');
})->name('index');

// Admin Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard/Index');
    })->name('dashboard');

    Route::get('/products', function () {
        return Inertia::render('Admin/Products/Index');
    })->name('products');

    Route::get('/orders', function () {
        return Inertia::render('Admin/Orders/Index');
    })->name('orders');

    Route::get('/users', function () {
        return Inertia::render('Admin/Users/Index');
    })->name('users');

    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings/Index');
    })->name('settings');

    Route::get('/attributes', function () {
        return Inertia::render('Admin/Attributes/Index');
    })->name('attributes');
});
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

// Cart Routes
Route::get('/cart', function () {
    return Inertia::render('Cart/Index');
})->name('cart');

Route::get('/checkout', function () {
    return Inertia::render('Checkout/Index');
})->name('checkout');

// Auth routes
require __DIR__.'/auth.php';

// Auth Routes
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

// User Account Routes
Route::prefix('account')->name('account.')->group(function () {
    Route::get('/orders', function () {
        return Inertia::render('Account/Orders/Index');
    })->name('orders');

    Route::get('/profile', function () {
        return Inertia::render('Account/Profile/Index');
    })->name('profile');
});

// UI Preview Routes
Route::get('/preview/error-404', function () {
    return Inertia::render('Error', [
        'status' => 404
    ]);
})->name('preview.error-404');

Route::get('/preview/error-500', function () {
    return Inertia::render('Error', [
        'status' => 500
    ]);
})->name('preview.error-500');

Route::get('/preview/payment-success', function () {
    return Inertia::render('PaymentSuccess', [
        'orderNumber' => 'ORD123456',
        'amount' => '399.000đ'
    ]);
})->name('preview.payment-success');

// Banking Payment Route
Route::get('/payment/banking', function () {
    return Inertia::render('Payment/Banking', [
        'orderNumber' => request()->get('order_number', 'ORD' . rand(100000, 999999)),
        'amount' => request()->get('amount', '0đ')
    ]);
})->name('payment.banking');

// Trang Blog
Route::get('/blog', function () {
    return Inertia::render('Blog/Index');
})->name('blog');

// Trang Chi tiết Blog
Route::get('/blog/{id}', function ($id) {
    return Inertia::render('Blog/Show', [
        'id' => $id
    ]);
})->name('blog.show');
