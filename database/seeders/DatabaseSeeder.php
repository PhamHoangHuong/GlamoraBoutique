<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Location\Database\Seeders\LocationDatabaseSeeder;
use Modules\Auth\Database\Seeders\AuthDatabaseSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LocationDatabaseSeeder::class,
            AuthDatabaseSeeder::class,
        ]);
    }
}
