<?php

namespace Modules\Customer\Models;

use App\Observers\CustomerObserver;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Auth\Passwords\CanResetPassword as CanResetPasswordTrait;
use Modules\GroupCustomer\Models\GroupCustomer;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

#[ObservedBy([CustomerObserver::class])]

class Customer extends Authenticatable implements JWTSubject, CanResetPassword
{
    use Notifiable, HasFactory, SoftDeletes, CanResetPasswordTrait;

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
