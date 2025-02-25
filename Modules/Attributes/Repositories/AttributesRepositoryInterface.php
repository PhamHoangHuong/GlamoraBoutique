<?php

namespace Modules\Attributes\Repositories;

use App\Repositories\RepositoryInterface;

interface AttributesRepositoryInterface extends RepositoryInterface
{
    public function getPaginated($request);
}
