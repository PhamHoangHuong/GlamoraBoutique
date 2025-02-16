<?php

namespace Modules\CatalogPriceRules\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

// use Modules\CatalogPriceRules\Database\Factories\CatalogPriceRulesFactory;

class CatalogPriceRules extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    protected $fillable = [
        'name',
        'description',
        'is_active',
        'start_time',
        'end_time',
        'group_customer_ids',
        'condition_apply',
        'condition_value',
        'discount_amount',
        'operator',
        'simple_action',
        'priority',
        'sort_order',
    ];

    protected $casts = [
        'group_customer_ids' => 'array',
        'condition_value' => 'array',
    ];
}
