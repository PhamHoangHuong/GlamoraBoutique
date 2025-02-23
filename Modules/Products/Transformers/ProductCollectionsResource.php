<?php

namespace Modules\Products\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductCollectionsResource extends JsonResource
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
            'id'=> $this->id,
            'product_id'=> $this->product_id,
            'collection_id' => $this->collection_id,
        ];
    }
}
