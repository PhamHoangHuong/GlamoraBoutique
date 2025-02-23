<?php

namespace Modules\Products\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Collections\Models\Collections;

// use Modules\Products\Database\Factories\ProductCollectionsFactory;

class ProductCollections extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'collection_id',
    ];

    public function product()
    {
        return $this->belongsTo(Products::class, 'product_id');
    }

    public function collection()
    {
        return $this->belongsTo(Collections::class, 'collection_id');
    }
}
