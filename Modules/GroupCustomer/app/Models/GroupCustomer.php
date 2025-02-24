<?php

namespace Modules\GroupCustomer\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Customer\Models\Customer;

class GroupCustomer extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * @var array
     */
    protected $guarded = [];
    protected $table = 'group_customers';
    /**
     * @var string[]
     */
    protected $fillable = [
        'name',
        'code',
        'status',
        'description'
    ];

    public function customer()
    {
        return $this->hasMany(Customer::class, 'group_id');
    }
}
