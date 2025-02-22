<?php

namespace Modules\Location\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WardResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'code' => $this->code,
            'name' => $this->name,
            'name_en' => $this->name_en,
            'full_name' => $this->full_name,
            'full_name_en' => $this->full_name_en,
            'code_name' => $this->code_name,
            'district_code' => $this->district_code,
            'administrative_unit' => $this->whenLoaded('administrativeUnit'),
            'district' => $this->whenLoaded('district'),
        ];
    }
} 