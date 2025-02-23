<?php

namespace Modules\Categories\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoriesResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'parent_id' => $this->parent_id,
            'description' => $this->description,
            'image' => $this->image,
            'status' => $this->status,

//            'products' => ProductResource::collection($this->whenLoaded('products')),
        ];
    }
}
