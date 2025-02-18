<?php

namespace Modules\Customer\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;


class ForgotPasswordController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:customer,email',
        ]);

        $status = Password::broker('customers')->sendResetLink($request->only('email'));

        return response()->json(['message' => __($status)], $status === Password::RESET_LINK_SENT ? 200 : 400);
    }

}
