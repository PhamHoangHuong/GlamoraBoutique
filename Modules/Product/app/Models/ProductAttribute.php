<?php

namespace Modules\Product\App\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Product\App\Models\Product;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductAttribute extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['product_id', 'attribute_id', 'attribute_value_id'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // public function attribute()
    // {
    //     return $this->belongsTo(Attribute::class);
    // }

    // public function attributeValue()
    // {
    //     return $this->belongsTo(AttributeValue::class, 'attribute_value_id');
    // }
}
