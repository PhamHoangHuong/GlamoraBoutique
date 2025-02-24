<?php

namespace Modules\Products\Repositories;

use App\Repositories\RepositoryInterface;
use Illuminate\Http\Request;

interface ProductsRepositoryInterface extends RepositoryInterface
{
//    public function findMany(array $ids);
    public function getPaginated($request);
    public function getSourceContainProduct($product_id);
    public function updateProductAttributes($product, array $attributes);
    public function updateProductCategories($product, array $categoryIds);
    public function updateProductCollections($product, array $collectionIds);
    public function createProduct(array $data);
    public function updateProduct($id, array $data);
    public function deleteProduct($id);
    public function prepareProductData($request, $id = null);
    public function findProduct($id, $relations = []);
    public function updateProductSources($product, array $sources);
}
