<?php

namespace Modules\Customer\Repositories;

use App\Repositories\BaseRepository;
use Modules\Customer\Models\Customer;
use Modules\Traits\PaginatedTrait;

class CustomerRepository extends BaseRepository implements CustomerRepositoryInterface
{
    use PaginatedTrait;

    public function getModel(): string
    {
        return Customer::class;
    }

    public function getPaginated($request)
    {
        return $this->customPaginate(Customer::query(), $request);
    }

    public function findByEmail(string $email): ?Customer
    {
        return $this->model->where('email', $email)->first();
    }

    public function findByPhone(string $phone): ?Customer
    {
        return $this->model->where('phone', $phone)->first();
    }

}
