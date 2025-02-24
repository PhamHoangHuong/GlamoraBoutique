<?php

namespace Modules\Attributes\Repositories;

use App\Repositories\RepositoryInterface;

interface AttributeValuesRepositoryInterface extends RepositoryInterface
{
    public function getPaginated($request);
}
