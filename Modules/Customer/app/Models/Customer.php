<?php

namespace Modules\Customer\Models;

use App\Observers\CustomerObserver;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\GroupCustomer\Models\GroupCustomer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

#[ObservedBy([CustomerObserver::class])]

class Customer extends Authenticatable implements JWTSubject
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

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    protected static function newFactory()
    {
        // return \Modules\Customer\Database\factories\CustomerFactory::new();
    }

    public function group()
    {
        return $this->belongsTo(GroupCustomer::class);
    }
}
