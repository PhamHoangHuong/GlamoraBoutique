<?php

namespace Modules\Location\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AdministrativeUnit extends Model
{
    protected $fillable = [
        'full_name',
        'full_name_en',
        'short_name',
        'short_name_en',
        'code_name',
        'code_name_en'
    ];

    public $timestamps = false;

    public function provinces(): HasMany
    {
        return $this->hasMany(Province::class, 'administrative_unit_id');
    }

    public function districts(): HasMany
    {
        return $this->hasMany(District::class, 'administrative_unit_id');
    }

    public function wards(): HasMany
    {
        return $this->hasMany(Ward::class, 'administrative_unit_id');
    }
} 