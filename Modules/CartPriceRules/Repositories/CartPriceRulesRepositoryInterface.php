<?php

namespace Modules\CartPriceRules\Repositories;

use App\Repositories\RepositoryInterface;

Interface CartPriceRulesRepositoryInterface extends RepositoryInterface
{
    public function  existsByCoupon($coupon, $exceptId = null);
    public function checkRule($rule);
}
