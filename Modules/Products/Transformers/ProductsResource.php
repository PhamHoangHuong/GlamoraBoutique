<?php

namespace Modules\Products\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use Modules\Categories\Transformers\CategoriesResource;
use Modules\Collections\Transformers\CollectionsResource;
use Modules\Sources\Transformers\SourceProductsResource;

class ProductsResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'content' => $this->content,
            'image' => $this->image,
            'status' => $this->status,
            'weight' => $this->weight,
            'price' => $this->price,
            'start_new_time' => $this->start_new_time,
            'end_new_time' => $this->end_new_time,
            'parent_id' => $this->parent_id,
            'sku' => $this->sku,
            'stock_quantity' => $this->stock_quantity,
            'seo_title' => $this->seo_title,
            'seo_description' => $this->seo_description,
            'video_link' => $this->video_link,
            'parent' => new ProductsResource($this->whenLoaded('parent')),
            'variants' => ProductsResource::collection($this->whenLoaded('variants')),
            'attributes' => $this->whenLoaded('productAttributes', function () {
                return $this->productAttributes->map(function ($productAttribute) {
                    return [
                        'id' => $productAttribute->id,
                        'attribute_id' => $productAttribute->attribute_id,
                        'attribute_name' => $productAttribute->attribute->name ?? null,
                        'value_id' => $productAttribute->attribute_value_id,
                        'value' => $productAttribute->attributeValue->value ?? null,
                    ];
                });
            }),
//            'advanced_prices' => AdvancedPriceResource::collection($this->whenLoaded('advancedPrices')),
            'categories' => CategoriesResource::collection($this->whenLoaded('categories')),
            'collections' => CollectionsResource::collection($this->whenLoaded('collections')),
            'sourceProducts' => SourceProductsResource::collection($this->whenLoaded('sourceProducts')),
        ];
    }
}
