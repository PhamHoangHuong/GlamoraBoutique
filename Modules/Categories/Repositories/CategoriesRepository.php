<?php

namespace Modules\Categories\Repositories;


use Illuminate\Http\Request;
use App\Repositories\BaseRepository;
use Modules\Categories\Models\Categories;
use Modules\Traits\PaginatedTrait;

class CategoriesRepository extends BaseRepository implements CategoriesRepositoryInterface
{
    use PaginatedTrait;

    public function getModel(): string
    {
        return Categories::class;
    }
    public function getPaginated(Request $request)
    {
        return $this->customPaginate(Categories::query(), $request);
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
