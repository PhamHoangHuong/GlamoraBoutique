<?php

namespace Modules\Attributes\Repositories;

use App\Repositories\BaseRepository;
use Modules\Attributes\Models\Attributes;
use Modules\Traits\PaginatedTrait;

class AttributesRepository extends BaseRepository implements AttributesRepositoryInterface
{
    use PaginatedTrait;


    public function getPaginated($request)
    {
       return $this->customPaginate(Attributes::query(), $request);
    }


    public function getModel(): string
    {
        return Attributes::class;
    }
}
