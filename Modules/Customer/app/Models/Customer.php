<?php

namespace Modules\Customer\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User;
use Modules\GroupCustomer\Models\GroupCustomer;

class Customer extends User
{
    use HasFactory,SoftDeletes;

    protected $guarded = [];
    protected $table = 'customer';
    protected $fillable = [
        'group_id',
        'fullname',
        'email',
        'password',
        'phone',
        'address',
        'point',
        'status',
    ];
    protected $casts = [
        'status' => 'integer',
        'point' => 'integer',
        'phone' => 'string',
    ];
    protected static function newFactory()
    {
        // return \Modules\Customer\Database\factories\CustomerFactory::new();
    }

    public function group()
    {
        return $this->belongsTo(GroupCustomer::class);
    }
}
