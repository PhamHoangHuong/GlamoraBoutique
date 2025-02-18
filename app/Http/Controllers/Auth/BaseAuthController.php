<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Auth\Http\Requests\LoginRequest;
use Symfony\Component\HttpFoundation\Response;

class BaseAuthController extends Controller
{
    protected $guard;

    public function __construct($guard = 'customer')
    {
        $this->guard = $guard;
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        
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

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard($this->guard)->factory()->getTTL() * 60,
            'user' => Auth::guard($this->guard)->user()
        ]);
    }
}
