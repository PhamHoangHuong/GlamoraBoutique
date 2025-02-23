<?php

namespace Modules\Products\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Categories\Models\Categories;

// use Modules\Products\Database\Factories\ProductCategoriesFactory;

class ProductCategories extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'category_id',
    ];

    public function product()
    {
        return $this->belongsTo(Products::class, 'product_id');
    }

    public function category()
    {
        return $this->belongsTo(Categories::class, 'category_id');
    }
}
