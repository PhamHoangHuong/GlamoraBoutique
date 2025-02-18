<?php

namespace Modules\Customer\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Modules\Customer\Models\Customer;
use Modules\Auth\Http\Resources\UserResource;
use App\Http\Controllers\Auth\BaseAuthController;
use Illuminate\Support\Facades\Hash as FacadesHash;
use Modules\Customer\Http\Requests\StoreCustomerRequest;


class AuthCustommerController extends BaseAuthController
{
    public function __construct() {
        parent::__construct('customer');
    }
    public function register(StoreCustomerRequest $request)
    {
            $data = $request->validated();
            $data['password'] = FacadesHash::make($data['password']);
            $customer = Customer::create($data);
            $token = Auth::guard('customer')->login($customer);

            return $this->respondWithToken($token);
    }
}
