<?php

namespace Modules\GroupCustomer\Repositories;


use App\Repositories\RepositoryInterface;

interface GroupCustomerRepositoryInterface extends RepositoryInterface
{
    public function getPaginated($request);
}
