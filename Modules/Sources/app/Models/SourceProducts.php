<?php

namespace Modules\Sources\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Products\Models\Products;

// use Modules\Sources\Database\Factories\SourceProductsFactory;

class SourceProducts extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'source_id',
        'quantity',
        'status'
    ];

    public function product()
    {
        return $this->belongsTo(Products::class,'product_id');
    }

    public function sources()
    {
        return $this->belongsTo(Sources::class,'source_id');
    }
}
