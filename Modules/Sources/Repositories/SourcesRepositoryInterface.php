<?php

namespace Modules\Sources\Repositories;

use App\Repositories\RepositoryInterface;

interface SourcesRepositoryInterface extends RepositoryInterface
{
    public function getPaginated($request);
}
