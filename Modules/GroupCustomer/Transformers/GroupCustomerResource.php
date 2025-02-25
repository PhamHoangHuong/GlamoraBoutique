<?php

namespace Modules\GroupCustomer\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class GroupCustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'code'=>$this->code,
            'status'=>$this->status
        ];
    }
}
