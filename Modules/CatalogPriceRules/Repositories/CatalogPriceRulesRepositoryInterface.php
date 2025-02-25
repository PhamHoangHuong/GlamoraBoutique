<?php

namespace Modules\CatalogPriceRules\Repositories;

use App\Repositories\RepositoryInterface;

interface CatalogPriceRulesRepositoryInterface extends RepositoryInterface
{
    public function getPaginated($request);
}
