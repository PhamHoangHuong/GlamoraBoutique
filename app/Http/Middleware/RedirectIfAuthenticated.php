<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next, $guard = null)
    {
        // Nếu không truyền guard, dùng default guard
        $guard = $guard ?: 'customer';

        // Kiểm tra nếu user đã đăng nhập với guard đã chỉ định
        if (Auth::guard($guard)->check()) {
            return response()->json(['message' => 'Bạn đã đăng nhập rồi!'], 403);
        }

        return $next($request);
    }
}


