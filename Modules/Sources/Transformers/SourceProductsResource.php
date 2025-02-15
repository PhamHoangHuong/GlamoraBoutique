<?php

namespace Modules\Sources\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class SourceProductsResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'source_id' => $this->source_id,
            'quantity' => $this->quantity,
            'status' => $this->status,
        ];
    }
}
