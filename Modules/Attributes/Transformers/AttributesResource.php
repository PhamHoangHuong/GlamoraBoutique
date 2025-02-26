<?php

namespace Modules\Attributes\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class AttributesResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'values' => AttributeValuesResource::collection($this->attributeValues),
        ];
    }
}
