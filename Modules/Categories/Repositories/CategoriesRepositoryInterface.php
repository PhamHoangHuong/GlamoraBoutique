<?php

namespace Modules\Categories\Repositories;

use App\Repositories\RepositoryInterface;
use Illuminate\Http\Request;


interface CategoriesRepositoryInterface extends RepositoryInterface
{
    public function getPaginated(Request $request);
    public function checkExistSlug($slug);

    public function updateCategoryProducts($category, array $productIds);
}
