<?php

namespace Modules\Products\Repositories;

use App\Repositories\BaseRepository;
use Modules\Products\Models\ProductAttributes;

class ProductAttributesRepository extends BaseRepository implements ProductAttributesRepositoryInterface
{
    public function getModel(): string
    {
        return ProductAttributes::class;
    }

    public function deleteByProductId(int $productId)
    {
        return $this->model->where('product_id', $productId)->delete();
    }
}
