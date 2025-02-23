<?php

namespace Modules\Customer\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Customer\Models\Customer;
use Illuminate\Support\Facades\Hash;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            [
                'group_id' => 1, // Giả sử group_id 1 là nhóm mặc định
                'fullname' => 'Nguyễn Văn A',
                'email' => 'nguyenvana@example.com',
                'phone' => '0901234567',
                'address' => 'Hà Nội, Việt Nam',
                'point' => 100,
                'status' => 1,
                'password' => Hash::make('password123'),
            ],
            [
                'group_id' => 1,
                'fullname' => 'Trần Thị B',
                'email' => 'tranthib@example.com',
                'phone' => '0912345678',
                'address' => 'Hồ Chí Minh, Việt Nam',
                'point' => 50,
                'status' => 1,
                'password' => Hash::make('password123'),
            ],
            [
                'group_id' => 1,
                'fullname' => 'Lê Văn C',
                'email' => 'levanc@example.com',
                'phone' => '0923456789',
                'address' => 'Đà Nẵng, Việt Nam',
                'point' => 75,
                'status' => 1,
                'password' => Hash::make('password123'),
            ],
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }
    }
} 