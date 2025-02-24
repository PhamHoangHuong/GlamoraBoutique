<?php

namespace Modules\Collections\Repositories;

use App\Repositories\RepositoryInterface;

interface CollectionsRepositoryInterface extends  RepositoryInterface
{
    public function getPaginated($request);
    public function checkExistSlug(mixed $slug);
    public function updateCollectionProducts($collections, array $productIds);
}
