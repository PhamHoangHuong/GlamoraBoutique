<?php

namespace Modules\Customer\Repositories;

use App\Repositories\RepositoryInterface;
use Modules\Customer\Models\Customer;

interface CustomerRepositoryInterface extends RepositoryInterface
{
    public function getPaginated($request);

    public function findByEmail(string $email): ?Customer;

    public function findByPhone(string $phone): ?Customer;
}
