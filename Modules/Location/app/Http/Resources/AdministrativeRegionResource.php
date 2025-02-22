<?php

namespace Modules\Location\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AdministrativeRegionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'name_en' => $this->name_en,
            'code_name' => $this->code_name,
            'code_name_en' => $this->code_name_en,
        ];
    }
} 