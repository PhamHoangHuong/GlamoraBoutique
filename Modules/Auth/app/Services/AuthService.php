<?php

namespace Modules\Auth\Services;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Modules\Auth\Models\User;
use Modules\Auth\Models\RefreshToken;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    private const ACCESS_TOKEN_EXPIRES_IN = 15; // minutes
    private const REFRESH_TOKEN_EXPIRES_IN = 7; // days

    public function register(array $data): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return $this->generateTokens($user);
    }

    public function login(string $email, string $password): array
    {
        if (!Auth::attempt(['email' => $email, 'password' => $password])) {
            throw new \Exception('Invalid credentials');
        }

        $user = User::where('email', $email)->firstOrFail();
        return $this->generateTokens($user);
    }

    public function refreshToken(string $refreshToken): array
    {
        $token = RefreshToken::where('token', $refreshToken)
            ->whereNull('revoked_at')
            ->first();

        if (!$token || !$token->isValid()) {
            throw new \Exception('Invalid refresh token');
        }

        // Revoke the old refresh token
        $token->update(['revoked_at' => now()]);

        return $this->generateTokens($token->user);
    }

    public function logout(User $user): void
    {
        // Revoke all tokens
        $user->tokens()->delete();
        $user->refreshTokens()->update(['revoked_at' => now()]);
    }

    private function generateTokens(User $user): array
    {
        // Generate access token
        $accessToken = $user->createToken('auth_token', ['*'], now()->addMinutes(self::ACCESS_TOKEN_EXPIRES_IN));

        // Generate refresh token
        $refreshToken = $user->refreshTokens()->create([
            'token' => Str::random(64),
            'expires_at' => now()->addDays(self::REFRESH_TOKEN_EXPIRES_IN),
        ]);

        return [
            'access_token' => $accessToken->plainTextToken,
            'refresh_token' => $refreshToken->token,
            'token_type' => 'Bearer',
            'expires_in' => self::ACCESS_TOKEN_EXPIRES_IN * 60, // in seconds
        ];
    }
}
