<?php

namespace Modules\CatalogPriceRules\Repositories;

use App\Repositories\BaseRepository;
use Modules\CatalogPriceRules\Models\CatalogPriceRules;

class CatalogPriceRulesRepository extends  BaseRepository implements  CatalogPriceRulesRepositoryInterface
{
    public function getModel(): string
    {
        return CatalogPriceRules::class;
    }
}
