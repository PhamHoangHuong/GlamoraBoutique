<?php

namespace Modules\Products\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Attributes\Models\Attributes;
use Modules\Attributes\Models\AttributeValues;
use Modules\Categories\Models\Categories;
use Modules\Collections\Models\Collections;
use Modules\Sources\Models\SourceProducts;
use Modules\Sources\Models\Sources;

// use Modules\Products\Database\Factories\ProductsFactory;

class Products extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'name',
        'slug',
        'description',
        'content',
        'image',
        'status',
        'weight',
        'price',
        'start_new_time',
        'end_new_time',
        'parent_id',
        'sku',
        'seo_title',
        'seo_description',
        'video_link'
    ];

    protected $casts = [
        'status' => 'boolean',
        'weight' => 'float',
        'price' => 'decimal:2',
        'start_new_time' => 'datetime',
        'end_new_time' => 'datetime',
    ];

    public function parent()
    {
        return $this->belongsTo(Products::class, 'parent_id');
    }

    public function variants()
    {
        return $this->hasMany(Products::class, 'parent_id');
    }

//    public function advancedPrice()
//    {
//        return $this->belongsTo(AdvancedPrice::class);
//    }

    public function attributes()
    {
        return $this->belongsToMany(Attributes::class, 'product_attributes')
            ->withPivot('attribute_value_id')
            ->withTimestamps();
    }

    public function attributeValues()
    {
        return $this->belongsToMany(AttributeValues::class, 'product_attributes', 'product_id', 'attribute_value_id')
            ->withTimestamps();
    }

    public function sources()
    {
        return $this->belongsToMany(Sources::class, 'source_products', 'product_id', 'source_id')
            ->withPivot('quantity')
            ->withTimestamps();
    }

    public function sourceProducts()
    {
        return $this->hasMany(SourceProducts::class,'product_id');
    }

    public function productAttributes()
    {
        return $this->hasMany(ProductAttributes::class, 'product_id');
    }

    public function categories()
    {
        return $this->belongsToMany(Categories::class, 'product_categories', 'product_id', 'category_id')
            ->withTimestamps();
    }
    public function productCategories()
    {
        return $this->hasMany(ProductCategories::class, 'product_id');
    }

    public function collections()
    {
        return $this->belongsToMany(Collections::class, 'product_collections', 'product_id', 'collection_id')
            ->withTimestamps();
    }
    public function productCollections()
    {
        return $this->hasMany(ProductCollections::class, 'product_id');
    }
}
