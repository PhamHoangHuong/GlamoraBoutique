<?php

namespace Modules\Sources\Repositories;

use App\Repositories\BaseRepository;
use Modules\Sources\Models\SourceProducts;
use Modules\Traits\PaginatedTrait;

class SourceProductsRepository extends BaseRepository implements SourceProductsRepositoryInterface
{
    use PaginatedTrait;
    public function getModel(): string
    {
        return SourceProducts::class;
    }

    public function getPaginated($request)
    {
        return $this->customPaginate(SourceProducts::query(), $request);
    }
}
