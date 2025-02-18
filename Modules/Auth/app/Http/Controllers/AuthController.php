<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Auth\BaseAuthController;


class AuthController extends BaseAuthController
{
    public function __construct()
    {
        // admin
        parent::__construct('user');
    }

}
