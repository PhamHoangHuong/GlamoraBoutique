<?php

namespace Modules\Collections\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

// use Modules\Collections\Database\Factories\CollectionsFactory;

class Collections extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'status',
    ];


//    public function products()
//    {
//        return $this->belongsToMany(Product::class, 'product_collections', 'collection_id', 'product_id');
//    }
}
