<?php

namespace Modules\Collections\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class CollectionsResrouce extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'description' => $this->description,
            'image' => $this->image,
            'status' => $this->status,

//            'products' => ProductResource::collection($this->whenLoaded('products')),
        ];
    }
}
