<?php

namespace Modules\Categories\Repositories;


use Modules\Categories\Repositories\CategoriesRepositoryInterface;
use App\Repositories\BaseRepository;
use Modules\Categories\Models\Categories;

class CategoriesRepository extends BaseRepository implements CategoriesRepositoryInterface
{
    public function getModel(): string
    {
        return Categories::class;
    }

    public function checkExistSlug(mixed $slug)
    {
        return $this->model->where('slug', $slug)->exists();
    }

    public function updateCategoryProducts($category, array $productIds)
    {
        $category->products()->sync($productIds);
    }
}
