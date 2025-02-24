<?php

namespace Modules\Sources\Repositories;

use App\Repositories\RepositoryInterface;

interface SourceProductsRepositoryInterface extends RepositoryInterface
{
    public function getPaginated($request);
}
