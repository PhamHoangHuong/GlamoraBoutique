<?php

namespace Modules\GroupCustomer\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class GroupCustomer extends Model
{
    use HasFactory,SoftDeletes;

    /**
     * @var array
     */
    protected $guarded=[];
    protected $table = 'group_customer';
    /**
     * @var string[]
     */
    protected $fillable = [
        'name',
        'code',
        'status',
        'description'
    ];

}
