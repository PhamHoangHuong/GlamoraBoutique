<?php

namespace Modules\Categories\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Products\Models\Products;

// use Modules\Categories\Database\Factories\CategoriesFactory;

class Categories extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];
    protected  $fillable = [
        'name',
        'slug',
        'parent_id',
        'description',
        'image',
        'status',
    ];

    public function parent()
    {
        return $this->belongsTo(Categories::class, 'parent_id', 'id');
    }

    public function products()
    {
        return $this->belongsToMany(Products::class, 'product_categories', 'category_id', 'product_id');
    }
}
