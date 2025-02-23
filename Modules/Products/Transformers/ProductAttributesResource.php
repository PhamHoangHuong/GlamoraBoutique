<?php

namespace Modules\Products\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use Modules\Attributes\Transformers\AttributesResource;

class ProductAttributesResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'attribute' => new AttributesResource($this->whenLoaded('attribute')),
        ];
    }
}
