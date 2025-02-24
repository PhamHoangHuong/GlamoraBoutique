<?php

namespace Modules\CartPriceRules\Repositories;

use App\Repositories\RepositoryInterface;
use Illuminate\Http\Request;

Interface CartPriceRulesRepositoryInterface extends RepositoryInterface
{
    public function getPaginated($request);
    public function  existsByCoupon($coupon, $exceptId = null);
    public function checkRule($rule);
}
