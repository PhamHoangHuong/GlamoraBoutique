<?php

namespace Modules\CartPriceRules\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

// use Modules\CartPriceRules\Database\Factories\CartPriceRulesFactory;

class CartPriceRules extends Model
{
    use HasFactory,softDeletes;

    protected $guarded = [];

    protected $fillable = [
        'name',
        'description',
        'start_time',
        'end_time',
        'is_active',
        'group_customer_ids',
        'condition_apply',
        'condition_value',
        'coupon',
        'discount_amount',
        'discount_qty',
        'discount_step',
        'usage_limit',
        'used',
        'coupon_type',
        'operator',
        'simple_action',
        'priority',
        'sort_order',
    ];

    protected $casts = [
        'group_customer_ids' => 'array',
    ];
}
