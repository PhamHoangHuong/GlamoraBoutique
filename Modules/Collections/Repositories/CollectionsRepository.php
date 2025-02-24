<?php

namespace Modules\Collections\Repositories;

use App\Repositories\BaseRepository;
use Modules\Collections\Models\Collections;
use Modules\Traits\PaginatedTrait;

class CollectionsRepository extends BaseRepository implements CollectionsRepositoryInterface
{
    use PaginatedTrait;

    public function getModel(): string
    {
        return Collections::class;
    }

    public function getPaginated($request)
    {
        return $this->customPaginate(Collections::query(), $request);
    }

    public function checkExistSlug(mixed $slug)
    {
        return $this->model->where('slug', $slug)->exists();
    }

    public function updateCollectionProducts($collections, array $productIds)
    {
        $collections->products()->sync($productIds);
    }
}
