<?php

namespace Modules\Sources\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Location\Models\District;
use Modules\Location\Models\Province;
use Modules\Location\Models\Ward;
use Modules\Products\Models\Products;

// use Modules\Sources\Database\Factories\SourcesFactory;

class Sources extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'address',
        'province_id',
        'district_id',
        'ward_id',
        'active'
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function province()
    {
        return $this->belongsTo(Province::class, 'province_id', 'code');
    }

    public function district()
    {
        return $this->belongsTo(District::class, 'district_id', 'code');
    }

    public function ward()
    {
        return $this->belongsTo(Ward::class, 'ward_id', 'code');
    }

    public function products()
    {
        return $this->belongsToMany(Products::class, 'source_products', 'source_id', 'product_id')
            ->withPivot('quantity', 'status')
            ->withTimestamps();
    }
}
