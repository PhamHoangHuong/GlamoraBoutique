<?php

namespace Modules\Sources\Repositories;

use App\Repositories\BaseRepository;
use Modules\Sources\Models\Sources;
use Modules\Sources\Repositories\SourcesRepositoryInterface;
use Modules\Traits\PaginatedTrait;

class SourcesRepository extends BaseRepository implements SourcesRepositoryInterface
{
    use PaginatedTrait;

    public function getModel(): string
    {
        return Sources::class;
    }

    public function getPaginated($request)
    {
        return $this->customPaginate(Sources::query(), $request);
    }
}
