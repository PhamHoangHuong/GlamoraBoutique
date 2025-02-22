<?php

namespace Modules\Location\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AdministrativeRegion extends Model
{
    protected $fillable = [
        'name',
        'name_en',
        'code_name',
        'code_name_en'
    ];

    public $timestamps = false;

    public function provinces(): HasMany
    {
        return $this->hasMany(Province::class, 'administrative_region_id');
    }
} 