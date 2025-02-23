<?php

namespace Modules\Categories\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

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
        return $this->belongsTo(Categories::class, 'parent_id');
    }

//    public function products()
//    {
//        return $this->belongsToMany(Product::class, 'product_collections', 'collection_id', 'product_id');
//    }
}
