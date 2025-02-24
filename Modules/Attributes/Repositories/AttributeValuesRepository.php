<?php

namespace Modules\Attributes\Repositories;

use App\Repositories\BaseRepository;
use Modules\Attributes\Models\AttributeValues;
use Modules\Traits\PaginatedTrait;

class AttributeValuesRepository extends BaseRepository implements AttributeValuesRepositoryInterface
{
    use PaginatedTrait;
    public function getModel(): string
    {
        return AttributeValues::class;
    }
    public function getPaginated($request)
    {
        return $this->customPaginate(AttributeValues::query(), $request);
    }
}
