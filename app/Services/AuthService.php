<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;

class AuthService
{
    protected $guard;

    public function __construct($guard = 'api')
    {
        $this->guard = $guard;
    }

    public function login($credentials)
    {
        if (!$token = Auth::guard($this->guard)->attempt($credentials)) {
            return response()->json(['error' => 'Sai email hoặc mật khẩu'], Response::HTTP_UNAUTHORIZED);
        }

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        Auth::guard($this->guard)->logout();
        return response()->json(['message' => 'Đăng xuất thành công']);
    }

    public function refresh()
    {
        return $this->respondWithToken(Auth::guard($this->guard)->refresh());
    }

    public function profile()
    {
        return response()->json(Auth::guard($this->guard)->user());
    }

    private function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard($this->guard)->factory()->getTTL() * 60,
            'user' => Auth::guard($this->guard)->user()
        ]);
    }

    public function setGuard($guard)
    {
        $this->guard = $guard;
    }
}
