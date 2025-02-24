<?php

namespace Modules\CatalogPriceRules\Repositories;

use App\Repositories\BaseRepository;
use Modules\CatalogPriceRules\Models\CatalogPriceRules;
use Modules\Traits\PaginatedTrait;

class CatalogPriceRulesRepository extends  BaseRepository implements  CatalogPriceRulesRepositoryInterface
{
    use PaginatedTrait;
    public function getModel(): string
    {
        return CatalogPriceRules::class;
    }
    public function getPaginated($request)
    {
        return $this->customPaginate(CatalogPriceRules::query(), $request);
    }
}
