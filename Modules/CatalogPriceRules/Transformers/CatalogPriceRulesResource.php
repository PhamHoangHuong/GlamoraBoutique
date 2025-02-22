<?php

namespace Modules\CatalogPriceRules\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class CatalogPriceRulesResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'is_active' => $this->status,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'group_customer_ids'=> $this->group_customer_ids,
            'condition_apply' => $this->condition,
            'condition_value' => $this->condition_value,
            'discount_amount' => $this->discount_amount,
            'operator' => $this->operator,
            'simple_action' => $this->simple_action,
            'priority' => $this->priority,
            'sort_order' => $this->sort_order,
        ];
    }
}
