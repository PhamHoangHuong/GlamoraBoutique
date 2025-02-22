<?php

namespace Modules\Location\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Province extends Model
{
    protected $primaryKey = 'code';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'code',
        'name',
        'name_en',
        'full_name',
        'full_name_en',
        'code_name',
        'administrative_unit_id',
        'administrative_region_id'
    ];

    public $timestamps = false;

    public function administrativeRegion(): BelongsTo
    {
        return $this->belongsTo(AdministrativeRegion::class, 'administrative_region_id');
    }

    public function administrativeUnit(): BelongsTo
    {
        return $this->belongsTo(AdministrativeUnit::class, 'administrative_unit_id');
    }

    public function districts(): HasMany
    {
        return $this->hasMany(District::class, 'province_code', 'code');
    }
} 