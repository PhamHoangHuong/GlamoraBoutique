<?php

namespace Modules\Products\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Attributes\Models\Attributes;
use Modules\Attributes\Models\AttributeValues;

// use Modules\Products\Database\Factories\ProductAttributesFactory;

class ProductAttributes extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['product_id', 'attribute_id', 'attribute_value_id'];

    public function product()
    {
        return $this->belongsTo(Products::class, 'product_id');
    }

    public function attribute()
    {
        return $this->belongsTo(Attributes::class, 'attribute_id');
    }

    public function attributeValue()
    {
        return $this->belongsTo(AttributeValues::class, 'attribute_value_id');
    }
}
