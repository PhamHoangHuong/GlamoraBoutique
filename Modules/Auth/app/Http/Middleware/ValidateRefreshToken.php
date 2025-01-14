<?php

namespace Modules\Auth\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Modules\Auth\Models\RefreshToken;
use Symfony\Component\HttpFoundation\Response;

class ValidateRefreshToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $refreshToken = $request->refresh_token;

        if (!$refreshToken) {
            return response()->json([
                'status' => 'error',
                'message' => 'Refresh token is required'
            ], 400);
        }

        $token = RefreshToken::where('token', $refreshToken)
            ->whereNull('revoked_at')
            ->first();

        if (!$token || !$token->isValid()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid refresh token'
            ], 401);
        }

        return $next($request);
    }
}
