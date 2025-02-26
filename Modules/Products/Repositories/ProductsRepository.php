<?php

namespace Modules\Products\Repositories;

use App\Repositories\BaseRepository;
use Exception;
use Modules\Products\Models\ProductAttributes;
use Modules\Products\Models\Products;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Modules\Traits\ImageUploadTrait;
use Modules\Traits\PaginatedTrait;

class ProductsRepository extends BaseRepository implements ProductsRepositoryInterface
{
    use ImageUploadTrait, PaginatedTrait;

    public function getModel(): string
    {
        return Products::class;
    }

    public function getPaginated($request)
    {
        return $this->customPaginate(Products::query(), $request);
    }

//    public function findMany(array $ids)
//    {
//        return $this->model->whereIn('id', $ids)->with('advancedPrices')->get();
//    }

    public function getSourceContainProduct($product_id)
    {
        $product = $this->model->find($product_id);
        $sources = $product->sources()
            ->wherePivot('quantity', '>', 0)
            ->wherePivot('status', 1)
            ->get();

        return $sources->pluck('id');
    }

    public function updateProductAttributes($product, array $attributes)
    {
        // Clear existing attributes for the specific product (main or variant)
        $product->productAttributes()->where('product_id', $product->id)->delete();

        // Add new attributes for the specific product
        foreach ($attributes as $attribute) {
            $product->productAttributes()->create([
                'product_id' => $product->id,
                'attribute_id' => $attribute['attribute_id'],
                'attribute_value_id' => $attribute['attribute_value_id'],
            ]);
        }
    }

    public function updateProductCategories($product, array $categoryIds)
    {
        $product->categories()->sync($categoryIds);
    }

    public function updateProductCollections($product, array $collectionIds)
    {
        $product->collections()->sync($collectionIds);
    }

    public function createProduct(array $data)
    {
        return $this->model->create($data);
    }

    public function updateProduct($id, array $data)
    {
        $product = $this->model->findOrFail($id);
        $product->update($data);
        return $product;
    }

    public function deleteProduct($id)
    {
        $product = $this->model->findOrFail($id);
        $product->productCategories()->delete();
        $product->productCollections()->delete();
        $product->productAttributes()->delete();
        $product->sourceProducts()->delete();
        $product->delete();
    }

    /**
     * @throws Exception
     */
    public function prepareProductData(Request $request, $id = null)
    {
        $productData = $request->validated();
        if ($request->hasFile('image')) {
            $productData['image'] = $this->uploadImage($request, 'image', 'products');
        }
        $productData['slug'] = Str::slug($request->name);

        if ($id && $this->existsBySlug($productData['slug'], $id)) {
            throw new Exception('Slug đã tồn tại');
        }

        return $productData;
    }

    public function findProduct($id, $relations = [])
    {
        return $this->model->with($relations)->findOrFail($id);
    }

    public function updateProductSources($product, array $sources)
    {
        $sourceData = [];
        foreach ($sources as $source) {
            $sourceData[$source['source_id']] = ['quantity' => $source['quantity']];
        }
        $product->sources()->sync($sourceData);
    }
}
