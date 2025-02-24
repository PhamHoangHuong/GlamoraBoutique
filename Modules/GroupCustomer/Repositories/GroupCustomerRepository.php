<?php

namespace Modules\GroupCustomer\Repositories;

use App\Repositories\BaseRepository;
use Modules\GroupCustomer\Models\GroupCustomer;
use Modules\Traits\PaginatedTrait;


class GroupCustomerRepository extends BaseRepository implements GroupCustomerRepositoryInterface
{
    use PaginatedTrait;
    /**
     * @return string
     */
    public function getModel() : string
    {
        return GroupCustomer::class;
    }

    public function getPaginated($request)
    {
        return $this->customPaginate(GroupCustomer::query(), $request);
    }
}
