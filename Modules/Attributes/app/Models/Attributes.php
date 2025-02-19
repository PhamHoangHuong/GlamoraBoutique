<?php

namespace Modules\Attributes\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attributes extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'description'];

    // AttributeValue
    public function attributeValues()
    {
        return $this->hasMany(AttributeValues::class);
    }

    // ProductAttributes
//    public function productAttributes()
//    {
//        return $this->hasMany(ProductAttribute::class);
//    }
//
//    public function products()
//    {
//        return $this->belongsToMany(Product::class, 'product_attributes')
//            ->withPivot('attribute_value_id')
//            ->withTimestamps();
//    }
}
