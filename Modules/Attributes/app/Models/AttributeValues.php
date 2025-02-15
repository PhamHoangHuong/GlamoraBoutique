<?php

namespace Modules\Attributes\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;


class AttributeValues extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['attribute_id', 'value'];

    /**
     * Bảng Attributes
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function attributes()
    {
        return $this->belongsTo(Attributes::class);
    }

//    TODO: Thêm quan hệ cho bảng product

//    public function productAttributes()
//    {
//        return $this->hasMany(ProductAttribute::class);
//    }
//
//    public function products()
//    {
//        return $this->belongsToMany(Product::class, 'product_attributes', 'attribute_value_id', 'product_id')
//            ->withTimestamps();
//    }
}
