<?php

namespace Modules\Auth\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckTokenExpiration
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !$request->user()->currentAccessToken()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 401);
        }

        if ($request->user()->currentAccessToken()->expires_at?->isPast()) {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'status' => 'error',
                'message' => 'Token has expired',
                'code' => 'token_expired'
            ], 401);
        }

        return $next($request);
    }
}
