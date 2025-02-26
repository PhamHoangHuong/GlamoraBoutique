<?php

namespace Modules\GroupCustomer\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\GroupCustomer\Models\GroupCustomer;

class GroupCustomersSeeder extends Seeder
{
    public function run(): void
    {
        $group_customers = [
            [
                'name' => 'Khách hàng thường',
                'code' => 'KH_THUONG',
                'status' => 1,
            ],
            [
                'name' => 'Khách hàng VIP',
                'code' => 'KH_VIP',
                'status' => 1,
            ],
            [
                'name' => 'Khách hàng tiềm năng',
                'code' => 'KH_TIEM_NANG',
                'status' => 1,
            ],
            [
                'name' => 'Khách hàng Đại lý',
                'code' => 'KH_DAI_LY',
                'status' => 1,
            ],
            [
                'name' => 'Khách hàng Khách sỉ',
                'code' => 'KH_KHACH_SI',
                'status' => 1,
            ],
        ];

        foreach ($group_customers as $group_customer) {
            GroupCustomer::create($group_customer);
        }
    }
}
