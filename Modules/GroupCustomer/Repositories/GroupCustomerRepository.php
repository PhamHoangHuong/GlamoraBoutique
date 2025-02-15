<?php

namespace Modules\GroupCustomer\Repositories;

use App\Repositories\BaseRepository;
use Modules\GroupCustomer\Models\GroupCustomer;


class GroupCustomerRepository extends BaseRepository implements GroupCustomerRepositoryInterface
{
    /**
     * @return string
     */
    public function getModel() : string
    {
        return GroupCustomer::class;
    }
}
