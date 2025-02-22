<?php

namespace Modules\Location\Database\Seeders;

use Illuminate\Database\Seeder;

class LocationDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            LocationDataSeeder::class,
        ]);
    }
}
