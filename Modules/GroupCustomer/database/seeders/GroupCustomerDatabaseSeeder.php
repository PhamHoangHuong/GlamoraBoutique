<?php

namespace Modules\GroupCustomer\Database\Seeders;

use Illuminate\Database\Seeder;

class GroupCustomerDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            GroupCustomersSeeder::class,
        ]);
    }
}
