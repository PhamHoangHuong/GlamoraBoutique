<?php

namespace Modules\Collections\Repositories;

use App\Repositories\BaseRepository;
use Modules\Collections\Models\Collections;

class CollectionsRepository extends  BaseRepository implements CollectionsRepositoryInterface
{
    public function getModel(): string
    {
        return Collections::class;
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
